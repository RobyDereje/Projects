
const button = document.getElementById('check-btn')
const input = document.getElementById('text-input')
const div = document.getElementById('result')
const p = document.getElementById('verdict')
let pass = true;


function check(){
  const inputChar = input.value.toLowerCase().match(/[a-z0-9]/g)
  if(inputChar !== null && inputChar.length > 0){
    const reversedChar = [...inputChar].reverse()
    for(let i=0; i < inputChar.length; i++){
      if(inputChar[i] !== reversedChar[i]){
          pass = false;
        }
    }
    if(pass == true){
      div.classList.remove('fail')
      div.classList.add('pass')
      p.innerHTML = `<span class='bold'>${input.value}</span> is a Palindrome!`
    } else {
      div.classList.remove('pass')
      div.classList.add('fail')
      p.innerHTML = `<span class='bold'>${input.value}</span> is not a Palindrome.`
    }
    pass = true;
  } else{
    alert('Please input a value')
    div.classList.remove('pass')
    div.classList.remove('fail')
    p.innerHTML = ''
  }
}

button.addEventListener('click', check)
input.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        e.preventDefault()
        check()
    }
})