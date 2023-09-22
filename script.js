const COLS =26;
const ROWS = 100;

const transparent = 'transparent';
const transparentBlue = "#ddddff";

const tHeadRow = document.getElementById("table-heading-row");
const tBody = document.getElementById("table-body");
const currentCellHeading = document.getElementById("current-cell");
const boldBtn = document.getElementById("bold-btn");
const italicsBtn = document.getElementById("italics-btn");
const underlineBtn = document.getElementById("underline-btn");
const leftBtn = document.getElementById("left-btn");
const centerBtn = document.getElementById("center-btn");
const rightBtn = document.getElementById("right-btn");

const fontStyleDropdown = document.getElementById("font-style-dropdown");
const fontSizeDropdown = document.getElementById("font-size-dropdown");

const bgColorInput = document.getElementById("bgColor");
const fontColorInput = document.getElementById("fontColor");

let currentCell;
let previousCell;

function colGen(typeOfCell,tableRow,isInnerText,rowNumber){
    for(let col=0; col<COLS;col++){
        const cell = document.createElement(typeOfCell);
        if(isInnerText){
            cell.innerText = String.fromCharCode(col+65);
            cell.setAttribute("id",String.fromCharCode(col+65));
        } 
        else{
            cell.setAttribute("id",`${String.fromCharCode(col+65)}${rowNumber}`);
            cell.setAttribute("contenteditable", true);
            cell.addEventListener("focus", (event)=>focusHandler(event.target));
        }
        tableRow.append(cell);
    }
}

colGen("th",tHeadRow,true);

function setHeaderColor(colId,rowId,color){
    const colHead = document.getElementById(colId);
    const rowHead = document.getElementById(rowId);
    colHead.style.backgroundColor = color;
    rowHead.style.backgroundColor = color;
}

function buttonHighlighter(button,styleProperty,style){
    if(currentCell.style[styleProperty]===style){
        button.style.backgroundColor = transparentBlue;
    }
    else{
        button.style.backgroundColor = transparent;
    }
}

function focusHandler(cell){
    currentCell = cell;
    if(previousCell){
        setHeaderColor(previousCell.id[0], previousCell.id.substring(1),transparent);
    }

    buttonHighlighter(boldBtn,"fontWeight","bold");
    buttonHighlighter(italicsBtn,"fontStyle","italic");
    buttonHighlighter(underlineBtn,"textDecoration","underline");

    // if(currentCell.style.fontWeight = "bold"){
    //     boldBtn.style.backgroundColor = transparentBlue;
    // }else{
    //     boldBtn.style.backgroundColor = transparent;
    // }

    // if(currentCell.style.fontStyle = "italic"){
    //     italicsBtn.style.backgroundColor = transparentBlue;
    // }else{
    //     italicsBtn.style.backgroundColor = transparent;
    // }

    // if(currentCell.style.textDecoration = "underline"){
    //     underlineBtn.style.backgroundColor = transparentBlue;
    // }else{
    //     underlineBtn.style.backgroundColor = transparent;
    // }


    setHeaderColor(cell.id[0], cell.id.substring(1),transparentBlue);
    currentCellHeading.innerText = cell.id+" "+"Selected";
    previousCell=currentCell;
}

for(let row =1;row<=ROWS;row++){
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.innerText=row;
    th.setAttribute("id",row);
    tr.append(th);
    // for(let col=0;col<COLS;col++){
    //     const td = document.createElement("td");
    //     tr.append(td);
    // }
    colGen("td",tr,false,row);
    tBody.append(tr);
}

boldBtn.addEventListener("click",()=>{
    if(currentCell.style.fontWeight === "bold"){
        currentCell.style.fontWeight = "normal";
        boldBtn.style.backgroundColor = transparent;
    }
    else{
        currentCell.style.fontWeight = "bold";
        boldBtn.style.backgroundColor = transparentBlue;
    }
    
});

italicsBtn.addEventListener("click",()=>{
    if(currentCell.style.fontStyle === "italic"){
        currentCell.style.fontStyle = "normal";
        italicsBtn.style.backgroundColor = transparent;
    }
    else{
        currentCell.style.fontStyle = "italic";
        italicsBtn.style.backgroundColor = transparentBlue;
    }
});

underlineBtn.addEventListener("click" ,()=>{
    if(currentCell.style.textDecoration === "underline"){
        currentCell.style.textDecoration = "none";
        underlineBtn.style.backgroundColor = transparent;
    }
    else{
        currentCell.style.textDecoration= "underline";
        underlineBtn.style.backgroundColor = transparentBlue;
    } 
});

leftBtn.addEventListener("click", ()=>{
    currentCell.style.textAlign = "left";
});
centerBtn.addEventListener("click", ()=>{
    currentCell.style.textAlign = "center";
});
rightBtn.addEventListener("click", ()=>{
    currentCell.style.textAlign = 'right';
});

fontStyleDropdown.addEventListener("change",()=>{
    currentCell.style.fontFamily = fontStyleDropdown.value;
});

fontSizeDropdown.addEventListener("change" ,()=>{
    currentCell.style.fontSize = fontSizeDropdown.value;
});

bgColorInput.addEventListener("input", ()=>{
    currentCell.style.backgroundColor = bgColorInput.value;
});

fontColorInput.addEventListener("input" , ()=>{
    currentCell.style.color = fontColorInput.value;
});