
//Loads page elements
const calculator = document.querySelector('.calculator');
const display = document.querySelector('.calculator__display'); //result
const keys = document.querySelector('.calculator__keys'); //Part where the numbers are added together and shown what is being typed


//DISPLAYING KEYPRESSES/RESULTS
   keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
    
      const key = e.target//gets the key inputted and saves it
      const action = key.dataset.action//gets the action associated with the key press i.e add, sub, div, multiply
      const keyContent = key.textContent//saves the key content (used for calcs)
      const displayedNum = display.textContent; //used for displaying key press on calc
      const previousKeyType = calculator.dataset.previousKeyType //Gets the operator/number
      const keyType = getKeyType(key)
      resultString = createResultString(key, displayedNum, calculator.dataset);
      display.textContent = resultString
      updateCalculatorState(key, calculator, resultString, displayedNum)
      updateVisualState(key, calculator)

    }});

    const createResultString = (key, displayedNum, state) => {
        const keyContent = key.textContent
        const keyType = getKeyType(key)
        const {
          firstValue,
          operator,
          modValue,
          previousKeyType
        } = state

    if(keyType === 'number') {
        return calculator.dataset.previousKeyType = 'number';
    }

    else if(action == 'decimal') {
        return displayedNum = displayedNum + "."
    }

    else if (action =='clear'){
        return displayedNum = 0;
    }

   if(keyType === 'operator'){

    if(calculator.dataset.previousKeyType = operator) {
        return keyContent &&
        operator &&
        previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate'
        ? calc(keyContent, displayedNum, operator)
        : displayedNum
    }
    }

    if (keyType === 'calculate') {
        calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
          ? modValue
          : displayedNum
      }
    
      if (keyType === 'clear' && key.textContent === 'AC') {
        calculator.dataset.firstValue = ''
        calculator.dataset.modValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousKeyType = ''
      }

    };



    const updateVisualState = (key, calculator) => {
        const keyType = getKeyType(key)
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
      
        if (keyType === 'operator') key.classList.add('is-depressed')
        if (keyType === 'clear' && key.textContent !== 'AC') key.textContent = 'AC'
        if (keyType !== 'clear') {
          const clearButton = calculator.querySelector('[data-action=clear]')
          clearButton.textContent = 'AC'
        }
    }

      const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
        const keyType = getKeyType(key)
        const {
          firstValue,
          operator,
          modValue,
          previousKeyType
        } = calculator.dataset

        calculator.dataset.previousKeyType = keyType

        if(keyType === 'operator'){

            if(calculator.dataset.previousKeyType = operator) {
                return keyContent &&
                operator &&
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate'
                ? calc(keyContent, displayedNum, operator)
                : displayedNum
            }
            }
        
            if (keyType === 'calculate') {
                calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
                  ? modValue
                  : displayedNum
              }
            
              if (keyType === 'clear' && key.textContent === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
              }
        
};

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

//Gets Key type

function getKeyType(key){

    if(key === 'add' ||
    key === 'subtract' ||
    key === 'multiply' ||
    key === 'divide'){
        key.classList.add('is-depressed') //tells us when an operator has been pressed down 
       return calculator.dataset.previousKeyType = 'operator';
    }
    else if (key === 'calculate'){
        return calculator.dataset.previousKeyType = 'calculate';
    }
        else {
            return 'number';
        }

}


