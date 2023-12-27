const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".section_categories-carousel");
const firstCardWidth = carousel.querySelector(
    ".section_categories-carousel--card"
).offsetWidth;
const arrowBtns = document.querySelectorAll(
    ".section_categories-header--cta span"
);
const carouselChildrens = [...carousel.children];

let isAutoPlay = true,
    startX,
    startScrollLeft,
    timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

carouselChildrens.slice(0, cardPerView).forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft +=
            btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    } else if (
        Math.ceil(carousel.scrollLeft) ===
        carousel.scrollWidth - carousel.offsetWidth
    ) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return;
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
