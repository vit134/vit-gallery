$(document).ready(function(){
    var $gallery = $('.gallery');
    var $gallery1 = $('.gallery1');


    $gallery.vitGallery({
        debag: true
    })

    $gallery1.vitGallery({
        controls: 'points'
    })
})