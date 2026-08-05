let swiperGallery = null;

function initSwiper() {
    if (swiperGallery) {
        swiperGallery.destroy(true, true);
    }


    swiperGallery = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true, 
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        
        
        autoplay: {
            delay: 1500, 
            disableOnInteraction: false, 
            pauseOnMouseEnter: true 
        },
        speed: 800, 

        pagination: { 
            el: ".swiper-pagination", 
            clickable: true 
        },
        navigation: { 
            nextEl: ".swiper-button-next", 
            prevEl: ".swiper-button-prev" 
        },
        breakpoints: {
            0: { slidesPerView: 1, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 20 }
        }
    });
}

function filterGallery(category, event) {
    // 1. Manejo de botones activos
    document.querySelectorAll(".btn-filter").forEach(btn => {
        btn.classList.remove("active");
    });
    event.currentTarget.classList.add("active");

    
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

    
    const filterButtons = document.querySelectorAll(".btn-filter");
    filterButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const category = button.getAttribute("data-category");
            filterGallery(category, event);
        });
    });
});