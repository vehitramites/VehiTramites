//Función para subir página
const button = document.getElementById('up-page');
button.addEventListener('click', ()=> {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})

class Carousel {
    constructor(carouselElement) {
        this.carousel = carouselElement;
        this.imagesContainer = this.carousel.querySelector('.carousel-images');
        this.images = this.carousel.querySelectorAll('.carousel-images img');
        this.prevBtn = this.carousel.querySelector('.carousel-btn.prev');
        this.nextBtn = this.carousel.querySelector('.carousel-btn.next');
        this.dotsContainer = this.carousel.querySelector('.carousel-dots');
        this.currentIndex = 0;
        this.autoPlayInterval = null;

        this.init();
    }

    init() {
        this.createDots();
        this.updateCarousel();
        this.startAutoPlay();
        this.addEventListeners();
    }

    createDots() {
        this.images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            this.dotsContainer.appendChild(dot);
        });
    }

    updateDots() {
        const dots = this.carousel.querySelectorAll('.carousel-dots .dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[this.currentIndex].classList.add('active');
    }

    updateCarousel() {
        const width = this.images[0].clientWidth;
        this.imagesContainer.style.transform = `translateX(-${this.currentIndex * width}px)`;
        this.updateDots();
    }

    goToNextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateCarousel();
    }

    goToPrevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateCarousel();
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.goToNextSlide(), 3000);
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }

    addEventListeners() {
        this.nextBtn.addEventListener('click', () => {
            this.goToNextSlide();
            this.resetAutoPlay();
        });

        this.prevBtn.addEventListener('click', () => {
            this.goToPrevSlide();
            this.resetAutoPlay();
        });

        window.addEventListener('resize', () => this.updateCarousel());
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const carouselElement1 = document.querySelector('#carousel1');
    const carouselElement2 = document.querySelector('#carousel2')
    if (carouselElement1 && carouselElement2) {
        new Carousel(carouselElement1);
        new Carousel(carouselElement2);
    }
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});



