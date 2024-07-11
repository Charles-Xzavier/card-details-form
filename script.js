'use strict';

//form
const InputName = document.getElementById('input-name');
const InputNumber = document.getElementById('input-number');
const InputMonth = document.getElementById('input-month');
const InputYear = document.getElementById('input-year');
const InputCvc = document.getElementById('input-cvc');

//card
const CardNumber = document.getElementById('number');
const CardName = document.getElementById('name');
const CardMonth = document.getElementById('month');
const CardYear = document.getElementById('year');
const CardCvc = document.getElementById('cvc');

const SubmitBtn = document.getElementById('submit-btn');
const form = document.querySelector('form');
const done = document.getElementsByClassName('thank-you')[0];

const cardCompany = document.querySelector('.card-company');
const continueBtn = document.querySelector('#continue-btn');

let nameValid = false;
let numberValid = false;
let monthValid = false;
let yearValid = false;
let cvcValid = false;

//function to validate the name input
function validateCardName() {
  InputName.value = InputName.value.replace(/[^a-zA-Z\s]/g, '');
  CardName.innerText = InputName.value.length === 0 ? 'Mike Adeola' : InputName.value;

  const nameBlankError = document.querySelector('.card-name-error');

  if (InputName.value === '' || InputName.value == null || /\d/.test(InputName.value)) {
    nameBlankError.style.display = 'block';
    InputName.style.border = '2px solid red';
    InputName.style.outlineColor = 'red';
    nameValid = false;
  } else {
    nameBlankError.style.display = 'none';
    InputName.style.border = '2px solid hsl(279, 6%, 55%)';
    InputName.style.outlineColor = 'hsl(249, 99%, 64%)';
    nameValid = true;
  }
}

// Function to validate the number input
function validateCardNumber() {
  InputNumber.value = InputNumber.value.replace(/[^\d]/g, '');
  CardNumber.innerText = InputNumber.value.length === 0 ? '0000 0000 0000 0000' : InputNumber.value.replace(/\d{4}(?=.)/g, '$& ');

  const blankError = document.querySelector('.card-number-blank-error');
  const formatError = document.querySelector('.card-number-error');

  if (InputNumber.value.length >= 4) {
    const firstFourDigits = InputNumber.value.substring(0, 4);

    if (/^4[0-9]{0,3}/.test(firstFourDigits)) {
      cardCompany.src = './images/visa.svg';
      cardCompany.classList.remove('hidden');
    } else if (/^(?:5[1-5]|2[2-7][0-9]{2})/.test(firstFourDigits)) {
      cardCompany.src = './images/mastercard.svg';
      cardCompany.classList.remove('hidden');
    } else if (/^(5061|5062|5063|5064|5065|5078|5079|6500)/.test(firstFourDigits)) {
      cardCompany.src = './images/verve.svg';
      cardCompany.classList.remove('hidden');
    } else {
      cardCompany.classList.add('hidden');
    }
  } else {
    cardCompany.classList.add('hidden');
  }

  if (InputNumber.value === '' || InputNumber.value == null) {
    blankError.style.display = 'block';
    formatError.style.display = 'none';
    cardCompany.classList.add('hidden');
    InputNumber.style.outlineColor = 'red';
    InputNumber.style.border = '2px solid red';
    numberValid = false;
  } else if (InputNumber.value.length !== 16) {
    blankError.style.display = 'none';
    formatError.style.display = 'block';
    InputNumber.style.outlineColor = 'red';
    InputNumber.style.border = '2px solid red';
    numberValid = false;
  } else {
    blankError.style.display = 'none';
    formatError.style.display = 'none';
    InputNumber.style.border = '2px solid hsl(279, 6%, 55%)';
    InputNumber.style.outlineColor = 'hsl(249, 99%, 64%)';
    numberValid = true;
  }
}

//month validation
function validateCardMonth() {
  InputMonth.value = InputMonth.value.replace(/[^\d]/g, '');

  const monthValue = InputMonth.value;
  CardMonth.innerText = monthValue.length === 0 ? '00' : monthValue;

  const monthBlankError = document.querySelector('.blank-error');
  const monthFormatError = document.querySelector('.month-error');

  //Reset error display
  monthBlankError.style.display = 'none';
  monthFormatError.style.display = 'none';
  InputMonth.style.border = '1px solid hsl(279, 6%, 55%)';
  InputMonth.style.outlineColor = 'hsl(249, 99%, 64%)';

  if (monthValue === '' || monthValue == null || monthValue.length !== 2 || parseInt(monthValue) <= 0 || parseInt(monthValue) > 12) {
    monthFormatError.style.display = 'block';
    InputMonth.style.outlineColor = 'red';
    InputMonth.style.border = '2px solid red';
    monthValid = false;
  } else {
    monthValid = true;
  }
}

//year validation
function validateCardYear() {
  InputYear.value = InputYear.value.replace(/[^\d]/g, '');

  const yearValue = InputYear.value;
  const currentYear = new Date().getFullYear(); // Get the current year
  console.log(currentYear);

  // Get the last two digits of the current year
  const lastTwoDigitsOfCurrentYear = currentYear.toString().slice(-2);
  console.log(lastTwoDigitsOfCurrentYear);

  const yearInt = parseInt(yearValue, 10);

  const lastTwoDigitsInt = parseInt(lastTwoDigitsOfCurrentYear, 10);

  CardYear.innerText = yearValue.length === 0 ? '00' : yearValue;

  const blankError = document.querySelector('.blank-error');
  const yearError = document.querySelector('.year-error');

  // Reset error display
  blankError.style.display = 'none';
  yearError.style.display = 'none';
  InputYear.style.border = '1px solid hsl(279, 6%, 55%)';
  InputYear.style.outlineColor = 'hsl(249, 99%, 64%)';

  if (yearValue === '' || yearValue == null || yearValue.length !== 2 || yearInt < lastTwoDigitsInt || yearInt > lastTwoDigitsInt + 4) {
    yearError.style.display = 'block';
    InputYear.style.outlineColor = 'red';
    InputYear.style.border = '2px solid red';
    yearValid = false;
  } else {
    yearValid = true;
  }
}

//cvc validation
function validateCardCvc() {
  InputCvc.value = InputCvc.value.replace(/[^\d]/g, '');

  const cvcValue = InputCvc.value;
  CardCvc.innerText = cvcValue.length === 0 ? '000' : cvcValue;

  const cvcBlankError = document.querySelector('.cvc-error');

  // Reset error display
  cvcBlankError.style.display = 'none';
  InputCvc.style.border = '1px solid hsl(279, 6%, 55%)';
  InputCvc.style.outlineColor = 'hsl(249, 99%, 64%)';

  if (cvcValue === '' || cvcValue == null || cvcValue.length !== 3 || parseInt(cvcValue) == 0) {
    cvcBlankError.style.display = 'block';
    InputCvc.style.outlineColor = 'red';
    InputCvc.style.border = '2px solid red';
    cvcValid = false;
  }

  if (parseInt(cvcValue) == 0) {
    cvcBlankError.textContent = "cvv can't be 000";
    InputCvc.style.outlineColor = 'red';
    InputCvc.style.border = '2px solid red';
    cvcValid = false;
  } else {
    cvcValid = true;
  }
}

//Function to validate all fields
function validateAllFields() {
  validateCardName();
  validateCardNumber();
  validateCardMonth();
  validateCardYear();
  validateCardCvc();
  return nameValid && numberValid && monthValid && yearValid && cvcValid;
}

// Event listeners for input validation
InputName.addEventListener('input', validateCardName);
InputNumber.addEventListener('input', validateCardNumber);
InputMonth.addEventListener('input', validateCardMonth);
InputYear.addEventListener('input', validateCardYear);
InputCvc.addEventListener('input', validateCardCvc);

//confirm button
form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (validateAllFields()) {
    form.classList.add('hidden');
    done.classList.remove('hidden');
  } else {
    // alert('Invalid form submission. Please correct the errors and try again.');
    console.log('Invalid form submission. Please correct the errors and try again.');
  }
});

//continue button
continueBtn.addEventListener('click', function () {
  done.classList.add('hidden');
  form.classList.remove('hidden');
  CardCvc.innerText = '000';
  CardYear.innerText = '00';
  CardMonth.innerText = '00';
  CardNumber.innerText = '0000 0000 0000 0000';
  CardName.innerText = 'Mike Adeola';
  form.reset();
  cardCompany.classList.add('hidden');
});
