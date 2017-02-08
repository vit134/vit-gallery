/* eslint no-console: 0 */
/* eslint eqeqeq: 0 */


/* v2.6/w thumbnail*/


(function($){

    $.fn.vitGallery = function( options) {


        //Default settings
        var settings = $.extend({
            debag: false,
            buttons: true,
            galleryHeight: 'auto',
            imgBlockClass: 'gallery__img-block',
            controls: 'thumbnails',
            controlsClass: 'gallery__controls',
            thumnailWidth: 100,
            thumnaiHeight: 50,
            thumbnailMargin: 15,
            animateSpeed: 1000,
            imgPadding: 15,
            autoplay: false,
            autoplayDelay: 3000,

        }, options);


        //Default variables
        var $this = $(this) // .gallery
          , $galleryBlock // .gallery__block
          , $imgBlock = $this.find('.'+ settings.imgBlockClass) // .gallery__img-block
          , $controlsBlock = $this.find('.'+ settings.controlsClass) // .gallery__controls
          , $prevButton // .gallery .prev
          , $nextButton // .gallery .next
          , $controlsItem // .gallery__controls__item
          , $galleryInner // .gallery__inner
          , $descriptionBlock // .gallery__description-block
          , galleryInnerPosition // css left of gallery inner
          , $currentBlock // .gallery__img-block.current
          , currentBlockIndex // index of current block
          , $galleryControlsUl
          , $centerThumbnail
          , $currentControlItem
          , $galleryControlsInner
          , controlsInnerPosition
          ;


        //Classess
        var _galleryInnerClass = 'gallery__inner'
          , _galleryDescriptionClass = 'gallery__description-block'
          , _thumbnailImgClass = 'gallery__thumbnail'
          , _controlsClass = 'gallery__controls'
          ;

        //Timer
        var sliderTimer;

        function updatevariables(functionName) {
            //console.log(functionName);
            $controlsBlock = $this.find('.' + settings.controlsClass);
            $galleryBlock = $this.find('.gallery__block');
            $prevButton = $('.prev');
            $nextButton = $('.next');
            $controlsItem = ( $('.gallery__thumbnail').length ) ? $('.gallery__thumbnail') : $('.gallery__controls__item');
            $galleryInner = $('.gallery__inner');
            $currentBlock = $galleryInner.find('.gallery__img-block.current');
            $descriptionBlock = $imgBlock.find('.gallery__img-block__description');
            currentBlockIndex = $currentBlock.index();
        }

        function updateSlideVariables() {
            $currentBlock = $galleryInner.find('.gallery__img-block.current');
            currentBlockIndex = $currentBlock.index();
            $descriptionBlock = $imgBlock.find('.gallery__img-block__description');
            $currentControlItem = $('.' + _controlsClass).find('.current');

            if (settings.controls == 'thumbnails') {
                controlsInnerPosition = parseInt($galleryControlsInner.css('left'));
            }

            //console.log(currentBlockIndex);
            //console.log(galleryInnerPosition)
        }

        function addClasses () {
            $imgBlock.each(function(){
                $(this).find('span').addClass('gallery__img-block__description');
                $(this).find('img').addClass('gallery__img-block__img')
            })
            updatevariables('addClasses');
        }

        function addWrapper() {
            $imgBlock.wrapAll('<div class="gallery__block"><div class="' + _galleryInnerClass + '"></div></div>');
            updatevariables('addWrapper');
        }

        function getFullWidth() {
            var imgBlockWidth = 0;
            if (settings.imgPadding && settings.imgPadding != 0) {
                imgBlockWidth = ($imgBlock.length - 1) * settings.imgPadding;
            }
            $imgBlock.each(function(){
                imgBlockWidth = imgBlockWidth + $(this).outerWidth();
            })

            updatevariables('getFullWidth');
            return imgBlockWidth;
        }

        function setInnerWidth() {
            var inner = $('.' + _galleryInnerClass);
            inner.css('width', getFullWidth());

            updatevariables('setInnerWidth');
        }

        function setImgBlockWidth() {
            $imgBlock.css('width', $this.width());

            updatevariables('setImgBlockWidth');
        }

        function setGalleryHeight() {

            $imgBlock.each(function(){
                var img = $(this).find('.gallery__img-block__img');
                $(this).addClass('load');


                img.bindImageLoad(function () { //Plugin for load image (look at the end of page)

                    var img = $(this);
                    setTimeout(function () {
                        img.parent().removeClass('load');
                        // обнуляем переменную, чтобы GC сделал свою работу
                        img = null;
                    }, 100);

                });
            })

            updatevariables('setGalleryHeight');
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

            //getCurrentSlide();
            updatevariables('createControls');
        }

        function createThumbnails() {
            var prev = '<span class="prev"></span>'
              , next = '<span class="next"></span>'
              , controlInner = '<div class="gallery__controls__inner"></div>'
              , controlsThumbnailul = '<div class="gallery__controls__thumbnails-ul"></div>'
              , newItem
              ;

            if (settings.controls) {
                $controlsBlock = $this.find('.' + settings.controlsClass);

                var $galleryUl = $controlsBlock.append(controlsThumbnailul);
                $galleryUl.find('.gallery__controls__thumbnails-ul').append(controlInner);
                $galleryControlsUl = $galleryUl.find('.gallery__controls__thumbnails-ul');
                $galleryControlsInner =  $galleryUl.find('.gallery__controls__inner')


                $imgBlock.each(function() {
                    var $thumnailImg = $(this).find('img');
                    var thumnailImgUrl = $thumnailImg.attr('thumb-url');

                    newItem = document.createElement('img');
                    newItem.src = thumnailImgUrl;

                    $(newItem).width(settings.thumnailWidth)
                              .height(settings.thumnaiHeight)
                              .addClass(_thumbnailImgClass)
                              .css('margin-right', settings.thumbnailMargin)
                              .attr('data-index', $(this).index());

                    $galleryControlsInner.css({
                        width: $galleryControlsInner.width() +  $(newItem).outerWidth(),
                        left: 0
                    });
                    $galleryControlsInner.append($(newItem));
                })

                $galleryControlsUl.before(prev).after(next);
                updatevariables('createThumbnails');
                getCurrentSlide();

            }
        }

        function getCenterThumbnail() {
            var containerWidth = $galleryControlsUl.outerWidth();

            var $thumnail = $('.gallery__thumbnail')
            var thumnailWidth = $thumnail.outerWidth();

            var countThumbInCont = Math.round( containerWidth / thumnailWidth ) / 2;

            $centerThumbnail = $thumnail.eq(countThumbInCont - 1);

            $centerThumbnail.addClass('center');

        }

        function createDescription() {
            $galleryBlock.after('<div class="' + _galleryDescriptionClass + '"></div>');

            //console.log(currentBlockIndex);
            $descriptionBlock.each(function() {
                $('.' + _galleryDescriptionClass).append($(this));
            })

            $descriptionBlock.eq(currentBlockIndex).addClass('current');

            updatevariables('createDescription');
        }

        function changeDescription(currentIndex, index) {
            $descriptionBlock = $('.' + _galleryDescriptionClass).find('.gallery__img-block__description');
            $descriptionBlock.eq(currentIndex).removeClass('current');
            $descriptionBlock.eq(index).addClass('current');
        }

        function showImg() {
            $imgBlock.each(function(index){
                if (index != 0) {
                    $(this).css('display', 'inline-block');
                }
            })
            updatevariables('showImg');
        }

        function nextSlide(callback) {
            if (!$currentBlock.is(':last-child')) {

                $galleryInner.animate({
                    left: galleryInnerPosition - $imgBlock.width()
                }, settings.animateSpeed);

                galleryInnerPosition = galleryInnerPosition - $imgBlock.width();

                $currentBlock.removeClass('current');
                $currentBlock.next().addClass('current');



                $controlsItem.eq(currentBlockIndex).removeClass('current');

                currentBlockIndex++;

                $controlsItem.eq(currentBlockIndex).addClass('current');


                if (settings.autoplay ) {
                    clearInterval(sliderTimer);
                    autoplay();
                }

                changeDescription(currentBlockIndex - 1, currentBlockIndex);

                if (callback) {
                    callback();
                }

                updateSlideVariables();
                getCurrentSlide();


                if (settings.controls == 'thumbnails'){
                    if ($currentControlItem.index() >= $centerThumbnail.index() && $currentControlItem.index() <= $controlsItem.length - $centerThumbnail.index()) {
                        console.log('in center');
                        scrollControls('back');
                    }
                }
            }

            return currentBlockIndex;
        }

        function scrollControls(direction) {
            console.log($galleryControlsInner);
            var controlsInnerPosition = parseInt($galleryControlsInner.css('left'));

            if (direction == 'back') {
                $galleryControlsInner.animate({
                    left: controlsInnerPosition - $controlsItem.outerWidth()
                }, settings.animateSpeed)
            } else if (direction == 'forward') {
                $galleryControlsInner.animate({
                    left: controlsInnerPosition + $controlsItem.outerWidth()
                }, settings.animateSpeed)
            }

        }

        function prevSlide(callback) {
            if (!$currentBlock.is(':first-child')) {

                $galleryInner.animate({
                    left: galleryInnerPosition + $imgBlock.width()
                }, settings.animateSpeed);

                galleryInnerPosition = galleryInnerPosition + $imgBlock.width();

                $currentBlock.removeClass('current');
                $currentBlock.prev().addClass('current');

                $controlsItem.eq(currentBlockIndex).removeClass('current');

                currentBlockIndex--;

                $controlsItem.eq(currentBlockIndex).addClass('current');

                if (settings.autoplay ) {
                    clearInterval(sliderTimer);
                    autoplay();
                }

                changeDescription(currentBlockIndex + 1, currentBlockIndex);

                if (callback) {
                    callback();
                }

                updateSlideVariables();
                getCurrentSlide();

                if (settings.controls == 'thumbnails'){
                    if ($currentControlItem.index() >= $centerThumbnail.index() && $currentControlItem.index() <= $controlsItem.length - $centerThumbnail.index()) {
                        scrollControls('forward');
                    }
                }
            }

        }

        function goToSlide(thisIndex) {


            if (currentBlockIndex < thisIndex) {
                $galleryInner.animate({
                    left: galleryInnerPosition - ( $imgBlock.width() * ( thisIndex -  currentBlockIndex))
                }, settings.animateSpeed);

                galleryInnerPosition = galleryInnerPosition - ( $imgBlock.width() * ( thisIndex -  currentBlockIndex))

            } else {
                $galleryInner.animate({
                    left: - ( $imgBlock.width() * ( thisIndex +  currentBlockIndex) +  galleryInnerPosition)
                }, settings.animateSpeed);

                galleryInnerPosition = - ( $imgBlock.width() * ( thisIndex +  currentBlockIndex) +  galleryInnerPosition)
            }

            changeDescription($galleryInner.find('.current').index(), thisIndex);

            $galleryInner.find('.current').removeClass('current');
            $imgBlock.eq(thisIndex).addClass('current');

            $controlsBlock.find('.current').removeClass('current');
            $controlsItem.eq(thisIndex).addClass('current');


            getCurrentSlide();
            updateSlideVariables();

            if (settings.autoplay ) {
                clearInterval(sliderTimer);
                autoplay();
            }
        }

        function autoplay() {
            var countSlides = $imgBlock.length;

            sliderTimer = setInterval(function() {

                if ( (currentBlockIndex + 1) / countSlides  == 1  ) {
                    console.log('the end')
                    clearInterval(sliderTimer);

                    setTimeout(function() {
                        goToSlide(0)
                    }, settings.autoplayDelay / 2);
                }

                nextSlide();

            }, settings.autoplayDelay);

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
                goToSlide($(this).index());

            })

            $(window).on('resize', function() {

                if (settings.autoplay ) {
                    clearInterval(sliderTimer);
                }

                setGalleryHeight();
                setImgBlockWidth();
                setInnerWidth();
                updateSlideVariables();

                $galleryInner.css('left', - (currentBlockIndex * $currentBlock.width()));
                galleryInnerPosition = - (currentBlockIndex * $currentBlock.width())
                autoplay();
            })
        }

        function getCurrentSlide() {
            var index = 0;
            //console.log($controlsItem);
            if ($galleryInner.find('.current').length > 0) {
                index = $galleryInner.find('.current').index();
                $controlsItem.eq(index).addClass('current');
                $galleryInner.css('left', - (index * $imgBlock.width()));
            } else {
                $imgBlock.first().addClass('current');
                $controlsItem.first().addClass('current');
            }

            updatevariables('getCurrentSlide');
            updateSlideVariables();

            return index;
        }

        function init() {
            addClasses();
            addWrapper();
            showImg();
            setGalleryHeight();
            setImgBlockWidth();
            setInnerWidth();


            if (settings.controls == 'points'){
                createControls();
            } else if (settings.controls == 'thumbnails') {
                createThumbnails();
                getCenterThumbnail()
            }


            getCurrentSlide();

            createDescription();

            setImgBlockWidth();


            bindEvents();

            if (settings.autoplay ) {
                autoplay();
            }


        }

        init();

    }
})(jQuery)

;(function ($) {
    $.fn.bindImageLoad = function (callback) {
        function isImageLoaded(img) {
            if (!img.complete) {
                return false;
            }
            if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
                return false;
            }
            return true;
        }

        return this.each(function () {
            var ele = $(this);
            if (ele.is("img") && $.isFunction(callback)) {
                ele.one("load", callback);
                if (isImageLoaded(this)) {
                    ele.trigger("load");
                }
            }
        });
    };
})(jQuery);