
const input = document.getElementById('number')
const button = document.getElementById('convert-btn')
const output = document.getElementById('output')
const p = document.querySelector('p')

function convert(){
  let number = parseInt(input.value)
  output.classList.add('result')
  if(isValid(number) === true){
    p.textContent = translator(number)
  }
}

function translator(number){
  let converted = ''
  while(number > 0){
      if(number >= 1000){
        number -= 1000;
        converted += 'M'
      } else if(number >= 900){
        number -= 900;
        converted += 'CM'
      } else if(number >= 500){
        number -= 500;
        converted += 'D'
      } else if(number >= 400){
        number -= 400;
        converted += 'CD'
      } else if(number >= 100){
        number -= 100;
        converted += 'C'
      } else if(number >= 90){
        number -= 90;
        converted += 'XC'
      } else if(number >= 50){
        number -= 50;
        converted += 'L'
      } else if(number >= 40){
        number -= 40;
        converted += 'XL'
      }  else if(number >= 10){
        number -= 10;
        converted += 'X'
      } else if(number >= 9){
        number -= 9;
        converted += 'IX'
      } else if(number >= 5){
        number -= 5;
        converted += 'V'
      } else if(number >= 4){
        number -= 4;
        converted += 'IV'
      } else if(number >= 1){
        number -= 1;
        converted += 'I'
      }
    }
    return converted
}

function isValid(number){
  if(!input.value){
    p.textContent = 'Please enter a valid number'
    return false;
  } else if(number < 1){
    p.textContent = 'Please enter a number greater than or equal to 1'
    return false;
  } else if(number >= 4000){
    p.textContent = 'Please enter a number less than or equal to 3999'
    return false;
  } else{
    return true;
  }
}

button.addEventListener('click', convert)
input.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        e.preventDefault()
        convert()
    }
})
