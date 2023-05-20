// Loads page elements
const calculator = document.querySelector('.calculator')
const display = document.querySelector('.calculator__display') // Result
const keys = document.querySelector('.calculator__keys') // Part where the numbers are added together and shown what is being typed

// Displaying key presses/results
keys.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    const key = e.target // gets the key inputted and saves it
    const action = key.dataset.action // gets the action associated with the key press i.e add, sub, div, multiply
    const keyContent = key.textContent // saves the key content (used for calcs)
    const displayedNum = display.textContent // used for displaying key press on calc
    const previousKeyType = calculator.dataset.previousKeyType // Gets the operator/number

    const keyType = getKeyType(key)
    const resultString = createResultString(
      key,
      displayedNum,
      calculator.dataset
    )
    display.textContent = resultString
    updateCalculatorState(key, calculator, resultString, displayedNum)
    updateVisualState(key, calculator)
  }
})

// Functions
const calculate = (num1, operator, num2) => {
  const firstNumber = parseFloat(num1)
  const secondNumber = parseFloat(num2)

  if (operator === 'add') {
    return firstNumber + secondNumber
  }

  if (operator === 'subtract') {
    return firstNumber - secondNumber
  }

  if (operator === 'multiply') {
    return firstNumber * secondNumber
  }

  if (operator === 'divide') {
    return firstNumber / secondNumber
  }

  console.log('Error: Unknown operator ' + operator)
}

// Gets Key type
function getKeyType(key) {
  const { action } = key.dataset
  if (!action) return 'number'

  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) {
    return 'operator'
  }
  return action
}

const createResultString = (key, displayedNum, state) => {
  const keyContent = key.textContent
  const keyType = getKeyType(key)
  const { firstValue, operator, modValue, previousKeyType } = state

  if (keyType === 'number') {
    return displayedNum === '0' ||
      previousKeyType === 'operator' ||
      previousKeyType === 'calculate'
      ? keyContent
      : displayedNum + keyContent
  }

  if (keyType === 'decimal') {
    if (!displayedNum.includes('.')) return displayedNum + '.'
    if (previousKeyType === 'operator' || previousKeyType === 'calculate')
      return '0.'
    return displayedNum
  }

  if (keyType === 'operator') {
    return firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
      ? calculate(firstValue, operator, displayedNum)
      : displayedNum
  }

  if (keyType === 'clear') return '0'

  if (keyType === 'calculate') {
    return firstValue
      ? previousKeyType === 'calculate'
        ? calculate(displayedNum, operator, modValue)
        : calculate(firstValue, operator, displayedNum)
      : displayedNum
  }
}

const updateVisualState = (key, calculator) => {
  const keyType = getKeyType(key)
  Array.from(key.parentNode.children).forEach((k) =>
    k.classList.remove('is-depressed')
  )

  if (keyType === 'operator') key.classList.add('is-depressed')
  if (keyType === 'clear' && key.textContent !== 'AC') key.textContent = 'AC'
  if (keyType !== 'clear') {
    const clearButton = calculator.querySelector('[data-action=clear]')
    clearButton.textContent = 'AC'
  }
}

const updateCalculatorState = (
  key,
  calculator,
  calculatedValue,
  displayedNum
) => {
  const keyType = getKeyType(key)
  const { firstValue, operator, modValue, previousKeyType } = calculator.dataset

  calculator.dataset.previousKeyType = keyType

  if (keyType === 'operator') {
    calculator.dataset.operator = key.dataset.action
    calculator.dataset.firstValue =
      firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
        ? calculatedValue
        : displayedNum
  }

  if (keyType === 'calculate') {
    calculator.dataset.modValue =
      firstValue && previousKeyType === 'calculate' ? modValue : displayedNum
  }

  if (keyType === 'clear' && key.textContent === 'AC') {
    calculator.dataset.firstValue = ''
    calculator.dataset.modValue = ''
    calculator.dataset.operator = ''
    calculator.dataset.previousKeyType = ''
  }
}
