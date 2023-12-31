//1. deposit some money
//2. determine number of lines to bet on
//3. collect a bet money
//4. spin the slot machine
//5. check if the user is won
//6. give the user their winning
//7. play again

const prompt =require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A:2,
    B:4,
    C:6,
    D:8
}

const SYMBOLS_VALUES = {
    A:5,
    B:4,
    C:3,
    D:2
}

const deposit = () =>{
  while(true){
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepsoitAmount = parseFloat(depositAmount);

    if(isNaN(numberDepsoitAmount) || numberDepsoitAmount <= 0){
        console.log("Invalid deposit amount,try again !");
    }else{
        return numberDepsoitAmount;
    }
  }
};

const getNumberOfLines = () =>{
    while(true){
        const lines = prompt("Enter a the number of Lines to bet on(1-3): ");
        const numberOfLines = parseFloat(lines);
    
        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid number of linees,try again !");
        }else{
            return numberOfLines;
        }
      }
}


const getbet = (balance,Lines)=>{
    while(true){
        const bet = prompt("Enter a the total bet per line: ");
        const numberbet = parseFloat(bet);
    
        if(isNaN(numberbet) || numberbet <= 0 || numberbet > balance / Lines){
            console.log("Invalid bet amount,try again !");
        }else{
            return numberbet;
        }
      }
}

const spin =() =>{
    const symbols = [];
   for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i= 0; i<count; i++){
            symbols.push(symbol);
        }
   }
   const reels = [];
   for(let i=0;i<COLS;i++){
    reels.push([]);
    const reelSymbols = [...symbols];
    for(let j=0; j<ROWS;j++){
        const randomIndex = Math.floor(Math.random() * reelSymbols.length );
            const selectedSymbols = reelSymbols[randomIndex];
            reels[i].push(selectedSymbols);
            reelSymbols.splice(randomIndex,1);
    }
   }
   return reels;
};

const transpose = (reels) =>{
    const rows= [];
    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows
}
const printRows = (rows)=>{
    for(const row of rows){
        let rowString = "";
        for(const[i,symbol] of row.entries()){
            rowString += symbol;
            if(i!=row.length-1){
                rowString+=" | "
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows,bet,Lines)=>{
    let winnings= 0;
    for(let row = 0;row<Lines;row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){
            winnings += bet * SYMBOLS_VALUES[symbols[0]]
        }
    }
    return winnings
}

const game =()=>{
 let balance = deposit();
 while(true){
    console.log("You have a balance of Rs" + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getbet(balance,numberOfLines);
    balance -=bet*numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows ,bet, numberOfLines);
    balance +=winnings;
    console.log("You won, Rs" + winnings.toString());

    if(balance <= 0){
        console.log("you ran out of money");
        break;
    }
    const playAgain = prompt("DO you want to play again (y/n)? ");
    if(playAgain.toLowerCase()!=='y'){
        break;
    }
}
};

game();