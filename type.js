/**
* TypeGame © 2017 -
* Coltrane Nadler
*/
let words, input, activeWord, activeElem;
let LETTERS = 0;
let correctKeyStrokes 		= 0
	, incorrectKeyStrokes 	= 0;

console.log('hi!!');
let total = 0;
let init = function() {
	words 					= document.getElementById('word-box')
	input 					= document.getElementById('input');


	/**
	* @eventListner keydown
	* if countdown is not active, start the timer
	*/
	input.addEventListener('keydown', e => {
		if(!countdown)
			startTimer();
	})

	input.addEventListener('keydown', e => {
		if(e.keyCode === 32 || e.keyCode === 8)
			return;

		total++;
	})

	/**
	* @eventListener keyup
	* when user types, check if the word they are typing so far is correct
	*/
	input.addEventListener('keyup', e => {
		let word = activeElem.innerHTML;
		let val = input.value;

		// next word
		if(e.keyCode === 32) {
			// new word
			if(val.length === 1 && val.charCodeAt(0) === 32)
				return input.value = '';

			input.value = input.value.split(' ')[1];

			// go to next word
			wordCount++;
			
			if(activeElem.innerHTML === val.split(' ')[0]) {
				activeElem.className = 'correct';
				LETTERS += activeElem.innerHTML.length;
				correctWordCount++;
			} else {
				activeElem.className = 'wrong';
			}

			if(parseInt(activeElem.id) === words.firstElementChild.children.length) {
				words.lastElementChild.firstElementChild.className = 'highlight';
				words.firstElementChild.remove();
				words.appendChild(createWordLine());
				activeElem = words.firstElementChild.firstElementChild;
			} else {
				activeElem = words.firstElementChild.children.namedItem(parseInt(activeElem.id) + 1);
				activeElem.className = 'highlight';
			}

		// check keystrokes
		} else if(e.keyCode !== 8) {
			// check keystrokes
			let testCase = word.split('').splice(0, val.length).join('');
			val = val.split(' ')[1] ? val.split(' ')[1] : val.split(' ')[0];
			// let testCase = c.split(' ')[0].split('').splice(0, val.length).join('');
			console.log(val + ' ' + testCase)

			console.log(val !== testCase);

			// incorrect keystroke
			if(val !== testCase) {
				incorrectKeyStrokes++;
				activeElem.className = 'highlight-wrong';
			// correct keystroke
			} else {
				correctKeyStrokes++;
				activeElem.className = 'highlight';
			}
		} else {
			// nothin
		}
	})

	wordsInit();
}

function wordsInit() {
	words.innerHTML = '';
	// init stuff
	words.appendChild(createWordLine());
	words.appendChild(createWordLine());

	activeElem = words.firstElementChild.firstElementChild;
	words.firstElementChild.firstElementChild.className = 'highlight';
}

/**
* returns HTMLElement
*/
function createWordLine() {
	// MAX AMOUNT OF LETTERS IN THE LINE SHOULD NOT EXCEED 26!!
	var elem 				= document.createElement('div');
	var str 				= '';
	var count 				= 0;

	var j = 0;
	while(true) {
		var w = dictionary[Math.round(Math.random() * (dictionary.length-1))];
		count += w.length;
		j++;
		if(count < 30)
			str += '<span class="" id="' + (j) + '">' + w + '</span>'
		else
			break;

		// for the possible space 
		count += 1;
	}

	elem.innerHTML = str;

	return elem;
}