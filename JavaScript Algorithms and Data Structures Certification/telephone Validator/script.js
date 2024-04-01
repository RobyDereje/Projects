
const input = document.getElementById('user-input')
const check = document.getElementById('check-btn')
const clear = document.getElementById('clear-btn')
const result = document.getElementById('results-div')
const form = document.querySelector('form')

function checker(){
  if(input.value.trim() === ''){
    alert('Please provide a phone number')
    return;
  } else{
    validator(input.value)
    }
    input.value = ''
}

function validator(value){
  const regex = /^1?\s?(?:\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/
    if(regex.test(value.trim())){
      const innerHTML = `<p>Valid US number: <br> ${value.trim()}</p>`
      result.insertAdjacentHTML('beforeend', innerHTML)
      } else{
        const innerHTML = `<p>Invalid US number: <br> ${value.trim()}</p>`
        result.insertAdjacentHTML('beforeend', innerHTML)
      }
}

function clearOut(){
  const children = Array.from(result.children)
  children.forEach((child)=>{
    child.textContent = ''
    result.removeChild(child)
  })
  result.textContent = ''
}

check.addEventListener('click', checker)
clear.addEventListener('click', clearOut)
form.addEventListener("submit", function(event) {
    event.preventDefault();})