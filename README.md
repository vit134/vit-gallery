# vit-gallery

## Описание

vit-Gallery - это jQuery плагин позволяющий без особых усилий добавить на Ваш сайт адаптивную галерею-слайдер.
Благодаря множеству параметров, вы легко сможете настроить галерею, так как это нужно вам.

## Демо

<http://vit-gallery.andryushkov.ru/>

## Быстрый старт

`Добавьте в `<head>` вашего сайта :`
```<script type="text/javascript" src="app/scripts/vendor/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="app/scripts/repo/gallery.js"></script>
<link rel="stylesheet" type="text/css" href="dist/styles/__main.css">```

`и в `<body>`

```<script>
$(document).ready(function(){
    var $gallery = $('.gallery');
    $gallery.vitGallery()
})
</script>```

Разметка

```<div class="gallery">
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
</div>```
