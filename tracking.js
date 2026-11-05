/* Evento de Google Tag Manager por cada botón de WhatsApp con data-cta.
   Un solo listener delegado: funciona también con los elementos creados por JS (galería).
   Evento: cta_whatsapp_click  |  Parámetro: cta_id */
document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-cta]");
    if (!el) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: "cta_whatsapp_click",
        cta_id: el.getAttribute("data-cta")
    });
});
 