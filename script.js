// DECLARAMOS LA VARIABLE GLOBAL DE SWIPER Y EL ARRAY PARA LAS FOTOS
let gallerySwiper;
let allSlides = [];

document.addEventListener('DOMContentLoaded', () => {

    // 1. CAPTURAMOS LOS SLIDES ORIGINALES APENAS SE CARGA LA WEB
    // Usamos .gallery-item que es la clase que tienen tus enlaces en el HTML
    allSlides = Array.from(document.querySelectorAll('#swiper-wrapper-gallery .gallery-item'));

    // 2. INICIALIZACIÓN PREMIUM DE SWIPER
    gallerySwiper = new Swiper('.mySwiper', {
        slidesPerView: 1,       /* Cuántas fotos se ven en celular */
        spaceBetween: 20,       /* Espacio de separación entre fotos */
        grabCursor: true,       /* Cambia el mouse a una manito */
        
        // Configuración del movimiento automático
        autoplay: {
            delay: 2500,                    /* Se mueve cada 2.5 segundos */
            disableOnInteraction: false,    /* Sigue moviéndose aunque el usuario lo toque */
        },
        
        // Puntitos de navegación abajo
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        // Configuración según el tamaño de la pantalla (Responsivo)
        breakpoints: {
            640: {
                slidesPerView: 2, /* 2 fotos en tablets */
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3, /* 3 fotos de corrido en computadoras */
                spaceBetween: 30, /* Un poquito más de aire en pantallas grandes */
            }
        }
    });

    // 3. INICIALIZACIÓN DEL QR DINÁMICO
    const qrElement = document.getElementById("qrcode");
    if (qrElement) {
        new QRCode(qrElement, {
            text: "https://mi-nube.com/imagen123.jpg",
            width: 160,  /* Un tamaño de 160x160 es ideal y súper escaneable */
            height: 160,
            colorDark : "#242424",  /* Gris oscuro corporativo */
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }
});

// 4. FUNCIÓN DE FILTRADO INTELIGENTE ADAPTADA A SWIPER
function filterGallery(category) {
    // Manejar clase activa en los botones de filtro
    const buttons = document.querySelectorAll('.btn-filter');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Validamos que exista el evento para evitar errores de ejecución
    if (window.event && window.event.target) {
        window.event.target.classList.add('active');
    }

    const wrapper = document.getElementById('swiper-wrapper-gallery');
    if (!wrapper) return;

    // Vaciamos el contenedor de los slides actuales
    wrapper.innerHTML = '';

    // Filtramos las fotos reales basándonos en el "data-category" que pusimos en el HTML
    const filteredSlides = allSlides.filter(slide => {
        if (category === 'todas') return true;
        return slide.getAttribute('data-category') === category;
    });

    // Inyectamos sólo los slides que pasaron el filtro
    filteredSlides.forEach(slide => wrapper.appendChild(slide));

    // Destruimos la instancia actual de Swiper y la recreamos al toque 
    // para que recalcule los puntitos de paginación y anchos reales sin bugs
    if (gallerySwiper) {
        gallerySwiper.destroy(true, true);
    }

    gallerySwiper = new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        grabCursor: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });
}

var marcasSwiper = new Swiper(".marcasSwiper", {
    slidesPerView: 2,      // Muestra 2 marcas en móviles
    spaceBetween: 20,
    loop: true,            // Carrusel infinito
    autoplay: {
        delay: 2500,       // Tiempo entre cambios
        disableOnInteraction: false,
    },
    breakpoints: {
        768: { slidesPerView: 4 }, // 4 marcas en tablets
        1024: { slidesPerView: 6 } // 6 marcas en pantallas grandes
    }
});

var aliadosSwiper = new Swiper(".aliadosSwiper", {
    slidesPerView: 2,      // Muestra 2 logos en móvil
    spaceBetween: 20,
    loop: true,            // Carrusel infinito
    autoplay: {
        delay: 2000,       // Velocidad de movimiento
        disableOnInteraction: false,
    },
    breakpoints: {
        768: { slidesPerView: 4 }, // 4 logos en tablets
        1024: { slidesPerView: 5 } // 5 logos en escritorio
    }
});