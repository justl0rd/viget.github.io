'use strict'

class Calculator {
	constructor(container, activateTrigger) {
		this.state = {
			isOpen: false,
			display: []
		}

		this.createElements(container);
		activateTrigger.addEventListener('click', this.showElement());
		container.addEventListener('click', this.getDisplayData());
		this.stateIsOpenHandler(false);

	}

	showElement() {
		const calculator = container.querySelector('.calculator'),
			state = this.state,
			activateHandler = this.stateIsOpenHandler.bind(this);

		return e => {
			const {target} = e;
			
			if (target.className === activateTrigger.className) {
				if (!state.isOpen) {
					calculator.classList.add('calculator_open');
					calculator.classList.remove('calculator_close');
					activateHandler(true);
				}
				else {
					calculator.classList.add('calculator_close');
					calculator.classList.remove('calculator_open');
					setTimeout(()=>{calculator.classList.remove('calculator_close')}, 1500);
					activateHandler(false);
				}
			}
		}
	}

	getDisplayData() {
		const state = this.state,
			showInput = this.stateDisplayHandler.bind(this),
			clear = this.clearDisplay.bind(this),
			result = this.result.bind(this);

		return e => {
			const {textContent: value} = e.target;

			if (e.target.classList.contains('calculator__num-button') || e.target.classList.contains('calculator__func-button')) {
				state.display.push(value);
				showInput();
			}

			switch(value) {
				case 'ce':
					clear();
					break;
				case '=':
					
					if (state.display[0] == '=') {
						alert('Введите число');
						clear();
					}
					else result();
					break;
				case '0':
					if (state.display[0] == 0) {
						alert('Число не может начинатся с нуля!');
						clear();
					}
					break;
			}
		}
	}

	clearDisplay() {
		const {display} = this.state,
			displayEl = document.querySelector('.calculator__display');

		display.splice(0, display.length);
		displayEl.innerText = '';
	}

	result() {
		const {display} = this.state,
			displayEl = document.querySelector('.calculator__display'),
			resultStr = display.splice(0, display.length - 1).join('');
		displayEl.innerText = `${eval(resultStr)}`;
		display.splice(0, display.length);
	}

	stateIsOpenHandler(isOpen) {
		setTimeout(() => {this.state.isOpen = isOpen}, 1000);
	}

	stateDisplayHandler() {
		const {display} = this.state,
			displayEl = document.querySelector('.calculator__display');

		displayEl.innerText = display.join('');
	}

	createElements(container) {
		container.innerText = '';
		
		const calculator = document.createElement('div'),
			display = document.createElement('div'),
			numButtons = document.createElement('div'),
			funcButtons = document.createElement('div'),

		funcButtonsNames = [{plus:'+'}, {min:'-'}, {equ:'='}, {dot:'.'}, {mul:'*'}, {div:'/'}, {mod:'%'}, {del: 'ce'}];

		calculator.classList.add('calculator');
		display.classList.add('calculator__display');
		numButtons.classList.add('calculator__num-buttons');
		funcButtons.classList.add('calculator__func-buttons');

		for(let i = 0; i < 10; i++) {
			const numButton = document.createElement('div');
			numButton.classList.add('calculator__num-button');
			numButton.innerText = i;
			numButtons.append(numButton);
		}

		funcButtonsNames.forEach(el => {
			const funcButton = document.createElement('div');

			for (let key in el) {
				funcButton.classList.add(`calculator__func-button`, `calculator__func-button_${key}`);
				funcButton.innerText = el[key];
			}

			funcButtons.append(funcButton);
		});

		calculator.append(display, numButtons, funcButtons);
		container.append(calculator);
	}
}

const container = document.querySelector('#calc'),
	activateTrigger = document.querySelector('.nav__item_calc');

const calculator = new Calculator(container, activateTrigger);



// <div class="calculator">
// 	<div class="calculator__display"></div>
// 	<div class="calculator__num-buttons">
// 		<div class="calculator__num-button">1</div>
// 		<div class="calculator__num-button">2</div>
// 		<div class="calculator__num-button">3</div>
// 		<div class="calculator__num-button">4</div>
// 		<div class="calculator__num-button">5</div>
// 		<div class="calculator__num-button">6</div>
// 		<div class="calculator__num-button">7</div>
// 		<div class="calculator__num-button">8</div>
// 		<div class="calculator__num-button">9</div>
// 		<div class="calculator__num-button">0</div>
// 	</div>
// 	<div class="calculator__func-buttons">
// 		<div class="calculator__funct-button"></div>
// 	</div>
// </div>