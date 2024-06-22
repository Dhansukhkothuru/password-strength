var text = document.getElementById('text');


var num = '0123456789';
var loweralpha = 'abcdefghijklmnopqrstuvwxyz';
var upperalpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var special = '!@#$%^&*()_<>?:"{}';


var hasNumber = false;
var hasLowercase = false;
var hasUppercase = false;
var hasSpecial = false;
var hasValidLength = false;


const CRACK_TIME_VERY_SHORT = 1;   
const CRACK_TIME_SHORT = 10;      
const CRACK_TIME_REASONABLE = 3600;
const CRACK_TIME_LONG = 86400;    
const CRACK_TIME_VERY_LONG = 31536000; 


text.addEventListener('input', function() {
    checkPassword();
});

function checkPassword() {
    resetFlags();

    var password = text.value;
    var passwordLength = password.length;

    
    hasNumber = checkCharacterSet(password, num);
    hasLowercase = checkCharacterSet(password, loweralpha);
    hasUppercase = checkCharacterSet(password, upperalpha);
    hasSpecial = checkCharacterSet(password, special);
    hasValidLength = passwordLength >= 8;

    
    updateUI();
}

function generatePassword() {
    var finalpass = '';

    finalpass += generateRandomCharacters(num, 1);
    finalpass += generateRandomCharacters(loweralpha, 3);
    finalpass += generateRandomCharacters(upperalpha, 2);
    finalpass += generateRandomCharacters(special, 2);

   
    finalpass = shuffleString(finalpass);

   
    text.value = finalpass;
    checkPassword(); 
}

function checkCharacterSet(password, characterSet) {
    return password.split('').some(char => characterSet.includes(char));
}

function generateRandomCharacters(characterSet, count) {
    var result = '';
    for (var i = 0; i < count; i++) {
        var randomChar = characterSet.charAt(Math.floor(Math.random() * characterSet.length));
        result += randomChar;
    }
    return result;
}

function shuffleString(str) {
    return str.split('').sort(() => Math.random() - 0.5).join('');
}

function resetFlags() {
    hasNumber = false;
    hasLowercase = false;
    hasUppercase = false;
    hasSpecial = false;
    hasValidLength = false;
}

function updateUI() {
    
    updateListItem("number", hasNumber);
    updateListItem("small", hasLowercase);
    updateListItem("big", hasUppercase);
    updateListItem("special", hasSpecial);
    updateListItem("length", hasValidLength);

    
    displayCrackTime();

    
    displayPasswordStrength();
}

function updateListItem(id, isMet) {
    var listItem = document.getElementById(id);
    if (isMet) {
        listItem.innerHTML = "&#10003; Met";
        listItem.style.color = "green";
     } 
    
}

function displayCrackTime() {
    var crackTimeValue = document.getElementById("crack-time-value");

    if (hasNumber && hasLowercase && hasUppercase && hasSpecial && hasValidLength) {
        crackTimeValue.textContent = "Very Long (Centuries)";
    } else if (hasNumber && hasLowercase && hasUppercase && hasSpecial) {
        crackTimeValue.textContent = "Long (Years)";
    } else if (hasNumber && hasLowercase && hasUppercase) {
        crackTimeValue.textContent = "Reasonable (Days to Years)";
    } else if (hasNumber && hasLowercase) {
        crackTimeValue.textContent = "Short (Seconds to Hours)";
    } else {
        crackTimeValue.textContent = "Very Short (Less than a Second)";
    }
}

function displayPasswordStrength() {
    var passwordStrengthValue = document.getElementById("password-strength-value");

    if (hasNumber && hasLowercase && hasUppercase && hasSpecial && hasValidLength) {
        passwordStrengthValue.textContent = "Excellent";
        passwordStrengthValue.style.color = "green";
    } else if (hasNumber && hasLowercase && hasUppercase && hasSpecial) {
        passwordStrengthValue.textContent = "Strong";
        passwordStrengthValue.style.color = "green";
    } else if (hasNumber && hasLowercase && hasUppercase) {
        passwordStrengthValue.textContent = "Good";
        passwordStrengthValue.style.color = "orange";
    } else if (hasNumber && hasLowercase) {
        passwordStrengthValue.textContent = "Moderate";
        passwordStrengthValue.style.color = "orange";
    } else {
        passwordStrengthValue.textContent = "Weak";
        passwordStrengthValue.style.color = "red";
    }
}
