// DECLARAMOS LA VARIABLE GLOBAL DE SWIPER Y EL ARRAY PARA LAS FOTOS
let gallerySwiper;
let allSlides = [];

document.addEventListener('DOMContentLoaded', () => {

    // 1. CAPTURAMOS LOS SLIDES ORIGINALES APENAS SE CARGA LA WEB
    allSlides = Array.from(document.querySelectorAll('#swiper-wrapper-gallery .gallery-item'));

    // 2. INICIALIZACIÓN PREMIUM DE SWIPER
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

    // 3. INICIALIZACIÓN DEL QR DINÁMICO
    const qrElement = document.getElementById("qrcode");
    if (qrElement) {
        new QRCode(qrElement, {
            text: "https://mi-nube.com/imagen123.jpg",
            width: 160,  
            height: 160,
            colorDark : "#242424",  
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }
});

// 4. FUNCIÓN DE FILTRADO INTELIGENTE ADAPTADA A SWIPER
function filterGallery(category) {
    const buttons = document.querySelectorAll('.btn-filter');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (window.event && window.event.target) {
        window.event.target.classList.add('active');
    }

    const wrapper = document.getElementById('swiper-wrapper-gallery');
    if (!wrapper) return;

    wrapper.innerHTML = '';

    const filteredSlides = allSlides.filter(slide => {
        if (category === 'todas') return true;
        return slide.getAttribute('data-category') === category;
    });

    // LÍNEA CORREGIDA Y COMPLETADA
    filteredSlides.forEach(slide => wrapper.appendChild(slide));

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

// 5. INICIALIZACIÓN DE LOS OTROS CARRUSELES
var marcasSwiper = new Swiper(".marcasSwiper", {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 6 }
    }
});

var aliadosSwiper = new Swiper(".aliadosSwiper", {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    breakpoints: {
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 }
    }
});

document.getElementById('btn-enviar').addEventListener('click', function(e) {
    // 1. Capturamos los valores
    const nombre = document.getElementById('nombre').value;
    const tel = document.getElementById('whatsapp').value;
    const tipo = document.getElementById('tipo').value;
    const detalles = document.getElementById('detalles').value;

    // 2. Validación básica
    if (nombre === "" || tel === "") {
        alert("Por favor, completa tu nombre y número de WhatsApp.");
        return;
    }

    // 3. Armamos el mensaje
    const mensaje = `Hola, mi nombre es ${nombre}. Estoy interesado en: ${tipo}. Detalles: ${detalles}`;
    
    // 4. Formateamos el link
    const url = `https://wa.me/5491139352271?text=${encodeURIComponent(mensaje)}`;

    // 5. Abrimos WhatsApp en una pestaña nueva
    window.open(url, '_blank');

    // 6. REDIRECCIÓN A PÁGINA DE AGRADECIMIENTO (Esto activa el Píxel de Meta)
    window.location.href = "leads-calificados.html";
});