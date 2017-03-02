
# vit-gallery

vit-Gallery - jQuery plugin allowing without troubles add to your web site responsive gallery-slider. Many settings help to customize gallery according to your needs and requirments.

## Demo

<http://vit-gallery.andryushkov.ru/>

## Getting started

#### 1. Load the required files 
```
<script type="text/javascript" src="js/jquery-3.1.1.min.js"></script> 

<script type="text/javascript" src="js/vit-gallery.js"></script>

<link rel="stylesheet" type="text/css" href="styles/vit-gallery.css">
```
#### 2. Create the HTML markup
```
<div class="gallery">
    <div class="gallery__img-block ">
        <span class="">Picture #1 description</span>
        <img src="http://elitefon.ru/images/201503/elitefon.ru_38824.jpg" >
    </div>
    <div class="gallery__img-block">
        <span class="">Picture #2 description</span>
        <img src="http://placekitten.com/800/600">
    </div>
    <div class="gallery__img-block ">
        <span>Picture #3 description</span>
        <img src="http://placekitten.com/360/200">
    </div>
    . . .
</div>
```
#### 3. Init gallery 
```
<script>  
    $(document).ready(function(){
        var $gallery = $('.gallery');
        $gallery.vitGallery()
    })  
</script>
```

## Settings
*Name*  | *Type* | *Default value* | *Description*
--------|--------|-----------------|---------------------
galleryHeight | string | auto | if auto set gallery block height equally max image height
imgBlockClass | string | gallery__img-block | css Class for image block container
controls | string | points | can be 'points', 'thumbnails'
thumnailWidth | number | 90 | width of thumnails
thumnaiHeight | number | 60 | height of thumnails
thumbnailMargin | number | 5 | margin-right of thumnails
thumbnailAnimation | bool | true | thumbnails animation on change slide
thumnailAnimationSpeed | number | 1000 | speed of thumbnails animation, if setting "thumbnailAnimation" is "true" 
transition | string | slide | can be 'slide', 'crossfade'
animateSpeed | number | 1000 | speed of slide chenge, if settings "transition" is "slide" 
description | bool | true | if "true" show the description for slides
autoplay | bool | false | if "true" autoplay slider
autoplayDelay | number | 3000 | delay from change slide, if setting "autoplay" is "true"
fullscreen | bool | false | if "true" activate fullscreen mode
