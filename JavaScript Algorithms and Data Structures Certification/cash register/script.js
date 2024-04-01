
let price = 3.5;
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];


const cash = document.getElementById('cash');
const changeDisplay = document.getElementById('change-due');
const btn = document.getElementById('purchase-btn');
const totalPriceText = document.querySelector('h3 span')
const currencyLeft = document.querySelectorAll('.left')

totalPriceText.textContent = price;
currencyLeft.forEach((el, i)=>
{
  el.textContent = cid[i][1]
})

function calculate(){
  const value = parseFloat(cash.value)
  const regex = /e/
  let changeGiven = JSON.parse(JSON.stringify(cid))
  let changeDue = (value - price).toFixed(2)
  let remaining = cid.reduce((acc, el)=>acc+el[1], 0)
  let isClosed = remaining === changeDue? true : false;
  if(regex.test(cash.value)){
    alert('Register doesn\'t accept "e"')
    return;
  }
  if (value < price){
    alert('Customer does not have enough money to purchase the item')
  }  else{
    if(value === price){
      changeDisplay.innerHTML = `<p>
        No change due - customer paid with exact cash
      </p>`
      return;
    }
    if (remaining < changeDue){
      changeDisplay.innerHTML = `
      <p>
        Status: INSUFFICIENT_FUNDS
      </p>`
      return;
    } 
    while(changeDue > 0){
      if(changeDue >= 100 && cid[8][1] >= 100){
        changeDue -= 100;
        cid[8][1] -= 100;

      } else if(changeDue >= 20 && cid[7][1] >= 20){
        changeDue -= 20;
        cid[7][1] -= 20;
      } else if(changeDue >= 10 && cid[6][1] >= 10){
        changeDue -= 10;
        cid[6][1] -= 10;
      } else if(changeDue >= 5 && cid[5][1] >= 5){
        changeDue -= 5;
        cid[5][1] -= 5;
      } else if(changeDue >= 1 && cid[4][1] >= 1){
        changeDue -= 1;
        cid[4][1] -= 1;
      } else if(changeDue >= 0.25 && cid[3][1] >= 0.25){
        changeDue -= 0.25;
        cid[3][1] -= 0.25;
      } else if(changeDue >= 0.1 && cid[2][1] >= 0.1){
        changeDue -= 0.1;
        cid[2][1] -= 0.1;
      } else if(changeDue >= 0.05 && cid[1][1] >= 0.05){
        changeDue -= 0.05;
        cid[1][1] -= 0.05;
      } else if(changeDue >= 0.008 && cid[0][1] >= 0.008){
        changeDue -= 0.01;
        cid[0][1] -= 0.01;
      } else{
        changeDisplay.innerHTML = `
      <p>
        Status: INSUFFICIENT_FUNDS
      </p>`
      console.log(cid[0][1])
      console.log(changeDue)
      return;
      } 
      changeDue = parseFloat(changeDue.toFixed(2))
      console.log(cid)
    }
    for (let i=0; i < cid.length; i++){
      for(let j=0; j < changeGiven.length; j++){
        if (cid[i][0] === changeGiven[j][0]){
          changeGiven[j][1] = parseFloat((changeGiven[j][1] - cid[i][1]).toFixed(2))
        }
      }
    }
    let filtered = changeGiven.filter((el)=> el[1] !== 0).reverse()
    if(!isClosed){
      let html = 'STATUS: OPEN<br>';                
    filtered.forEach(item => {
    html += `${item[0]}: $${item[1]}<br>`;
  });
  changeDisplay.innerHTML = html
    } else{
      let html = 'STATUS: CLOSED<br>';                
    filtered.forEach(item => {
    html += `${item[0]}: $${item[1]}<br>`;
  });
  changeDisplay.innerHTML = html
    }
    if(filtered.length === 1 && filtered[0][1] === 0.5 && filtered[0][0].includes('PENNY')){
      changeDisplay.innerHTML =  `Status: CLOSED<br>PENNY: $0.5`
    }
  }
  currencyLeft.forEach((el, i)=>
{
  el.textContent = cid[i][1]
})
  cash.value = ''
}

btn.addEventListener('click', calculate)
cash.addEventListener('keydown', (event)=>{
  if(event.key === 'Enter'){
    event.preventDefault();
    calculate()
  } 
})