import React from 'react';
import ReactDOM from 'react-dom';

class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

ReactDOM.render(
  <HelloMessage name="John" />,
  document.getElementById('container')
);

/**
* TypeGame © 2017 -
* Coltrane Nadler
*/
let words, input, activeWord, activeElem;
let LETTERS = 0;
let correctKeyStrokes 		= 0
	, incorrectKeyStrokes 	= 0;

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

	// var time, 
	// elements
		// let input = document.getElementById('input')
			// , words = document.getElementById('words');

		// word list
	let dictionary
		, countdown 	= false
		, time 			= 60
		, wordCount		= 0
		, correctWordCount = 0
		, timeElem 		= document.getElementById('time');

	var redScore 		= document.getElementById('red-score')
		, blueScore 	= document.getElementById('blue-score');

	var gameBoard 		= document.getElementById('game-board')
		, scoreBoard 	= document.getElementById('score-board');

	var restartBtn 		= document.getElementById('restart-btn');

	var typeScore 		= {
		wpm: document.getElementById('type-score-wpm'),
		keystrokes: document.getElementById('type-score-keystrokes'),
		correctWordCount: document.getElementById('type-score-correct-word-count'),
		incorrectWordCount: document.getElementById('type-score-incorrect-word-count')
	}

	window.onload = function() {
		let http = new XMLHttpRequest();
		http.open('GET', 'https://raw.githubusercontent.com/ColtraneNadler/TypeGame/master/words.txt', true);
		http.send();
		http.onreadystatechange = function() {
			if(this.readyState === 4) {
				dictionary = this.responseText.split('\n');

				// start game
				init();
			}
		}
	}

	restartBtn.addEventListener('click', e => {
		scoreBoard.hidden = true;
		gameBoard.hidden = false;
	})

	function updateTime() {
		time--;
		// TERNARY OPERATOR BB
		timeElem.innerHTML = '0:' + (time < 10 ? '0' + time : time);

		if(time > 0)
			setTimeout(updateTime, 1000);
		else
			reset();

		blueScore.heght = redScore.height = ~~(40 * (time/60)) + 'rem !important';
	}

	function startTimer() {
		countdown = true;
		setTimeout(updateTime, 1000);
	}

	function reset() {
		time = 60;
		countdown = false;
		words.innerHTML = '';
		input.value = '';
		timeElem.innerHTML = '1:00';
		typeScore.wpm.innerHTML = ~~(correctKeyStrokes / 5) + ' WPM!';
		typeScore.keystrokes.innerHTML = (correctKeyStrokes + incorrectKeyStrokes) + ' (<span class="correct">' + correctKeyStrokes + '</span> | <span class="wrong">' + incorrectKeyStrokes + '</span>)'
		typeScore.correctWordCount.innerHTML = correctWordCount;
		typeScore.incorrectWordCount.innerHTML = wordCount - correctWordCount;
		gameBoard.hidden = true;
		scoreBoard.hidden = false;
		wordCount = 0;
		correctWordCount = 0;
		correctKeyStrokes = 0;
		incorrectKeyStrokes = 0;
		incorrectWordCount = 0;
		LETTERS = 0;

		wordsInit();
	}

	/**
	* @param int score
	* returns int rem
	*/
	function score2rem(score) {
		// time percentage
		var t = time / 60;

		// if not the leader, what percentage of their score
		var s = leader / score;

		// time percentage multipled by score percentage
		var p = t * s;

		// multiply value by 40 to get percentage of rem to display score
		return ~~(40 * p);
	}

}
