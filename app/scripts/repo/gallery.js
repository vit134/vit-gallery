/* eslint no-console: 0 */
/* eslint eqeqeq: 0 */



(function($){

    $.fn.vitGallery = function( options) {

        var settings = $.extend({
            debag: false,
            buttons: true,
            imgBlockClass: 'gallery__img-block',
            controls: true,
            controlsClass: 'gallery__controls',
            imgPadding: 15

        }, options);

        var $this = $(this)
          , $imgBlock = $this.find('.'+ settings.imgBlockClass)
          , $controlsBlock
          ;

        var _galleryInnerClass = 'gallery__inner'

        if (settings.debag) {
            console.log('gallery container', $this);
        }

        function addClasses () {

            $imgBlock.each(function(){
                $(this).find('span').addClass('gallery__img-block__description');
                $(this).find('img').addClass('gallery__img-block__img')
            })
        }

        function addWrapper() {
            $imgBlock.wrapAll('<div class="' + _galleryInnerClass + '"></div>');
        }

        function getFullWidth() {
            var imgBlockWidth = 0;

            if (settings.imgPadding && settings.imgPadding != 0) {
                imgBlockWidth = ($imgBlock.length - 1) * settings.imgPadding;
            }

            $imgBlock.each(function(){
                imgBlockWidth = imgBlockWidth + $(this).outerWidth();
            })

            return imgBlockWidth;
        }

        function setInnerWidth() {
            var inner = $('.' + _galleryInnerClass);

            inner.css('width', getFullWidth());
        }

        function setImgBlockWidth() {
            if ($this.width() > $imgBlock.width()) {
                $imgBlock.css('width', $this.width());
                //console.log('container width', $this.width());
                //console.log('img- widthblock', $imgBlock.width());
            }
        }

        function setGalleryHeight() {
            var heightArr = [];
            $imgBlock.each(function(){
                var imhHeight = $(this).find('.gallery__img-block__img').height();
                heightArr.push(imhHeight);
            })

            $this.css('height', Math.max.apply(null, heightArr));
        }

        function createControls() {
            if (settings.controls) {
                $controlsBlock = $this.find('.' + settings.controlsClass);

                var controlsInner = '<ul></ul>'
                  , prev = '<span class="prev"></span>'
                  , next = '<span class="next"></span>'
                  , item = '<li class="gallery__controls__item"></li>'
                  ;


                for (var i=0; $imgBlock.length > i; i++) {
                    var newItem = $controlsBlock.append(item);

                }

                $('.gallery__controls__item').each(function(index){
                    $(this).addClass('item_' + index)
                })

                $controlsBlock.append(newItem);
                var galleryUl = $(newItem).find('li').wrapAll('<ul class="gallery__controls__ul"></ul>');

                $(galleryUl).parent().before(prev).after(next);

            }


        }

        /*function hideImg() {
            $imgBlock.each(function(index){
                if (index != 0) {
                    $(this).hide();
                }
            })
        }*/

        function showImg() {
            $imgBlock.each(function(index){
                if (index != 0) {
                    $(this).css('display', 'inline-block');
                }
            })
        }


        function init() {
            addClasses();
            addWrapper();
            setGalleryHeight();
            setImgBlockWidth();
            setInnerWidth();
            showImg();
            createControls();
        }

        init();

    }
})(jQuery)
