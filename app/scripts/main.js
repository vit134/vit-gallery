$(document).ready(function(){
    var $gallery = $('.gallery');
    var $gallery1 = $('.gallery1');
    var $gallery2 = $('.gallery2');


    $gallery.vitGallery({
        debag: true,
        thumbnailMargin: 5,
        fullscreen: true
    })

    $gallery1.vitGallery({
        controls: 'points',
        transition: 'crossfade',
        autoplay: false,
        fullscreen: true
    })

    $gallery2.vitGallery({
        controls: 'points',
        transition: 'slide-blur',
        autoplay: false,
        fullscreen: true,
        thumnailAnimationSpeed: 500,
        animateSpeed: 500,
    })
})