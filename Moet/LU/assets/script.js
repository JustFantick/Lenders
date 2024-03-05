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
	contentWrapper.prepend(Prizes);
	const prizesContainer = contentWrapper.querySelector('.prizes-grid');

	for (let i = 0; i < 12; i++) {
		let temp = PrizesItem.querySelector('.prize-item').cloneNode(true);
		temp.classList.add('slide-left-anim');
		temp.classList.add('once');
		temp.style = `--anim-order: ${i};`;
		prizesContainer.appendChild(temp);
	}

	let showError = true;
	const prizeBoxesArr = prizesContainer.querySelectorAll('.prize-item');
	const closePrizeBoxes = () => prizeBoxesArr.forEach(prize => prize.classList.remove('open'));
	prizeBoxesArr.forEach(prize => {
		prize.addEventListener('click', () => {
			if (prize.classList.contains('open')) {
				prize.classList.remove('open');
				return;
			}
			closePrizeBoxes();
			prize.classList.add('open');

			if (showError) {
				openErrorPopup();
				showError = false;
			} else {
				openCongratsPopup();
			}
		});
	});

	function openErrorPopup() {
		contentWrapper.append(ErrorPopup.cloneNode(true));
		contentWrapper.querySelector('.error-popup .button').addEventListener(
			'click',
			closeActivePopup,
			{ once: true },
		);
	}

	function openCongratsPopup() {
		contentWrapper.append(CongratsPopup.cloneNode(true));

		contentWrapper.querySelector('.congrats-popup .button').addEventListener(
			'click',
			closeActivePopup,
			{ once: true }
		);
	}

	async function closeActivePopup() {
		wrapper.classList.add('close-anim');
		await wait(200);

		contentWrapper.querySelector('.popup').remove();
		wrapper.classList.remove('close-anim');
	}
}