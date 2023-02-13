const calc = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys'); //Part where the numbers are added together and shown what is being typed
const display = document.querySelector('.calculator__display'); //result
var total = 0.0;
var string_total = total.toString(); 
const previousKeyType = calc.dataset.previousKeyType;

//DISPLAYING KEYPRESSES/RESULTS
   keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
      const key = e.target //gets the key inputted and saves it
      const action = key.dataset.action //gets the action associated with the key press i.e add, sub, div, multiply
      const keyContent = key.textContent //saves the key content (used for calcs)
      const displayedNum = display.textContent //used for displaying key press on calc
    }

    if(!action){ //Filters out the operators, so we only have the numbers. True = not False = Not Action i.e. its a Number
        if (displayedNum === '0' || previousKeyType === 'operator') { 
            displayedNum = keyContent //Makes the display say content of the key pressed if the key was 0.
          } else {
            displayedNum = displayedNum + keyContent //concatanates the string to display nums w/ more than 1 digit
          }
       }

    if(action == 'decimal') {
        displayedNum = displayedNum + "."
    }
})

  //CALCULATION LOGIC

    keys.addEventListener('click', e => {
        if(e.target.matches('button')) {
            var num1 = e.target; 


            // if(!action) { //if number
            //         num1 = num1  //concatanates the string to display nums w/ more than 1 digit
            //    }
        
            // if(action == 'decimal') {
            //     num1 = num1 + "."
            // }
            if (
                action === 'add' ||
                action === 'subtract' ||
                action === 'multiply' ||
                action === 'divide'
              ) {
                key.classList.add('is-depressed') //tells us when an operator has been pressed down
                calc.dataset.previousKeyType = 'operator';
            }

            
            } else { //if operator
            
                if(action == 'add'){
                    const firstValue = calc.dataset.firstValue;
                    const secondValue = displayedNum;
                     add(firstValue, displayedNum);

                } 

                else if(action =='subtract'){
                    const firstValue = calc.dataset.firstValue;
                    const secondValue = displayedNum;
                     sub(firstValue, displayedNum);
                    

                }
                else if(action == 'multiply'){
                    const firstValue = calc.dataset.firstValue;
                    const secondValue = displayedNum;
                    multiply(firstValue, displayedNum);
                }
                else if(action == 'divide'){
                    const firstValue = calc.dataset.firstValue;
                    const secondValue = displayedNum;
                    divide(firstValue, displayedNum);
                }
                else if(action == 'calculate'){
                    equal();

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

);


 keys.addEventListener('click',e => {
    if(e.target.matches('button')) {
        const key = e.target

        Array.from(key.parentNode.children) //removes pressed keys
        .forEach(k => k.classList.remove('is-depressed'))
    }
 });


// Functions

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