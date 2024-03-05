const wrapper = document.querySelector('.wrapper');
const contentWrapper = document.querySelector('.main');
const Loader = document.querySelector('#loader').content.cloneNode(true);
const ChoisePopup = document.querySelector('#choise-popup').content.cloneNode(true);
const Prizes = document.querySelector('#prizes-grid').content.cloneNode(true);
const PrizesItem = document.querySelector('#prize-item').content.cloneNode(true);
const ErrorPopup = document.querySelector('#error-popup').content.cloneNode(true);
const CongratsPopup = document.querySelector('#congrats-popup').content.cloneNode(true);
const FaqPopup = document.querySelector('#faq-popup').content.cloneNode(true);

const userQuizAnswers = [], quizLength = 3;
const questionsList = [
	"Quel type d'alcool préférez-vous ?",
	"Avez-vous déjà essayé les produits Moet Chandon ?",
	"Qu'appréciez-vous le plus dans les spiritueux ?",
];

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function clearContentWrapper() {
	wrapper.classList.add('close-anim');
	await wait(200);

	contentWrapper.innerHTML = '';
	wrapper.classList.remove('close-anim');
}

initHomeLayout();

function initHomeLayout() {
	new Swiper('.slider', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		autoplay: {
			delay: 15000,
		}
	});

	const quizSlider = new Swiper('.quiz-slider', {
		autoHeight: true,
		spaceBetween: 30,
		allowTouchMove: false,
	});

	const quizSlidesArr = document.querySelectorAll('.quiz-slider .swiper-slide');

	for (let i = 0; i < quizLength; i++) {
		quizSlidesArr[i].addEventListener('click', (e) => {
			if (!e.target.classList.contains('button')) return;
			userQuizAnswers.push({
				questionId: e.target.closest('.swiper-slide').dataset.slideindex,
				answerText: e.target.textContent.trim(),
			});

			if (i !== quizLength - 1) {
				quizSlider.slideNext();
				editQuestionInfo(i + 1);
			} else {
				removeHomeLayout();
			}
		});
	}

	const faqIcon = document.querySelector('.faq-icon');
	faqIcon.addEventListener('click', () => {
		contentWrapper.prepend(FaqPopup.cloneNode(true));

		document.querySelector('.popup').addEventListener('click', handleFaqPopupClick);
		async function handleFaqPopupClick(e) {
			this.removeEventListener('click', handleFaqPopupClick);

			wrapper.classList.add('close-anim');
			await wait(200);

			document.querySelector('.popup').remove();
			wrapper.classList.remove('close-anim');
		}
	});

	function editQuestionInfo(questionIndex) {
		document.getElementById('quiz-counter').textContent = `Questions ${questionIndex + 1} sur 3`;
		document.getElementById('quiz-question').textContent = questionsList[questionIndex];
	}

	async function removeHomeLayout() {
		wrapper.classList.add('close-anim');

		setTimeout(() => {
			document.querySelector('.home').remove();
			wrapper.classList.remove('close-anim');
			initLoader();
		}, 100);
	}
}

async function initLoader() {
	contentWrapper.prepend(Loader);
	await wait(3000);

	await clearContentWrapper();
	initChoisePopup();
}

function initChoisePopup() {
	contentWrapper.prepend(ChoisePopup);

	document.querySelector('.choise-popup p time').textContent = new Intl.DateTimeFormat("lb").format(new Date());
	contentWrapper.querySelector('.button').addEventListener('click', async () => {
		await clearContentWrapper();
		initPrizes();
	});
}

function initPrizes() {
	const popupOpenDelay = 4000;//4s
	const prizesContainer = Prizes.querySelector('.prizes-grid');
	prizesContainer.classList.add('fade-out-anim');
	prizesContainer.classList.add('once');
	prizesContainer.style = `--anim-order: ${0};`;

	contentWrapper.prepend(prizesContainer);

	for (let i = 0; i < 12; i++) {
		let temp = PrizesItem.querySelector('.prize-item').cloneNode(true);
		prizesContainer.appendChild(temp);
	}

	let attemptCounter = 3;
	const prizeBoxesArr = prizesContainer.querySelectorAll('.prize-item');
	prizeBoxesArr.forEach(prize => {
		prize.addEventListener('click', () => {
			if (prize.classList.contains('open')) return;
			prize.classList.add('open');

			if (attemptCounter > 1) {
				attemptCounter--;
				setTimeout(() => {
					openErrorPopup(attemptCounter)
				}, popupOpenDelay * 0.75);
			} else {
				prize.classList.add('win');
				setTimeout(openCongratsPopup, popupOpenDelay);
			}
		});
	});

	function openErrorPopup(n) {
		contentWrapper.append(ErrorPopup.cloneNode(true));
		contentWrapper.querySelector('#attempts-count').textContent = n
		contentWrapper.querySelector('.error-popup .button').addEventListener(
			'click',
			closeActivePopup,
			{ once: true },
		);
	}

	function openCongratsPopup() {
		contentWrapper.append(CongratsPopup.cloneNode(true));

		startTimer(120);//120seconds = 2minutes

		contentWrapper.querySelector('.congrats-popup .button').addEventListener(
			'click',
			() => { },//placeholder function
			{ once: true }
		);

		function startTimer(durationInSeconds) {
			let timer = durationInSeconds;
			const interval = setInterval(function () {
				const minutes = Math.floor(timer / 60);
				let seconds = timer % 60;
				seconds = seconds < 10 ? "0" + seconds : seconds;
				contentWrapper.querySelector('#timer').textContent = `${minutes} minutes ${seconds} seconds`;

				if (--timer < 0) clearInterval(interval);
			}, 1000);
		}
	}

	async function closeActivePopup() {
		wrapper.classList.add('close-anim');
		await wait(200);

		contentWrapper.querySelector('.popup').remove();
		wrapper.classList.remove('close-anim');
	}
}