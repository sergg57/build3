
/* ---------- BLUR for form om page_works------------------------------- */

$(document).ready(function(){
  blur();
})
$(window).resize(function(){
  blur();
});

function blur() {
  var imgWidth = $('.feedback').width(),
      blurSection = $('.feedback'),
      blur = $('.feedback-form__blur'),
      posY = blurSection.offset().top - blur.offset().top, //   текущее положение элемента относительно документа.
      posY = posY - blur.height()/2,
      //blurHeight = blur.height()/2,
      posX = blurSection.offset().left - blur.offset().left;

      /*
      console.log('imgWidth=', imgWidth);
      console.log('blurSection=', blurSection);
      console.log('blur=', blur);
      console.log('posY=', posY);
      console.log('posX=', posX);
      console.log('blur.offset().bottom=', blur.height());
      console.log('blurHeight=', blurHeight);


      console.log('blurSection.offset().top =',blurSection.offset().top ,'-',' blur-posY=', blur.offset().top);
      console.log('blurSection.offset().left=',blurSection.offset().left, '-','blur-posX=', blur.offset().left);
      */

  blur.css({
      'background-size': imgWidth + 'px' + ' ' + 'auto',
      'background-position': (posX) + 'px' + ' ' + (posY-50)  +'px'

  });
  /*
    console.log('blur.css', blur.css('background-size'));
    console.log('blur.css', blur.css('background-position'));
    console.log('blurCSS=', blur);
 */
}


/*-------------- slider for page-works ------------------------------*/

var slider= (function () {
    var counter = 1,
        duration =300,
        inProcess = false;

    //console.log('counter-1=',counter);

    var moveSlider = function (container, direction) {
        var items = $('.slider-item', container),
          activeItem = items.filter('.active'),
          direction = direction == 'down' ? 100 : -100;

        if (counter >= items.length || counter <= -items.length) counter = 0;

        var reqItem = items.eq(counter);


        activeItem.animate({
            'top': direction + '%'
        }, duration);

        reqItem.animate( {
            'top': '0'
        }, duration, function () {
            activeItem.removeClass('active')
                .css('top',  + direction + '%');
            $(this).addClass('active');

            inProcess = false;

            /*console.log('counter-2', counter);
            console.log('direction', direction);
            console.log('activeItem-3=',activeItem);
            console.log('reqItem-3=',reqItem);
            */
        });
    }

        return {
            upInit: function () {
                $('.slider__btns-right').on('click', function (e) {
                    e.preventDefault();

                    if (!inProcess) {
                        inProcess = true;

                            moveSlider($('.myworks__left'), 'up');
                            moveSlider($('.display__block'), 'down');
                            moveSlider($('.slider__button-left'), 'up');
                            moveSlider($('.slider__button-right'), 'down');

                            counter++;
                            //console.log('counter-3=',counter);
                    }
                });
            },
            downInit: function () {
                $('.slider__btns-left').on('click', function (e) {
                    e.preventDefault();
                    if (!inProcess) {
                        inProcess = true;
                        moveSlider($('.slider__button-right'), 'down');
                        moveSlider($('.slider__button-left'), 'up');
                        moveSlider($('.display__block'), 'down');
                        moveSlider($('.myworks__left'), 'down');

                        counter--;
                        //console.log('counter-4=',counter);
                    }
                });
            }

        };

})();

$(function () {

    //console.log('Привет-я запустилась из function=');
    slider.upInit();
    slider.downInit();

});
/* -------------- END slider ------------------------------------ */


/* Модуль для прелоадера - preloader  */


var preloader= (function () {
    var percentsTotal =0,
        preloader = $('.preloader');

        var imgPath =$('*').map(function (ndx, element) {
            var background =$(element).css('background-image'), // путь к картинке в background-image
                img = $(element).is('img'),
                path = '';
            if (background != 'none') {
                path = background.replace('url("','').replace('")','');
            }
            if (img) {
                path = $(element).attr('src');
            }
            if (path) return path;

        });
        //console.log('path=', imgPath);
        var setPercents = function (total, current) {
            var percents = Math.ceil(current/total *100);
            $('.preloader__percents').text(percents + '%');
            if (percents >=100) {
                preloader.fadeOut();
            }
        };
        var loadImages = function (images) {
            if (!images.length) preloader.fadeOut();
            images.forEach(function (img, i, images) {
                var fakeImage = $('<img>',{
                    attr: {
                        src: img
                    }

                })
                fakeImage.on('load error', function () {
                    percentsTotal++;
                    setPercents(images.length, percentsTotal);
                });
            });
        };
        return {
            init: function () {
                //console.log('path=', imgPath);
                var imags = imgPath.toArray();
                loadImages(imags);
            }
        };

}());

$(function () {
    preloader.init();
    //console.log('Привет-я запустилась из preloader=');
    //slider.init();

});
/* ---------------------- END preloader ---------------------------- */

/* Модуль для hamburger  */

$(document).ready(function(){
  $('#hamburger').click(function(){
      if ($(this).hasClass('active')) {
          $(this).toggleClass('active', false);
          $('.full-screen-menu').css('display','none');
      } else {
          $(this).toggleClass('active', true);
          $('.full-screen-menu').css('display','block');
      }
  });
});
/* ---------------------- END humburger ---------------------------- */


/* Модуль для параллакса по скроллу на странице about для секции - hero  */
var paralax = (function () {
    var bg = document.querySelector('.hero__bg'); // для картинки в заголовке
    var user=document.querySelector('.user.hero__user-block'); // для блока - пользователя - user-block
    var sectionText =document.querySelector('.section-title'); // для Portfolio

    return {
        move: function (block, windowScroll, strafeAmount) {
            var strafe = windowScroll/ -strafeAmount + '%';

            var transformString = 'translate3d(0,'+strafe+',0)';

            var style = block.style;

            style.transform = transformString;
            style.webkitTransform = transformString;

        },
        init: function (wScroll) {
            this.move(bg, wScroll, 45);
            this.move(sectionText,wScroll,30);
            this.move(user,wScroll, 3);
        }
    };
}());

window.onscroll = function () {
    var wScroll = window.pageYOffset;

    paralax.init(wScroll);

    //console.log('Это я - Привет! Моё положение на странице=', wScroll);
    //console.log('Привет-я запустилась из paralax_scroll=');
    //slider.init();
};
/* ---------------------- END parallax ---------------------------- */

/* Модуль для параллакса по движению мышки на странице welcom и авторизации  */

var parallaxmouse = (function () {
    var parallaxContainer = document.getElementById('parallax'),
    layers = parallaxContainer.children;

    return {
        moveLayers: function (e) {

            var initialX = (window.innerWidth/2) - e.pageX,
                initialY = (window.innerHeight/2) - e.pageY;


            [].slice.call(layers).forEach(function (layer, i) {
                var
                    divider = i/100,
                    positionX = initialX * 2*divider,
                    positionX = initialY * 2*divider,
                    bottomPosition = (window.innerHeight/2) * divider,
                    layerStyle =layer.style;
                    transformString = 'translate3d(' + positionX+'px,' + positionX+'px,0)';
                    layerStyle.transform = transformString;
                    layerStyle.bottom = '-' + bottomPosition + 'px';

            }); // end forEach

        } // end movelayers
    }; //end return
})(); //end parallaxmouse

window.addEventListener('mousemove', parallaxmouse.moveLayers);

/* ---------------------- END parallaxmouse ---------------------------- */




/*-------------- slider for page-works ------------------------------*/

/*
var slider= (function () {
    var counter = 1,
        duration =300;
    console.log('counter=',counter);
    var moveSlider = function (container, direction) {
        //var items = container.find('.button__item')
        var items =$('.button__item', container),
            activeItem =items.filter('.active');
            console.log('activeItem=',activeItem);
        var regItem =items.eq(counter); //метод eq перебирает попорядку массив

        activeItem.animated( {
            'top': '100%'
        });

    }

        return {
            init: function (param) {
                $('.slider__btns-right').on('click', function (e) {
                    e.preventDefault();
                    console.log('e.preventDefault()=',e.preventDefault());
                    moveSlider($('.button__item'));
                });
            }
        };
    
}());


$(function () {

    console.log('Привет-я запустилась из function=');
    slider.init();

});


$('.slider__btns-left').on('click',function (e) {
    console.log("Привет-!!!!");
})

п
$(document).ready(function () {
    console.log('Привет-я запустилась из works=');
    //alert('Привет-я запустилась из works-wraper=');

    slider.init();
});


//preloader = $('.preloader');
if($('.myworks')){
    console.log('Привет-я запустилась из works-wraper=');
    slider.init();
}

window.onload = function () {
    console.log('Привет-я запустилась из works-window.onload=');
    slider.init();
}

$(function () {

    console.log('Привет-я запустилась из works1 по =');
    slider.init();

});

*/



