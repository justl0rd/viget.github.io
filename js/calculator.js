'use strict'

class Calculator {
	constructor(parentEl) {
		this.state = {
			isOpen: false
		}

		this.createElements(parentEl);
		window.addEventListener('click', this.showElement());
		this.stateHandler();
	}

	showElement() {
		const calculator = parentEl.querySelector('.calculator'),
			state = this.state;

		return e => {
			const {target} = e;

			if (target.contains(calculator)) {
				state.isOpen = true;
				this.stateHandler();
			}

			if (!parentEl.contains(target)) {
				state.isOpen = false;
				this.stateHandler();
			}
		}
	}

	stateHandler() {
		const calculator = parentEl.querySelector('.calculator');

		setTimeout(() => {
			if (this.state.isOpen) {

				calculator.classList.add('active');
			}
			else{
				calculator.classList.remove('active');
			}
		}, 0);
	}

	createElements(container) {
		container.innerText = '';
		
		const calculator = document.createElement('div'),
			display = document.createElement('div'),
			numButtons = document.createElement('div'),
			funcButtons = document.createElement('div'),

		funcButtonsNames = [{plus:'+'}, {min:'-'}, {equ:'='}, {dot:'.'}, {mul:'*'}, {div:'/'}, {mod:'%'}];

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

const parentEl = document.querySelector('.nav__item_calc');
const calculator = new Calculator(parentEl);



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