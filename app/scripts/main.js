$(document).ready(function(){
    var $gallery = $('.gallery');
    var $gallery1 = $('.gallery1');


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
})