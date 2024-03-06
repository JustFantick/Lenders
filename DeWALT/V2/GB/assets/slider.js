// Получаем элементы слайдера
const slider = document.querySelector(".slider");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const slides = Array.from(slider.querySelectorAll("img"));
const slideCount = slides.length;
let slideIndex = 0;

// Устанавливаем обработчики событий для кнопок
prevButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);

// Функция для показа предыдущего слайда
function showPreviousSlide() {
    clearInterval(cl);
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    updateSlider();
}

// Функция для показа следующего слайда
function showNextSlide() {
    clearInterval(cl);
    slideIndex = (slideIndex + 1) % slideCount;
    updateSlider();
}

// Функция для обновления отображения слайдера
function updateSlider() {
    const imageWidth = slider.clientWidth;
    const slideOffset = -slideIndex * imageWidth;
    slider.style.transform = `translateX(${slideOffset}px)`;
}

// Инициализация слайдера
updateSlider();
const cl = setInterval(() => {
    slideIndex = (slideIndex + 1) % slideCount;
    updateSlider();
}, 5000);

// Получаем элементы слайдера
const slider2 = document.querySelector(".slider2");
const prevButton2 = document.querySelector(".prev-button2");
const nextButton2 = document.querySelector(".next-button2");
const slides2 = Array.from(slider2.querySelectorAll("img"));
const slideCount2 = slides2.length;
let slideIndex2 = 0;

// Устанавливаем обработчики событий для кнопок
prevButton2.addEventListener("click", showPreviousSlide2);
nextButton2.addEventListener("click", showNextSlide2);

// Функция для показа предыдущего слайда
function showPreviousSlide2() {
    clearInterval(cl2);
    slideIndex2 = (slideIndex2 - 1 + slideCount2) % slideCount2;
    updateSlider2();
}

// Функция для показа следующего слайда
function showNextSlide2() {
    clearInterval(cl2);
    slideIndex2 = (slideIndex2 + 1) % slideCount2;
    updateSlider2();
}

// Функция для обновления отображения слайдера
function updateSlider2() {
    const imageWidth = slider2.clientWidth;
    const slideOffset = -slideIndex2 * imageWidth;
    slider2.style.transform = `translateX(${slideOffset}px)`;
}

// Инициализация слайдера
updateSlider2();
const cl2 = setInterval(() => {
    slideIndex2 = (slideIndex2 + 1) % slideCount2;
    updateSlider2();
}, 5000);
