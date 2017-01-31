document.addEventListener('DOMContentLoaded',function() {
	const quiz = document.querySelector('#quiz');
	const score = document.querySelector('#score');
	const level = quiz.querySelector('#level');
	const question = quiz.querySelector('#question');
	let userScore = 0, totalQuestions = 0, userLevel = 1, operators = [], range = [], result = 0;

	function setOperatorsAndRange() {
		switch (userLevel) {
			case 1:
				operators = ['+', '-'];
				range = [1,10];
				break;
			case 2:
				operators = ['+', '-'];
				range = [11,30];
				break;
			case 3:
				operators = ['+', '-'];
				range = [31,50];
				break;
			case 4:
				operators = ['*', '/'];
				range = [1,10];
				break;
			case 5:
				operators = ['+', '-', '*', '/'];
				range = [1,10];
				break;
		}
	}

	function calculateResult(x,y,operator) {
		switch (operator) {
			case '+': return x + y;
			case '-': return x - y;
			case '*': return x * y;
			case '/': return x / y;
		}
	}

	function randomNumber(min,max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	function generateQuestion() {
		score.innerHTML = `Score :- ${userScore} / ${totalQuestions}`;
		level.innerHTML = `Level ${userLevel}`;
		setOperatorsAndRange();
		let num1 = randomNumber(range[0],range[1]);
		let num2 = randomNumber(range[0],range[1]);
		const randomOperator = operators[randomNumber(0,operators.length)];
		if(randomOperator === '/') {
			while(num1 % num2 !== 0) {
				num1 = randomNumber(range[0],range[1]);
				num2 = randomNumber(range[0],range[1]);
			}
		}
		result = calculateResult(num1, num2, randomOperator);
		question.innerHTML = `${num1} ${randomOperator} ${num2} = `;
	}

	generateQuestion();

	quiz.querySelector('[name=answer]').addEventListener('keyup', function(e) {
		const ans = e.target.value;
		if(e.which === 13) {
			if(ans.length === 0) {
				swal({
					  title: 'Dumbass',
					  text: 'Enter the answer!!',
					  type: 'warning',
					  timer: 1500
					});
			}
			else {
				e.target.value = '';
				if(+ans === result) {
					userScore++;
				}
				else {
					swal({
					  title: 'Wrong Answer',
					  text: `Correct answer is ${result}!!`,
					  type: 'error',
					  timer: 1500
					});
				}
				totalQuestions++;
				const currentLevel = userLevel;
				userLevel = Math.floor(userScore / 10) + 1;
				if(currentLevel !== userLevel) {
					swal(
					  'Good job!',
					  `You reached Level ${userLevel}!`,
					  'info'
					);
				}
				if(userLevel === 6) {
					swal({
					  title: 'Congratulations!',
					  text: `You completed the Quiz!`,
					  type: 'success',
					  confirmButtonText: 'Restart the Quiz !!'
					}).then(function () {
					  userScore = 0;
					  userLevel = 1;
					  totalQuestions = 0;
					  generateQuestion();
					});
				}
				generateQuestion();
			}
		}
	});
});
