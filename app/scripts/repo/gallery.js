/* eslint no-console: 0 */
/* eslint eqeqeq: 0 */



(function($){

    $.fn.vitGallery = function( options) {


        //Default settings
        var settings = $.extend({
            debag: false,
            buttons: true,
            imgBlockClass: 'gallery__img-block',
            controls: true,
            controlsClass: 'gallery__controls',
            animateSpeed: 1000,
            imgPadding: 15,
            autoplay: false,
            autoplayDelay: 500,

        }, options);


        //Default variables
        var $this = $(this) // .gallery
          , $imgBlock = $this.find('.'+ settings.imgBlockClass) // .gallery__img-block
          , $controlsBlock = $this.find('.'+ settings.controlsClass) // .gallery__controls
          , $prevButton // .gallery .prev
          , $nextButton // .gallery .next
          , $controlsItem // .gallery__controls__item
          , $galleryInner // .gallery__inner
          , galleryInnerPosition // css left of gallery inner
          , $currentBlock // .gallery__img-block.current
          , currentBlockIndex // index of current block
          ;


        //Classess
        var _galleryInnerClass = 'gallery__inner';

        function updatevariables() {
            $controlsBlock = $this.find('.' + settings.controlsClass);
            $prevButton = $('.prev');
            $nextButton = $('.next');
            $controlsItem = $('.gallery__controls__item');
            $galleryInner = $('.gallery__inner');
            $currentBlock = $galleryInner.find('.gallery__img-block.current');
            currentBlockIndex = $currentBlock.index();
        }

        function updateSlideVariables() {
            $currentBlock = $galleryInner.find('.gallery__img-block.current');
            currentBlockIndex = $currentBlock.index();
            //console.log(galleryInnerPosition)
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
            $imgBlock.css('width', $this.width());
        }

        function setGalleryHeight() {

            var heightArr = [];

            $imgBlock.each(function(){
                var imhHeight = $(this).find('.gallery__img-block__img').height();
                heightArr.push(imhHeight);
            })

            var galleryHeight = $this.css('height', Math.max.apply(null, heightArr));

            $imgBlock.each(function(){
                var img = $(this).find('.gallery__img-block__img');
                var imhHeight = img.height();

                console.log(img)
                console.log(imhHeight)
                var styles = {
                    position: 'absolute',
                    top: '50%',
                    marginTop: -(imhHeight / 2)
                }

                if (imhHeight < galleryHeight) {

                    img.css(styles)
                }
            })


        }

        function createControls() {
            if (settings.controls) {
                $controlsBlock = $this.find('.' + settings.controlsClass);

                var prev = '<span class="prev"></span>'
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

        function showImg() {
            $imgBlock.each(function(index){
                if (index != 0) {
                    $(this).css('display', 'inline-block');
                }
            })
        }

        function nextSlide(callback) {
            //console.log(galleryInnerPosition)
            if (!$currentBlock.is(':last-child')) {
                //console.log(currentBlockIndex);

                $galleryInner.animate({
                    left: galleryInnerPosition - $imgBlock.width()
                }, settings.animateSpeed);

                galleryInnerPosition = galleryInnerPosition - $imgBlock.width();

                $currentBlock.removeClass('current');
                $currentBlock.next().addClass('current');

                $('.gallery__controls__item:eq('+  currentBlockIndex +')').removeClass('current');
                currentBlockIndex++;

                $('.gallery__controls__item:eq('+  currentBlockIndex +')').addClass('current');

                updateSlideVariables();

                if (callback) {
                    callback();
                }
            }

        }

        function prevSlide(callback) {
            //console.log(galleryInnerPosition)
            if (!$currentBlock.is(':first-child')) {

                $galleryInner.animate({
                    left: galleryInnerPosition + $imgBlock.width()
                }, settings.animateSpeed);


                galleryInnerPosition = galleryInnerPosition + $imgBlock.width();

                $currentBlock.removeClass('current');
                $currentBlock.prev().addClass('current');

                $('.gallery__controls__item:eq('+  currentBlockIndex +')').removeClass('current');

                currentBlockIndex--;

                $('.gallery__controls__item:eq('+  currentBlockIndex +')').addClass('current');

                updateSlideVariables();

                if (callback) {
                    callback();
                }
            }

        }

        function goToSlide(clickItem) {
            var thisIndex = clickItem.index();

            if (currentBlockIndex < thisIndex) {
                $galleryInner.animate({
                    left: galleryInnerPosition - ( $imgBlock.width() * ( thisIndex -  currentBlockIndex))
                }, settings.animateSpeed);

                galleryInnerPosition = galleryInnerPosition - ( $imgBlock.width() * ( thisIndex -  currentBlockIndex))

            } else {
                //console.log('(' + $imgBlock.width() + '*' + '(' + thisIndex  + '+' +  currentBlockIndex + ') ) + ' +  galleryInnerPosition )
                $galleryInner.animate({
                    left:  - ( $imgBlock.width() * ( thisIndex +  currentBlockIndex) +  galleryInnerPosition)
                }, settings.animateSpeed);

                galleryInnerPosition = - ( $imgBlock.width() * ( thisIndex +  currentBlockIndex) +  galleryInnerPosition)
            }

            $galleryInner.find('.current').removeClass('current');
            $imgBlock.eq(thisIndex).addClass('current');

            $controlsBlock.find('.current').removeClass('current');
            $controlsItem.eq(thisIndex).addClass('current');

            updateSlideVariables();

        }

        function bindEvents() {
            galleryInnerPosition = parseInt($galleryInner.css('left'));
            currentBlockIndex = $currentBlock.index();


            $prevButton.on('click', function(){

                $currentBlock = $galleryInner.find('.gallery__img-block.current');

                prevSlide();
            })

            $nextButton.on('click', function(){

                $currentBlock = $galleryInner.find('.gallery__img-block.current');
                nextSlide();
            })

            $controlsItem.on('click', function() {

                goToSlide($(this));

            })
        }

        function getCurrentSlide() {
            var index = 0;

            if ($galleryInner.find('.current').length > 0) {
                index = $galleryInner.find('.current').index();
                $controlsItem.eq(index).addClass('current');
                $galleryInner.css('left', - (index * $imgBlock.width()));
            } else {
                $imgBlock.first().addClass('current');
                $controlsItem.first().addClass('current');
            }

            updateSlideVariables();

        }

        function init() {
            addClasses();
            addWrapper();
            setGalleryHeight();
            setImgBlockWidth();
            setInnerWidth();
            showImg();
            createControls();

            updatevariables();

            getCurrentSlide();

            bindEvents();
        }

        init();

    }
})(jQuery)
