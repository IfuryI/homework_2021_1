'use strict';


const onesArr = ["","I","II","III","IV","V","VI","VII","VIII","IX"];
const tensArr = ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"];
const hundredsArr = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"];
const thousendsArr = ["","M","MM","MMM","MMMM"];

const arabNum = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
const romanNum = ['I','IV','V','IX','X','XL','L','XC','C','CD','D','CM','M'];

const minRomanNumber = 1;
const maxRomanNumber = 3999;


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
    if (Number.isInteger(num) != true ||
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
    if (str.length === 0) {
        return null;
    }

    str = str.toUpperCase();

    let result = 0;
    let i = arabNum.length - 1;
    let pos = 0;

    while (i >= 0 && pos < str.length) {
        if (str.substr(pos, romanNum[i].length) == romanNum[i]) {
            result += arabNum[i];
            pos += romanNum[i].length;
        }
        else {
            i--;
        }
    }

    if (result < minRomanNumber || result > maxRomanNumber) {
        return null
    }

    return result;
}


/**
 *
 * Checks that a string consists of template symbols
 *
 * @param {string} str - given string roman number
 * @param {string} containsOf - given template
 * @returns {bool} result - bool value
 *
 * @ example
 * // returns true
 * checkNumCorrectnes("IV", "I,V,X,L,C,D,M");
 */
const checkNumCorrectnes = (str, containsOf) => {
    if (str.length === 0) {
        return false;
    }

    let regexp = new RegExp(`^[${containsOf}]+$`, 'i');

    return !!str.match(regexp);
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
        if (checkNumCorrectnes(numToConvert, "I,V,X,L,C,D,M") === true) {
            return romanToArabic(numToConvert);
        }
        
        if (checkNumCorrectnes(numToConvert, "1,2,3,4,5,6,7,8,9,0") === true) {
            return arabicToRoman(parseInt(numToConvert));
        }
    }

    return null;
}
