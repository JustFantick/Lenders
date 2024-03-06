const img = document.querySelector(".faq-btn");

const faq = document.querySelector(".faq");
const faqClose = document.querySelector(".faq-close");
const faqItems = document.querySelectorAll(".faq-item");

img.addEventListener("click", (e) => {
    const { target } = e;
    faq.classList.toggle("faq-active");
});
faqClose.addEventListener("click", (e) => {
    faq.classList.remove("faq-active");
});
let prevItem;
Array.from(faqItems).forEach((el) => {
    el.addEventListener("click", (e) => {
        const {
            currentTarget,
            currentTarget: { lastElementChild },
        } = e;
        currentTarget.classList.toggle("faq-item-active");
        if (lastElementChild.style.maxHeight) {
            console.log("maxHeight if", lastElementChild.style.maxHeight);
            lastElementChild.style.maxHeight = null;
        } else {
            lastElementChild.style.maxHeight =
                lastElementChild.scrollHeight + "px";
            console.log("maxHeight else", lastElementChild.style.maxHeight);
        }
        if (
            prevItem &&
            prevItem != currentTarget &&
            prevItem.lastElementChild.style.maxHeight
        ) {
            prevItem.lastElementChild.style.maxHeight = null;
            console.log(
                "maxHeight prevItem",
                prevItem.lastElementChild.style.maxHeight
            );
        }
        prevItem = currentTarget;
    });
});
const img2 = document.querySelector(".faq-btn2");

img2.addEventListener("click", (e) => {
    const { target } = e;
    faq.classList.toggle("faq-active");
});
faqClose.addEventListener("click", (e) => {
    faq.classList.remove("faq-active");
});
