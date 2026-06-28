function filterGallery(category, event) {
    // 1. Manejo de botones activos
    document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // 2. Destruir swiper de forma segura
    if (swiperGallery) {
        swiperGallery.destroy(true, true);
    }

    // 3. Filtrar los elementos
    const wrapper = document.getElementById('swiper-wrapper-gallery');
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach(item => {
        if (category === 'todas' || item.getAttribute('data-category') === category) {
            item.style.display = ''; // Restaura display original
            item.classList.add('swiper-slide');
        } else {
            item.style.display = 'none';
            item.classList.remove('swiper-slide');
        }
    });

    // 4. Forzar una pequeña pausa antes de reinicializar para que el DOM se actualice
    setTimeout(() => {
        initSwiper();
    }, 50);
}