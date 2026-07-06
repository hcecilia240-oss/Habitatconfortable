let swiperGallery = null;

function initSwiper() {

    if (swiperGallery) {
        swiperGallery.destroy(true, true);
    }

    swiperGallery = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: false,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 15
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        }
    });
}

function filterGallery(category, event) {

    // Botón activo
    document.querySelectorAll(".btn-filter").forEach(btn => {
        btn.classList.remove("active");
    });

    event.currentTarget.classList.add("active");

    // Filtrar elementos
    document.querySelectorAll(".gallery-item").forEach(item => {

        if (category === "todas" || item.dataset.category === category) {
            item.style.display = "";
            item.classList.add("swiper-slide");
        } else {
            item.style.display = "none";
            item.classList.remove("swiper-slide");
        }

    });

    setTimeout(() => {
        initSwiper();
    }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
    initSwiper();
});