$(document).ready(function(){
    var $gallery = $('.gallery');
    var $gallery1 = $('.gallery1');


    $gallery.vitGallery({
        debag: true,
        thumbnailMargin: 5
    })

    $gallery1.vitGallery({
        controls: 'points',
        transition: 'crossfade',
        autoplay: false
    })
})