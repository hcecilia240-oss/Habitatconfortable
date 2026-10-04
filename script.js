let swiperGallery = null;

function initSwiper() {

    if (swiperGallery) {
        swiperGallery.destroy(true, true);
    }

    swiperGallery = new Swiper(".mySwiper", {

        slidesPerView: 3,
        spaceBetween: 20,

        loop: true,

        speed: 800,

        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },

        pagination: {
            el: ".mySwiper .swiper-pagination",
            clickable: true
        },

        navigation: {
            nextEl: ".mySwiper .swiper-button-next",
            prevEl: ".mySwiper .swiper-button-prev"
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


/* ==========================================
   FILTRO DE GALERÍA
========================================== */

function filterGallery(category, clickedButton) {

    // Cambiar botón activo
    document.querySelectorAll(".btn-filter").forEach(function(button) {
        button.classList.remove("active");
    });

    clickedButton.classList.add("active");


    // Destruir el Swiper actual
    if (swiperGallery) {
        swiperGallery.destroy(true, true);
        swiperGallery = null;
    }


    // Buscar todas las imágenes originales
    const allItems = document.querySelectorAll(
        "#swiper-wrapper-gallery .gallery-item"
    );


    allItems.forEach(function(item) {

        const itemCategory = item.getAttribute("data-category");

        if (
            category === "todas" ||
            itemCategory === category
        ) {
            item.style.display = "";
            item.classList.add("swiper-slide");
        } else {
            item.style.display = "none";
            item.classList.remove("swiper-slide");
        }

    });


    // Volver a iniciar el carrusel
    setTimeout(function() {
        initSwiper();
    }, 100);

}



/* ==========================================
   AL CARGAR LA PÁGINA
========================================== */

document.addEventListener("DOMContentLoaded", function() {

    // Iniciar galería
    initSwiper();


    // Buscar botones
    const filterContainer =
        document.querySelector(".filter-container");


    if (!filterContainer) {
        console.error("No se encontró .filter-container");
        return;
    }


    // Detectar clic en los botones
    filterContainer.addEventListener("click", function(event) {

        const clickedButton =
            event.target.closest(".btn-filter");


        if (!clickedButton) {
            return;
        }


        const category =
            clickedButton.getAttribute("data-category");


        if (!category) {
            console.error(
                "El botón no tiene data-category"
            );
            return;
        }


        filterGallery(
            category,
            clickedButton
        );

    });

});

// Inicializar Tilt
VanillaTilt.init(document.querySelectorAll('.aliado-item'), {
    max: 15,          
    perspective: 1000, 
    scale: 1.05,       
    speed: 400,        
    glare: true,       
    "max-glare": 0.3,  
});

const aliadosSwiper = new Swiper('.aliadosSwiper', {
    slidesPerView: 2,
    spaceBetween: 30, // ¡Importante para que no queden pegados!
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: { slidesPerView: 3, spaceBetween: 30 },
        768: { slidesPerView: 4, spaceBetween: 30 },
        1024: { slidesPerView: 6, spaceBetween: 30 } // Mostramos los 6 juntos con espacio
    }
});