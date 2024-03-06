const modals = document.querySelectorAll(".p_modal");
const qq3 = document.querySelector("#q3");
const boxesWrapper = document.querySelector("#boxes");
const commentsContent = document.querySelector("#comments");
const okModalButton = document.querySelector(".p_modal_button");

const modal1 = document.querySelector("#p_modal1");
const bq3Btn = document.querySelectorAll("[data-answer]");
const giftImg = document.querySelectorAll(".caja_gift-img");
const giftImgModal = document.querySelector(".gift-img-modal");
const giftImgWin = document.querySelector(".img_gift");

function displayGift(event) {
    let answer = event.target.dataset.answer;
    // const images = {
    //     1: "1.png",
    //     2: "2.png",
    //     3: "3.png",
    // };
    let imgPath = `./assets/prize.png`;
    let imgItems = Object.values(giftImg);

    imgItems.map((item) => {
        item.src = imgPath;
    });
    giftImgModal.src = imgPath;
    giftImgWin.src = imgPath;
    // return imgPath;
}
qq3.addEventListener("click", (e) => displayGift(e));

function hideBoxes() {
    boxesWrapper.style.display = "none";
    // commentsContent.style.display = "none";
    // footer.style.display = "none";
}

const showBoxes = () => {
    boxesWrapper.style.display = "block";
    // commentsContent.style.display = "block";
    // footer.style.display = "block";
};

qq3.addEventListener("click", hideBoxes);
okModalButton.addEventListener("click", showBoxes);

// console.log(modals)

document.querySelectorAll(".survey_button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
    });
});
const faqBtn = document.querySelector(".faq-btn");
const faqBlock = document.querySelector(".faq");

setTimeout(() => {
    faqBtn.classList.remove("hiiden");
    faqBlock.classList.remove("hiiden");
}, 100);

// const burger = document.querySelector('.burger');
// const toggleClick = () => {
//   burger.classList.toggle("burger-active");
// }

// burger.addEventListener('click', toggleClick)
