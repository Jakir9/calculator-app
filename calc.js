const calc = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');
var total = 0.0;
var string_total = total.toString();
  
keys.addEventListener('click', e => {
    const key = e.target
    const action = key.dataset.action
    const keyContent = e.target.textContent
    const displayedNum = display.textContent
   // var temp1,temp2;

   keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
      const key = e.target
      const action = key.dataset.action
      const keyContent = key.textContent
      const displayedNum = display.textContent
    }

    if(!action){
        if (displayedNum === '0') {
            display.textContent = keyContent
          } else {
            display.textContent = displayedNum + keyContent //concatantes the string to display nums w/ more than 1 digit
          }
       }
    
  })

  


    if(e.target.matches('button')) {
         if(!action) {
            console.log('Number Pressed');

            if(action == "1" | action == "2" ){
                console.log('success');
            }

        } else {
            
                if(action == 'add'|| action =='subtract' || action == 'multiply' || action == 'divide' || action == 'calculate'){
                    console.log('Operator Pressed');
                } 
                else if(action =='decimal'){
                    display.textContent = displayedNum + '.'

                }

                else if(action =='clear'){
                    console.log('clear pressed');
                    total = 0;
                    return updateTotal();
                    
                    
                }
                else {
                    console.log('Button not valid');
}       
                }

    }

});

// string_total = total.toString();
// document.querySelector('.calculator').innerText = string_total;

function add(num1, num2) {
    total = num1 + num2;
    updateTotal();
    return total;

}

function sub(num1,num2) {
    total = num1 - num2;
    updateTotal();
    return total;
    
}

function multiply(num1,num2){
    total = num1 * num2;
    updateTotal();
    return total;

}

function divide(num1,num2) {
    total = num1/num2;
    updateTotal();
    return total;
    
}

function equal() {
    updateTotal(total);
    return string_total;
    
}

function updateTotal() {
    string_total = total.toString();
    document.querySelector('.calculator').innerText = string_total;
}