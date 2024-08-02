/*
    passwordDisplayBlock -> the input field which actually contains the password 
    copyPasswordBtn -> the copy icon button
    copiedORfailed -> the text which tells whether the content got copied or failed 
    password-length-number -> resembles the password length
    range-controller : controls the range resembling the password length
    #uppercase : uppercase checkbox id
    #lowercase : lowercase checkbox id 
    #number-digits : numbers checkbox id 
    #symbols : symbols checkbox id 
    .strength-circle : class representing the strength circle 
    generate-password-btn : generate password button

*/

// accessing all of the above defined elements
let passwordDisplayBlock = document.querySelector('[passwordDisplayBlock]');
let copyPasswordBtn = document.querySelector('[copyPasswordBtn]');
let copiedORfailed = document.querySelector('[copiedORfailed]'); 
let passwordLengthNumber = document.querySelector('[password-length-number]');
let rangeController = document.querySelector('[range-controller]');
let uppercase = document.querySelector('#uppercase'); 
let lowercase = document.querySelector('#lowercase'); 
let numberDigits = document.querySelector('#number-digits'); 
let symbols = document.querySelector('#symbols');
let allCheckBoxArr = document.querySelectorAll('input[type="checkbox"]');
let strengthCircle = document.querySelector('.strength-circle');
let generatePasswordBtn = document.querySelector('[generate-password-btn]') 
/*
    handlers and their functions 
    handleSlider() -> handles the slider on change and also handles the password length and the passwordLengthNumber
    handlePasswordLengthNumber() -> take input : password length and sets the password length number 
    handleGeneratePassword() : on clicking the generate password button it will handles the generating password process
    handleStrengthCircle() : handle the color inside the stengthCircle 
    randomNumber(min,max) : generate the random number between the min and max 
    randomUppercaseGenerator() : generate the random uppercase letter
    randomLowercaseGenerator():
    randomNumberDigitsGenerator():
    randomSymbolsGenerator();
*/
// some global variables
let password = "";
// initially : byDefault i want the slider value and password length to be 10
let passwordLength = 10;
rangeController.value = 10;
handlePasswordLengthNumber();
// initial set-up ends 
let checkboxCount = 0; 
let specialSymbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
// handling the slider and passwordLengthNumber
function handlePasswordLengthNumber(){
    passwordLengthNumber.textContent = passwordLength;
} 
function handleSlider(){
    passwordLength = rangeController.value;
    handlePasswordLengthNumber();
}
// adding event listener to the slider
rangeController.addEventListener('change',handleSlider);

// handling the random number generator 
function randomNumber(min, max){
    return Math.floor(Math.random() * (max-min+1))+min;
    // generate the random number : [min,max]
}
function randomUppercaseGenerator(){
    let asciiValue = randomNumber(65,90);
    let character = String.fromCharCode(asciiValue);
    return character;
}

function randomLowercaseGenerator(){
    let asciiValue = randomNumber(97,122);
    let character = String.fromCharCode(asciiValue);
    return character;
}

function randomNumberDigitsGenerator(){
    let asciiValue = randomNumber(48,57);
    let character = String.fromCharCode(asciiValue);
    return character;
}
function randomSymbolsGenerator(){
    let idx = randomNumber(0,symbols.length-1);
    return specialSymbols.charAt(idx);
}
function countCheckedBoxes(){
    checkboxCount = 0;
    allCheckBoxArr.forEach((checkbox)=>{
        if(checkbox.checked) checkboxCount++;
    })
    return checkboxCount;
}

generatePasswordBtn.addEventListener('click',handleGeneratePassword);

function handleGeneratePassword(){
    checkboxCount = 0;
    password = "";
    countCheckedBoxes();
    if(checkboxCount == 0) return; // no password will be generated
    if(checkboxCount > rangeController.value){
        rangeController.value = checkboxCount;
        handleSlider();
    }
    // kaun kaunse checkbox checked hai unke functions ek array mai rakhlo 
    let allCheckedBoxFunc = [];
    allCheckBoxArr.forEach((checkbox)=>{
        if(checkbox.checked){
            if(checkbox == uppercase ) allCheckedBoxFunc.push('randomUppercaseGenerator');
            else if(checkbox == lowercase) allCheckedBoxFunc.push('randomLowercaseGenerator');
            else if(checkbox == numberDigits) allCheckedBoxFunc.push('randomNumberDigitsGenerator');
            else allCheckedBoxFunc.push('randomSymbolsGenerator');
        }
    });
    console.log(allCheckedBoxFunc);
    //inserting the compalsary waale letters 
    allCheckedBoxFunc.forEach((ele)=>{
        console.log(ele);
        password += window[ele](); 
    })
    while(password.length < passwordLength){
        let index = randomNumber(0,allCheckedBoxFunc.length-1);
        password += window[allCheckedBoxFunc[index]]();
    }
    // display the password 
    displayPassword(password);
}
function displayPassword(password){
    passwordDisplayBlock.value = password;
}
// handling the copy button 
copyPasswordBtn.addEventListener('click',handleCopyPassword);
async function handleCopyPassword(){
    try{
        await navigator.clipboard.writeText(password);
        copiedORfailed.textContent = 'copied';
    }catch(e){
        copiedORfailed.textContent = 'failed';
    }
    setTimeout(()=>{
        copiedORfailed.textContent='';
    },1000);
}