const uppercaseChars: string = 'qwertyuiopasdfghjklzxcvbnm';
const lowercaseChars: string = 'QWERTYUIOPASDFGHJKLZXCVBNM';
const numberChars: string = '1234567890';
const symbolChars: string = '!@#$%^&*()-=+[]{};:.?<>/';

// Calculate The Total Character Range
function calculateRange(
  includeUppercase: boolean,
  includeLowercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean
) {
  let range = 0;
  if (includeUppercase) {
    range += uppercaseChars.length;
  }
  if (includeLowercase) {
    range += lowercaseChars.length;
  }
  if (includeNumbers) {
    range += numberChars.length;
  }
  if (includeSymbols) {
    range += symbolChars.length;
  }
  return range;
}

// Calculates the entropy of a password based on its length and the character range,
// including uppercase letters, lowercase letters, numbers, and symbols.
function calculateEntropy(
  passwordLength: number,
  includeUppercase: boolean,
  includeLowercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean
) {
  const range = calculateRange(
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
  );
  return Math.log2(Math.pow(range, passwordLength));
}

// Calculate the Password Strength and Returns a value from 1 to 4 (1 being weakest, 4 being strongest)
function calculatePasswordStrength(
  passwordLength: number,
  includeUppercase: boolean,
  includeLowercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean
) {
  const entropy = calculateEntropy(
    passwordLength,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
  );
  if (entropy < 25) {
    return 1;
  }
  if (entropy >= 25 && entropy < 50) {
    return 2;
  }
  if (entropy >= 50 && entropy < 75) {
    return 3;
  }
  return 4;
}

// Generate Password Function
function generatePassword(
  passwordLength: number,
  includeUppercase: boolean,
  includeLowercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean
) {
  if (
    !includeUppercase &&
    !includeLowercase &&
    !includeNumbers &&
    !includeSymbols
  ) {
    throw new Error(
      'At least one of the following boolean values must be true: includeUppercase, includeLowercase, includeNumbers, includeSymbols'
    );
  }
  if (passwordLength < 1) {
    throw new Error('Value for passwordLength must be greater than zero');
  }
  let availableChars = '';
  if (includeUppercase) {
    availableChars += uppercaseChars;
  }
  if (includeLowercase) {
    availableChars += lowercaseChars;
  }
  if (includeNumbers) {
    availableChars += numberChars;
  }
  if (includeSymbols) {
    availableChars += symbolChars;
  }
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    password += availableChars.charAt(
      Math.floor(Math.random() * availableChars.length)
    );
  }
  return password;
}

export { calculatePasswordStrength, generatePassword };
