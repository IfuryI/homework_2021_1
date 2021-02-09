'use strict'; // Включает строгий режим


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
    const ones = ["","I","II","III","IV","V","VI","VII","VIII","IX"];
    const tens = ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"];
    const hunds = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"];
    const thous = ["","M","MM","MMM","MMMM"];
    
    const t = thous[parseInt(num / 1000)];
    const h = hunds[parseInt(num / 100 % 10)];
    const te = tens[parseInt(num / 10 % 10)];
    const o = ones[parseInt(num % 10)];
    
    let res = t + h + te + o;

    return res;
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
	const arab = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
	const roman = ['I','IV','V','IX','X','XL','L','XC','C','CD','D','CM','M'];

	str = str.toUpperCase();

	let ret = 0;
	let i = arab.length - 1;
	let pos = 0;

	while (i >= 0 && pos < str.length) {
		if (str.substr(pos, roman[i].length) == roman[i]) {
			ret += arab[i];
			pos += roman[i].length;
		}
		else {
			i--;
		}
	}

    if (ret < 0 || ret > 3999) {
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
 * numCorrectnesCheck("IV", "IVXLCDM");
 */
const numCorrectnesCheck = (str, containsOf) => {
	const template = containsOf;

	str = str.toUpperCase();

	for (var i = 0; i < str.length; i++) {
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
 * @param {str} string - given string or integer roman number
 * @returns {res} result - integer number or string (converted number)
 *
 * @ example
 * // returns 5
 * roman('V');
 */
function roman(numToConvert) {
	if (numToConvert === null || numToConvert === undefined) {
		return null;
	}

	if (typeof numToConvert === "number" && Number.isInteger(numToConvert) === true &&
		numToConvert != NaN && numToConvert != Infinity &&
		numToConvert > 0 && numToConvert < 4000) {
		return arabicToRoman(numToConvert);
	}
	else if (typeof numToConvert === "string" && numToConvert.length != 0) {
		if (numCorrectnesCheck(numToConvert, "IVXLCDM") === true) {
			return romanToArabic(numToConvert);
		}
		else if (numCorrectnesCheck(numToConvert, "1234567890") === true &&
				 numToConvert != NaN && numToConvert != Infinity &&
				 numToConvert > 0 && numToConvert < 4000) {
			return arabicToRoman(parseInt(numToConvert));
		}
	}

	return null;
}
