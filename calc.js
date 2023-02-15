const calculator = document.querySelector('.calculator');
const display = document.querySelector('.calculator__display'); //result
const keys = document.querySelector('.calculator__keys'); //Part where the numbers are added together and shown what is being typed
var total = 0.0;
var string_total = total.toString(); 

//DISPLAYING KEYPRESSES/RESULTS
   keys.addEventListener('click', e => {
    if (e.target.matches('button')) {

    
      const key = e.target//gets the key inputted and saves it
      const action = key.dataset.action//gets the action associated with the key press i.e add, sub, div, multiply
      const keyContent = key.textContent//saves the key content (used for calcs)
      const displayedNum = display.textContent; //used for displaying key press on calc
      const previousKeyType = calculator.dataset.previousKeyType //Gets the previous key type
      
        if (
          action === 'add' ||
          action === 'subtract' ||
          action === 'multiply' ||
          action === 'divide'
         ) {
          key.classList.add('is-depressed') //tells us when an operator has been pressed down
          calculator.dataset.previousKeyType = 'operator';
        }

        else if(!action) {
            return console.log('number');
        }

        else if(action == 'decimal') {
            displayedNum = displayedNum + "."
        }

        else if (action =='clear'){
            console.log('clear pressed');
            displayedNum = 0;
        }

       if(operator == 'add' || operator == 'subtract' || operator == 'divide' || operator == 'multiply'){
            calc(keyContent,displayedNum,operator);
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

function calc(num1,num2, operator) {

    const firstNumber = parseFloat(num1);
    const secondNumber =  parseFloat(num2);

    if (operator === 'add'){
        return firstNumber + secondNumber;
    }
   
   else if (operator === 'subtract'){
        return firstNumber - secondNumber;
    }

    else if (operator === 'multiply'){
        return firstNumber * secondNumber;

    }
    else if (operator === 'divide'){
        return firstNumber / secondNumber;

    }

    else {
        console.log('error: unknown operator ' + operator);
    }
}


//Getting Operator