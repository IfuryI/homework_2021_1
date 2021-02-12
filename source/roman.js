'use strict';


const onesArr = ["","I","II","III","IV","V","VI","VII","VIII","IX"];
const tensArr = ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"];
const hundredsArr = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"];
const thousendsArr = ["","M","MM","MMM","MMMM"];

const digitsConformity = {M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50,
                          XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1};

const minRomanNumber = 1;
const maxRomanNumber = 3999;
const maxRomanNumLength = 9;


/**
 *
 * Convert Arabic to Roman numerals
 *
 * @param {integer} num - given integer number
 * @returns {string} result - roman number
 *
 * @ example
 * // returns 'V' 5
 * arabicToRoman(5);
 */
function arabicToRoman(num) {
    if (!Number.isInteger(num) ||
        num < minRomanNumber || num > maxRomanNumber) {
        return null;
    }

    const thousends = thousendsArr[parseInt(num / 1000)];
    const hundreds = hundredsArr[parseInt(num / 100 % 10)];
    const tens = tensArr[parseInt(num / 10 % 10)];
    const ones = onesArr[parseInt(num % 10)];

    return thousends + hundreds + tens + ones;
}


/**
 *
 * Convert Roman to Arabic numerals
 *
 * @param {string} str - given string roman number
 * @returns {integer} result - integer number
 *
 * @ example
 * // returns 5
 * romanToArabic('V');
 */
function romanToArabic(str) {
    if (!str || str.length > maxRomanNumLength) {
        return null;
    }

    return str.toUpperCase().split('').reduce(function (previousValue, currentItem, index, arr) {
        const firstDigit = digitsConformity[arr[index]];
        const secondDigit = digitsConformity[arr[index + 1]];
        const thirdDigit = digitsConformity[arr[index + 2]];

        if (secondDigit && thirdDigit && firstDigit <= secondDigit && secondDigit < thirdDigit) {
            return previousValue;
        }

        if (secondDigit > firstDigit) {
            return previousValue - firstDigit;
        }
        
        return previousValue + firstDigit;
    }, 0);
}


/**
 *
 * Convert Roman to Arabic numerals and vice versa
 *
 * @param {string} numToConvert - given roman number string or integer arabic number
 * @returns {string, integer} result - integer number or string (converted number)
 *
 * @ example
 * // returns 5
 * roman('V');
 */
function roman(numToConvert) {
    if (typeof numToConvert === "number") {
        return arabicToRoman(numToConvert);
    }
    
    if (typeof numToConvert === "string") {
        if (/^[IVXLCDM]+$/i.test(numToConvert)) {
            return romanToArabic(numToConvert);
        }
        
        if (/^[1234567890]+$/i.test(numToConvert)) {
            return arabicToRoman(parseInt(numToConvert));
        }
    }

    return null;
}
