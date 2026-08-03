let swiperGallery = null;

function initSwiper() {
    // 1. Destruir si ya existe para evitar duplicados
    if (swiperGallery) {
        swiperGallery.destroy(true, true);
    }

    // 2. Inicializar nuevo Swiper
    swiperGallery = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true, // Necesario para el autoplay fluido
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        
        // CONFIGURACIÓN DE AUTOPLAY
        autoplay: {
            delay: 1500, // Velocidad: 1.5 segundos entre cambios
            disableOnInteraction: false, // Sigue girando aunque el usuario toque
            pauseOnMouseEnter: true // Se pausa si pasas el mouse por encima
        },
        speed: 800, // Qué tan suave es la transición

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

    // 2. Lógica de filtrado
    document.querySelectorAll(".gallery-item").forEach(item => {
        if (category === "todas" || item.dataset.category === category) {
            item.style.display = "";
            item.classList.add("swiper-slide");
        } else {
            item.style.display = "none";
            item.classList.remove("swiper-slide");
        }
    });

    // 3. Reiniciar Swiper tras el filtrado
    setTimeout(() => {
        initSwiper();
    }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
    // Inicialización inicial
    initSwiper();

    // Eventos para botones
    const filterButtons = document.querySelectorAll(".btn-filter");
    filterButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const category = button.getAttribute("data-category");
            filterGallery(category, event);
        });
    });
});