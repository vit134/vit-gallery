
# vit-gallery

vit-Gallery - это jQuery плагин позволяющий без особых усилий добавить на Ваш сайт адаптивную галерею-слайдер.
Благодаря множеству параметров, вы легко сможете настроить галерею, так как это нужно вам.

## Demo

<http://vit-gallery.andryushkov.ru/>

## Getting started

#### 1. Load the required files 
```
<script type="text/javascript" src="app/scripts/vendor/jquery-3.1.1.min.js"></script> 

<script type="text/javascript" src="app/scripts/repo/gallery.js"></script>

<link rel="stylesheet" type="text/css" href="dist/styles/__main.css">
```
#### 2. Create the HTML markup
```
<div class="gallery">
    <div class="gallery__img-block ">
        <span class="">Описание фото 1</span>
        <img src="http://elitefon.ru/images/201503/elitefon.ru_38824.jpg" >
    </div>
    <div class="gallery__img-block">
        <span class="">Описание фото 2</span>
        <img src="http://placekitten.com/800/600">
    </div>
    <div class="gallery__img-block ">
        <span>Описание фото 3</span>
        <img src="http://placekitten.com/360/200">
    </div>
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
