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
 * @param {num} number - given integer number
 * @returns {res} result - roman number
 *
 * @ example
 * // returns 'V' 5
 * arabicToRoman(5);
 */
function arabicToRoman(num) {    
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
 * @param {str} string - given string roman number
 * @returns {res} result - integer number
 *
 * @ example
 * // returns 5
 * romanToArabic('V');
 */
function romanToArabic(str) {
    str = str.toUpperCase();

    let ret = 0;
    let i = arabNum.length - 1;
    let pos = 0;

    while (i >= 0 && pos < str.length) {
        if (str.substr(pos, romanNum[i].length) == romanNum[i]) {
            ret += arabNum[i];
            pos += romanNum[i].length;
        }
        else {
            i--;
        }
    }

    if (ret < minRomanNumber || ret > maxRomanNumber) {
        return null
    }

    return ret;
}


/**
 *
 * Checks that a string consists of template symbols
 *
 * @param {str} number - given string roman number
 * @param {str} containsOf - given template
 * @returns {res} result - bool value
 *
 * @ example
 * // returns true
 * checkNumCorrectnes("IV", "IVXLCDM");
 */
const checkNumCorrectnes = (str, containsOf) => {
    const template = containsOf;

    str = str.toUpperCase();

	for (let i = 0; i < str.length; i++) {
		if (template.indexOf(str[i]) === -1) {
			return false;
		}
	}

    return true;
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
    if (!numToConvert) {
        return null;
    }

    if (typeof numToConvert === "number" && Number.isInteger(numToConvert) === true &&
        numToConvert >= minRomanNumber && numToConvert <= maxRomanNumber) {
        return arabicToRoman(numToConvert);
    }
    
    if (typeof numToConvert === "string" && numToConvert.length != 0) {
        if (checkNumCorrectnes(numToConvert, "IVXLCDM") === true) {
            return romanToArabic(numToConvert);
        }
        
        if (checkNumCorrectnes(numToConvert, "1234567890") === true &&
            parseInt(numToConvert) >= minRomanNumber && parseInt(numToConvert) <= maxRomanNumber) {
            return arabicToRoman(parseInt(numToConvert));
        }
    }

    return null;
}
