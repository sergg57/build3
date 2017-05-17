
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
    } //end return
})(); //end parallaxmouse

window.addEventListener('mousemove', parallaxmouse.moveLayers);

/* ---------------------- END parallaxmouse ---------------------------- */

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
            if (path) return path

        });

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
                })
            })
        };
        return {
            init: function () {
                //console.log('path=', imgPath);
                var imags = imgPath.toArray();
                loadImages(imags);
            }
        }

}());

$(function () {
    preloader.init();
});
/* ---------------------- END preloader ---------------------------- */






/////////////////////////////////////////////////////////////////////////////////////

$('.hamburger').on('click', function(e) {
  e.preventDefault();
  console.log(" класс-2-0=", this);
  if ($(this).hasClass('active')) {
      console.log(" класс-2-1=", this);
    $(this).removeClass('active');
    $('.full-screen-menu').css('display','none');
  } else {
      console.log(" класс-2-2=", this);
    $(this).addClass('active');
    $('.full-screen-menu').css('display','flex');
  }
  console.log(" класс-2-3=");
});

/////////////////////////////////////////////////////////////////////////////////////



/* ---------------------- END humburger ---------------------------- */