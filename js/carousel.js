let overlay = document.querySelector('.overlay');
let carousel = document.querySelector('.carousel');
let slides = document.querySelectorAll('.carousel .slide');
let images = document.querySelectorAll('.carousel .slide img'); 
let rightArrow = document.querySelector('.right-arrow');
let leftArrow = document.querySelector('.left-arrow');
var counter = 0;

function loadSlides() {

/*Carga las imágenes y las ordena según su posición en el array*/

    carousel.style.height = '90vh'; // Establece tamaño default del visor del carrousel
    let heightCarousel = carousel.offsetHeight;

    for (i=0; i < images.length; i++) {
        // Bucle For para que el visor se ajuste al tamaño de la foto, en caso de que sea menor a 90vh
        if(images[i].offsetHeight < heightCarousel) {
            heightCarousel = images[i].offsetHeight;
        }
    }

    carousel.style.height = heightCarousel + 'px';
    // Establece el tamaño del visor al tamaño de la imagen con menor height.

    for (i=0; i < slides.length; i++) {
        slides[i].style.left = carousel.offsetWidth * i + 'px';
    } // Bucle que recorre el array y le asigna un valor de posición "left" según el index,
    // eso da como resultado que cada imágen su ubique una al lado de la otra, según su index.
}

function openModal() {
    overlay.style.display = 'block';
    carousel.style.display = 'block'; //Cambia el valor de display de "none" a "block" para mostrar el modal.
    loadSlides(); //función para cargar y posicionar las fotos en el carrousel. 
}

function closeModal() {
    overlay.style.display = 'none'; 
    carousel.style.display = 'none'; //Cambia el valor de display de "block" a "none" para ocultar el modal.
    updateArrowState(-counter); //Resetear el contador de arrowstate para que cuando se abra de nuevo el modal,
                                //no se rompa la funcionalidad de las flechas.
                        
}

function nextSlide() {
    updateArrowState(1);
    for (i=0; i < slides.length; i++) {
        slides[i].style.left = slides[i].offsetLeft - carousel.offsetWidth + 'px';
    } // Al valor de offsetLeft, se le resta el valor de width del carousel, para que las imagenes se muevan a la izquierda.
}

function prevSlide() {
    updateArrowState(-1);
    for (i=0; i < slides.length; i++) {
        slides[i].style.left = slides[i].offsetLeft + carousel.offsetWidth + 'px';
    } // Al valor de offsetLeft, se le resta el valor de width del carousel, para que las imagenes se muevan a la derecha.

}

function updateArrowState(e) {
    //Actualiza el display de las flechas en caso de que sea la última foto o no.
    counter += e;
    if(counter !== 0) {
        leftArrow.style.display = 'flex'
    } else {
        leftArrow.style.display = 'none'
    };
    if(counter === slides.length - 1) {
        rightArrow.style.display = 'none'
    } else {
        rightArrow.style.display = 'flex'
    };

    //Cada vez que se hace click en la flecha, se oculta el puntero y
    //se esperan 300ms para evitar el spammeo de click y
    //que se calcula mal el offsetWidth.
    rightArrow.style.pointerEvents = 'none';
    leftArrow.style.pointerEvents = 'none';
    setTimeout(() => {
        rightArrow.style.pointerEvents = 'auto';
        leftArrow.style.pointerEvents = 'auto';
    }, 300);
}