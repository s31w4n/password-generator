import Toastify from 'toastify-js';
import { calculatePasswordStrength, generatePassword } from './password-logics';

// Getting DOM Elements
const resultElement: HTMLInputElement = document.querySelector(
  '#password'
) as HTMLInputElement;

const clipboardElement: HTMLButtonElement = document.querySelector(
  '#clipboard'
) as HTMLButtonElement;

const rangeElement: HTMLInputElement = document.querySelector(
  '#length'
) as HTMLInputElement;

const rangeDisplay: HTMLParagraphElement = document.querySelector(
  '.value-length-display'
) as HTMLParagraphElement;

const settings: HTMLDivElement = document.querySelector(
  '#settings'
) as HTMLDivElement;

const uppercaseElement: HTMLInputElement = document.querySelector(
  '#uppercase'
) as HTMLInputElement;

const lowercaseElement: HTMLInputElement = document.querySelector(
  '#lowercase'
) as HTMLInputElement;

const numbersElement: HTMLInputElement = document.querySelector(
  '#numbers'
) as HTMLInputElement;

const symbolsElement: HTMLInputElement = document.querySelector(
  '#symbols'
) as HTMLInputElement;

const generateElement: HTMLButtonElement = document.querySelector(
  '#btn-generate'
) as HTMLButtonElement;

// Password Strength Elements
const passwordStrength: HTMLParagraphElement = document.querySelector(
  '#strength-level'
) as HTMLParagraphElement;

const indicatorLight1: HTMLDivElement = document.querySelector(
  '#indicator-light-1'
) as HTMLDivElement;

const indicatorLight2: HTMLDivElement = document.querySelector(
  '#indicator-light-2'
) as HTMLDivElement;

const indicatorLight3: HTMLDivElement = document.querySelector(
  '#indicator-light-3'
) as HTMLDivElement;

const indicatorLight4: HTMLDivElement = document.querySelector(
  '#indicator-light-4'
) as HTMLDivElement;

const indicatorLightsAll: HTMLDivElement[] = Array.from(
  document.querySelectorAll('.indicator-light')
);

// Define variables for strength indicator colors
const RED = 'red';
const ORANGE = 'orange';
const YELLOW = 'yellow';
const GREEN = 'green';

// Creates a success toast with a short message indicating successful password copy.
const successToast = Toastify({
  text: 'Password copied!',
  duration: 2000,
  position: 'center',
  style: {
    background: '#a4ffaf',
    color: '#18171f',
    boxShadow: 'none',
  },
});

// Creates an error toast with a short message indicating failure to copy the password.
const errorToast = Toastify({
  text: 'There is no password to copy!',
  duration: 2000,
  position: 'center',
  style: {
    background: '#fb7c58',
    color: '#18171f',
    boxShadow: 'none',
  },
});

// Set the displayed range value
rangeElement.addEventListener('input', () => {
  rangeDisplay.innerText = rangeElement.value;
});

// Check if the password is empty or not
function passwordIsEmpty() {
  if (rangeElement.value === '0') {
    return true;
  }
  if (
    uppercaseElement.checked === false &&
    lowercaseElement.checked === false &&
    numbersElement.checked === false &&
    symbolsElement.checked === false
  ) {
    return true;
  }
  return false;
}

// Resetting the strength indicators
function resetStrengthMeter() {
  indicatorLightsAll.forEach((light) => {
    light.classList.remove(RED);
    light.classList.remove(ORANGE);
    light.classList.remove(YELLOW);
    light.classList.remove(GREEN);
  });
  passwordStrength.innerText = '';
}

// Setting the strength indicators
function setStrengthMeter(level: number) {
  resetStrengthMeter();
  if (level === 1) {
    indicatorLight1.classList.add(RED);
    passwordStrength.innerText = 'Weak!';
  } else if (level === 2) {
    indicatorLight1.classList.add(ORANGE);
    indicatorLight2.classList.add(ORANGE);
    passwordStrength.innerText = 'Medium';
  } else if (level === 3) {
    indicatorLight1.classList.add(YELLOW);
    indicatorLight2.classList.add(YELLOW);
    indicatorLight3.classList.add(YELLOW);
    passwordStrength.innerText = 'High';
  } else if (level === 4) {
    indicatorLight1.classList.add(GREEN);
    indicatorLight2.classList.add(GREEN);
    indicatorLight3.classList.add(GREEN);
    indicatorLight4.classList.add(GREEN);
    passwordStrength.innerText = 'Strong';
  }
}

settings.addEventListener('input', () => {
  if (passwordIsEmpty()) {
    generateElement.disabled = true;
    resetStrengthMeter();
    return;
  }
  generateElement.disabled = false;
  const level = calculatePasswordStrength(
    parseInt(rangeElement.value),
    uppercaseElement.checked,
    lowercaseElement.checked,
    numbersElement.checked,
    symbolsElement.checked
  );
  setStrengthMeter(level);
});

// Trigger the generate password
generateElement.addEventListener('click', () => {
  generateElement.blur();
  const password = generatePassword(
    parseInt(rangeElement.value),
    uppercaseElement.checked,
    lowercaseElement.checked,
    numbersElement.checked,
    symbolsElement.checked
  );
  resultElement.value = password;
});

// Event listener for clipboardButton click to copy password to clipboard and show toast notification.
clipboardElement.addEventListener('click', (e) => {
  e.preventDefault();
  clipboardElement.blur();
  if (resultElement.value === '') {
    errorToast.showToast();
  } else {
    navigator.clipboard.writeText(resultElement.value).then(
      () => {
        successToast.showToast();
      },
      () => {
        errorToast.showToast();
      }
    );
  }
});
