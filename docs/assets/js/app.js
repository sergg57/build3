
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




//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyogLS0tLS0tLS0tLSBCTFVSIGZvciBmb3JtIG9tIHBhZ2Vfd29ya3MtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gIGJsdXIoKTtcbn0pXG4kKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XG4gIGJsdXIoKTtcbn0pO1xuXG5mdW5jdGlvbiBibHVyKCkge1xuICB2YXIgaW1nV2lkdGggPSAkKCcuZmVlZGJhY2snKS53aWR0aCgpLFxuICAgICAgYmx1clNlY3Rpb24gPSAkKCcuZmVlZGJhY2snKSxcbiAgICAgIGJsdXIgPSAkKCcuZmVlZGJhY2stZm9ybV9fYmx1cicpLFxuICAgICAgcG9zWSA9IGJsdXJTZWN0aW9uLm9mZnNldCgpLnRvcCAtIGJsdXIub2Zmc2V0KCkudG9wLCAvLyAgINGC0LXQutGD0YnQtdC1INC/0L7Qu9C+0LbQtdC90LjQtSDRjdC70LXQvNC10L3RgtCwINC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QviDQtNC+0LrRg9C80LXQvdGC0LAuXG4gICAgICBwb3NZID0gcG9zWSAtIGJsdXIuaGVpZ2h0KCkvMixcbiAgICAgIC8vYmx1ckhlaWdodCA9IGJsdXIuaGVpZ2h0KCkvMixcbiAgICAgIHBvc1ggPSBibHVyU2VjdGlvbi5vZmZzZXQoKS5sZWZ0IC0gYmx1ci5vZmZzZXQoKS5sZWZ0O1xuXG4gICAgICAvKlxuICAgICAgY29uc29sZS5sb2coJ2ltZ1dpZHRoPScsIGltZ1dpZHRoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdibHVyU2VjdGlvbj0nLCBibHVyU2VjdGlvbik7XG4gICAgICBjb25zb2xlLmxvZygnYmx1cj0nLCBibHVyKTtcbiAgICAgIGNvbnNvbGUubG9nKCdwb3NZPScsIHBvc1kpO1xuICAgICAgY29uc29sZS5sb2coJ3Bvc1g9JywgcG9zWCk7XG4gICAgICBjb25zb2xlLmxvZygnYmx1ci5vZmZzZXQoKS5ib3R0b209JywgYmx1ci5oZWlnaHQoKSk7XG4gICAgICBjb25zb2xlLmxvZygnYmx1ckhlaWdodD0nLCBibHVySGVpZ2h0KTtcblxuXG4gICAgICBjb25zb2xlLmxvZygnYmx1clNlY3Rpb24ub2Zmc2V0KCkudG9wID0nLGJsdXJTZWN0aW9uLm9mZnNldCgpLnRvcCAsJy0nLCcgYmx1ci1wb3NZPScsIGJsdXIub2Zmc2V0KCkudG9wKTtcbiAgICAgIGNvbnNvbGUubG9nKCdibHVyU2VjdGlvbi5vZmZzZXQoKS5sZWZ0PScsYmx1clNlY3Rpb24ub2Zmc2V0KCkubGVmdCwgJy0nLCdibHVyLXBvc1g9JywgYmx1ci5vZmZzZXQoKS5sZWZ0KTtcbiAgICAgICovXG5cbiAgYmx1ci5jc3Moe1xuICAgICAgJ2JhY2tncm91bmQtc2l6ZSc6IGltZ1dpZHRoICsgJ3B4JyArICcgJyArICdhdXRvJyxcbiAgICAgICdiYWNrZ3JvdW5kLXBvc2l0aW9uJzogKHBvc1gpICsgJ3B4JyArICcgJyArIChwb3NZLTUwKSAgKydweCdcblxuICB9KTtcbiAgLypcbiAgICBjb25zb2xlLmxvZygnYmx1ci5jc3MnLCBibHVyLmNzcygnYmFja2dyb3VuZC1zaXplJykpO1xuICAgIGNvbnNvbGUubG9nKCdibHVyLmNzcycsIGJsdXIuY3NzKCdiYWNrZ3JvdW5kLXBvc2l0aW9uJykpO1xuICAgIGNvbnNvbGUubG9nKCdibHVyQ1NTPScsIGJsdXIpO1xuICovXG59XG5cblxuLyotLS0tLS0tLS0tLS0tLSBzbGlkZXIgZm9yIHBhZ2Utd29ya3MgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxudmFyIHNsaWRlcj0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY291bnRlciA9IDEsXG4gICAgICAgIGR1cmF0aW9uID0zMDAsXG4gICAgICAgIGluUHJvY2VzcyA9IGZhbHNlO1xuXG4gICAgLy9jb25zb2xlLmxvZygnY291bnRlci0xPScsY291bnRlcik7XG5cbiAgICB2YXIgbW92ZVNsaWRlciA9IGZ1bmN0aW9uIChjb250YWluZXIsIGRpcmVjdGlvbikge1xuICAgICAgICB2YXIgaXRlbXMgPSAkKCcuc2xpZGVyLWl0ZW0nLCBjb250YWluZXIpLFxuICAgICAgICAgIGFjdGl2ZUl0ZW0gPSBpdGVtcy5maWx0ZXIoJy5hY3RpdmUnKSxcbiAgICAgICAgICBkaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT0gJ2Rvd24nID8gMTAwIDogLTEwMDtcblxuICAgICAgICBpZiAoY291bnRlciA+PSBpdGVtcy5sZW5ndGggfHwgY291bnRlciA8PSAtaXRlbXMubGVuZ3RoKSBjb3VudGVyID0gMDtcblxuICAgICAgICB2YXIgcmVxSXRlbSA9IGl0ZW1zLmVxKGNvdW50ZXIpO1xuXG5cbiAgICAgICAgYWN0aXZlSXRlbS5hbmltYXRlKHtcbiAgICAgICAgICAgICd0b3AnOiBkaXJlY3Rpb24gKyAnJSdcbiAgICAgICAgfSwgZHVyYXRpb24pO1xuXG4gICAgICAgIHJlcUl0ZW0uYW5pbWF0ZSgge1xuICAgICAgICAgICAgJ3RvcCc6ICcwJ1xuICAgICAgICB9LCBkdXJhdGlvbiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYWN0aXZlSXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAuY3NzKCd0b3AnLCAgKyBkaXJlY3Rpb24gKyAnJScpO1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgIGluUHJvY2VzcyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvKmNvbnNvbGUubG9nKCdjb3VudGVyLTInLCBjb3VudGVyKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkaXJlY3Rpb24nLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FjdGl2ZUl0ZW0tMz0nLGFjdGl2ZUl0ZW0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlcUl0ZW0tMz0nLHJlcUl0ZW0pO1xuICAgICAgICAgICAgKi9cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1cEluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKCcuc2xpZGVyX19idG5zLXJpZ2h0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaW5Qcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpblByb2Nlc3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlcigkKCcubXl3b3Jrc19fbGVmdCcpLCAndXAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlU2xpZGVyKCQoJy5kaXNwbGF5X19ibG9jaycpLCAnZG93bicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZXIoJCgnLnNsaWRlcl9fYnV0dG9uLWxlZnQnKSwgJ3VwJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlcigkKCcuc2xpZGVyX19idXR0b24tcmlnaHQnKSwgJ2Rvd24nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdjb3VudGVyLTM9Jyxjb3VudGVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRvd25Jbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCgnLnNsaWRlcl9fYnRucy1sZWZ0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWluUHJvY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5Qcm9jZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZXIoJCgnLnNsaWRlcl9fYnV0dG9uLXJpZ2h0JyksICdkb3duJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlU2xpZGVyKCQoJy5zbGlkZXJfX2J1dHRvbi1sZWZ0JyksICd1cCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlcigkKCcuZGlzcGxheV9fYmxvY2snKSwgJ2Rvd24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZXIoJCgnLm15d29ya3NfX2xlZnQnKSwgJ2Rvd24nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlci0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnY291bnRlci00PScsY291bnRlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG59KSgpO1xuXG4kKGZ1bmN0aW9uICgpIHtcblxuICAgIC8vY29uc29sZS5sb2coJ9Cf0YDQuNCy0LXRgi3RjyDQt9Cw0L/Rg9GB0YLQuNC70LDRgdGMINC40LcgZnVuY3Rpb249Jyk7XG4gICAgc2xpZGVyLnVwSW5pdCgpO1xuICAgIHNsaWRlci5kb3duSW5pdCgpO1xuXG59KTtcbi8qIC0tLS0tLS0tLS0tLS0tIEVORCBzbGlkZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuLyog0JzQvtC00YPQu9GMINC00LvRjyDQv9GA0LXQu9C+0LDQtNC10YDQsCAtIHByZWxvYWRlciAgKi9cblxuXG52YXIgcHJlbG9hZGVyPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBwZXJjZW50c1RvdGFsID0wLFxuICAgICAgICBwcmVsb2FkZXIgPSAkKCcucHJlbG9hZGVyJyk7XG5cbiAgICAgICAgdmFyIGltZ1BhdGggPSQoJyonKS5tYXAoZnVuY3Rpb24gKG5keCwgZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIGJhY2tncm91bmQgPSQoZWxlbWVudCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyksIC8vINC/0YPRgtGMINC6INC60LDRgNGC0LjQvdC60LUg0LIgYmFja2dyb3VuZC1pbWFnZVxuICAgICAgICAgICAgICAgIGltZyA9ICQoZWxlbWVudCkuaXMoJ2ltZycpLFxuICAgICAgICAgICAgICAgIHBhdGggPSAnJztcbiAgICAgICAgICAgIGlmIChiYWNrZ3JvdW5kICE9ICdub25lJykge1xuICAgICAgICAgICAgICAgIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsJycpLnJlcGxhY2UoJ1wiKScsJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGltZykge1xuICAgICAgICAgICAgICAgIHBhdGggPSAkKGVsZW1lbnQpLmF0dHIoJ3NyYycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhdGgpIHJldHVybiBwYXRoO1xuXG4gICAgICAgIH0pO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdwYXRoPScsIGltZ1BhdGgpO1xuICAgICAgICB2YXIgc2V0UGVyY2VudHMgPSBmdW5jdGlvbiAodG90YWwsIGN1cnJlbnQpIHtcbiAgICAgICAgICAgIHZhciBwZXJjZW50cyA9IE1hdGguY2VpbChjdXJyZW50L3RvdGFsICoxMDApO1xuICAgICAgICAgICAgJCgnLnByZWxvYWRlcl9fcGVyY2VudHMnKS50ZXh0KHBlcmNlbnRzICsgJyUnKTtcbiAgICAgICAgICAgIGlmIChwZXJjZW50cyA+PTEwMCkge1xuICAgICAgICAgICAgICAgIHByZWxvYWRlci5mYWRlT3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBsb2FkSW1hZ2VzID0gZnVuY3Rpb24gKGltYWdlcykge1xuICAgICAgICAgICAgaWYgKCFpbWFnZXMubGVuZ3RoKSBwcmVsb2FkZXIuZmFkZU91dCgpO1xuICAgICAgICAgICAgaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24gKGltZywgaSwgaW1hZ2VzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZha2VJbWFnZSA9ICQoJzxpbWc+Jyx7XG4gICAgICAgICAgICAgICAgICAgIGF0dHI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogaW1nXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgZmFrZUltYWdlLm9uKCdsb2FkIGVycm9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwZXJjZW50c1RvdGFsKys7XG4gICAgICAgICAgICAgICAgICAgIHNldFBlcmNlbnRzKGltYWdlcy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncGF0aD0nLCBpbWdQYXRoKTtcbiAgICAgICAgICAgICAgICB2YXIgaW1hZ3MgPSBpbWdQYXRoLnRvQXJyYXkoKTtcbiAgICAgICAgICAgICAgICBsb2FkSW1hZ2VzKGltYWdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxufSgpKTtcblxuJChmdW5jdGlvbiAoKSB7XG4gICAgcHJlbG9hZGVyLmluaXQoKTtcbiAgICAvL2NvbnNvbGUubG9nKCfQn9GA0LjQstC10YIt0Y8g0LfQsNC/0YPRgdGC0LjQu9Cw0YHRjCDQuNC3IHByZWxvYWRlcj0nKTtcbiAgICAvL3NsaWRlci5pbml0KCk7XG5cbn0pO1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBFTkQgcHJlbG9hZGVyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuLyog0JzQvtC00YPQu9GMINC00LvRjyBoYW1idXJnZXIgICovXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICQoJyNoYW1idXJnZXInKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJywgZmFsc2UpO1xuICAgICAgICAgICQoJy5mdWxsLXNjcmVlbi1tZW51JykuY3NzKCdkaXNwbGF5Jywnbm9uZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnLCB0cnVlKTtcbiAgICAgICAgICAkKCcuZnVsbC1zY3JlZW4tbWVudScpLmNzcygnZGlzcGxheScsJ2Jsb2NrJyk7XG4gICAgICB9XG4gIH0pO1xufSk7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEVORCBodW1idXJnZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbi8qINCc0L7QtNGD0LvRjCDQtNC70Y8g0L/QsNGA0LDQu9C70LDQutGB0LAg0L/QviDRgdC60YDQvtC70LvRgyDQvdCwINGB0YLRgNCw0L3QuNGG0LUgYWJvdXQg0LTQu9GPINGB0LXQutGG0LjQuCAtIGhlcm8gICovXG52YXIgcGFyYWxheCA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm9fX2JnJyk7IC8vINC00LvRjyDQutCw0YDRgtC40L3QutC4INCyINC30LDQs9C+0LvQvtCy0LrQtVxuICAgIHZhciB1c2VyPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyLmhlcm9fX3VzZXItYmxvY2snKTsgLy8g0LTQu9GPINCx0LvQvtC60LAgLSDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y8gLSB1c2VyLWJsb2NrXG4gICAgdmFyIHNlY3Rpb25UZXh0ID1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VjdGlvbi10aXRsZScpOyAvLyDQtNC70Y8gUG9ydGZvbGlvXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBtb3ZlOiBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XG4gICAgICAgICAgICB2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsLyAtc3RyYWZlQW1vdW50ICsgJyUnO1xuXG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsJytzdHJhZmUrJywwKSc7XG5cbiAgICAgICAgICAgIHZhciBzdHlsZSA9IGJsb2NrLnN0eWxlO1xuXG4gICAgICAgICAgICBzdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG4gICAgICAgICAgICBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG5cbiAgICAgICAgfSxcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZShiZywgd1Njcm9sbCwgNDUpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlKHNlY3Rpb25UZXh0LHdTY3JvbGwsMzApO1xuICAgICAgICAgICAgdGhpcy5tb3ZlKHVzZXIsd1Njcm9sbCwgMyk7XG4gICAgICAgIH1cbiAgICB9O1xufSgpKTtcblxud2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuXG4gICAgcGFyYWxheC5pbml0KHdTY3JvbGwpO1xuXG4gICAgLy9jb25zb2xlLmxvZygn0K3RgtC+INGPIC0g0J/RgNC40LLQtdGCISDQnNC+0ZEg0L/QvtC70L7QttC10L3QuNC1INC90LAg0YHRgtGA0LDQvdC40YbQtT0nLCB3U2Nyb2xsKTtcbiAgICAvL2NvbnNvbGUubG9nKCfQn9GA0LjQstC10YIt0Y8g0LfQsNC/0YPRgdGC0LjQu9Cw0YHRjCDQuNC3IHBhcmFsYXhfc2Nyb2xsPScpO1xuICAgIC8vc2xpZGVyLmluaXQoKTtcbn07XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEVORCBwYXJhbGxheCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbi8qINCc0L7QtNGD0LvRjCDQtNC70Y8g0L/QsNGA0LDQu9C70LDQutGB0LAg0L/QviDQtNCy0LjQttC10L3QuNGOINC80YvRiNC60Lgg0L3QsCDRgdGC0YDQsNC90LjRhtC1IHdlbGNvbSDQuCDQsNCy0YLQvtGA0LjQt9Cw0YbQuNC4ICAqL1xuXG52YXIgcGFyYWxsYXhtb3VzZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBhcmFsbGF4Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcmFsbGF4JyksXG4gICAgbGF5ZXJzID0gcGFyYWxsYXhDb250YWluZXIuY2hpbGRyZW47XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBtb3ZlTGF5ZXJzOiBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgICAgICB2YXIgaW5pdGlhbFggPSAod2luZG93LmlubmVyV2lkdGgvMikgLSBlLnBhZ2VYLFxuICAgICAgICAgICAgICAgIGluaXRpYWxZID0gKHdpbmRvdy5pbm5lckhlaWdodC8yKSAtIGUucGFnZVk7XG5cblxuICAgICAgICAgICAgW10uc2xpY2UuY2FsbChsYXllcnMpLmZvckVhY2goZnVuY3Rpb24gKGxheWVyLCBpKSB7XG4gICAgICAgICAgICAgICAgdmFyXG4gICAgICAgICAgICAgICAgICAgIGRpdmlkZXIgPSBpLzEwMCxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25YID0gaW5pdGlhbFggKiAyKmRpdmlkZXIsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWCA9IGluaXRpYWxZICogMipkaXZpZGVyLFxuICAgICAgICAgICAgICAgICAgICBib3R0b21Qb3NpdGlvbiA9ICh3aW5kb3cuaW5uZXJIZWlnaHQvMikgKiBkaXZpZGVyLFxuICAgICAgICAgICAgICAgICAgICBsYXllclN0eWxlID1sYXllci5zdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKCcgKyBwb3NpdGlvblgrJ3B4LCcgKyBwb3NpdGlvblgrJ3B4LDApJztcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyU3R5bGUuYm90dG9tID0gJy0nICsgYm90dG9tUG9zaXRpb24gKyAncHgnO1xuXG4gICAgICAgICAgICB9KTsgLy8gZW5kIGZvckVhY2hcblxuICAgICAgICB9IC8vIGVuZCBtb3ZlbGF5ZXJzXG4gICAgfTsgLy9lbmQgcmV0dXJuXG59KSgpOyAvL2VuZCBwYXJhbGxheG1vdXNlXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBwYXJhbGxheG1vdXNlLm1vdmVMYXllcnMpO1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEVORCBwYXJhbGxheG1vdXNlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG5cblxuLyotLS0tLS0tLS0tLS0tLSBzbGlkZXIgZm9yIHBhZ2Utd29ya3MgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLypcbnZhciBzbGlkZXI9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvdW50ZXIgPSAxLFxuICAgICAgICBkdXJhdGlvbiA9MzAwO1xuICAgIGNvbnNvbGUubG9nKCdjb3VudGVyPScsY291bnRlcik7XG4gICAgdmFyIG1vdmVTbGlkZXIgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgLy92YXIgaXRlbXMgPSBjb250YWluZXIuZmluZCgnLmJ1dHRvbl9faXRlbScpXG4gICAgICAgIHZhciBpdGVtcyA9JCgnLmJ1dHRvbl9faXRlbScsIGNvbnRhaW5lciksXG4gICAgICAgICAgICBhY3RpdmVJdGVtID1pdGVtcy5maWx0ZXIoJy5hY3RpdmUnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhY3RpdmVJdGVtPScsYWN0aXZlSXRlbSk7XG4gICAgICAgIHZhciByZWdJdGVtID1pdGVtcy5lcShjb3VudGVyKTsgLy/QvNC10YLQvtC0IGVxINC/0LXRgNC10LHQuNGA0LDQtdGCINC/0L7Qv9C+0YDRj9C00LrRgyDQvNCw0YHRgdC40LJcblxuICAgICAgICBhY3RpdmVJdGVtLmFuaW1hdGVkKCB7XG4gICAgICAgICAgICAndG9wJzogJzEwMCUnXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAocGFyYW0pIHtcbiAgICAgICAgICAgICAgICAkKCcuc2xpZGVyX19idG5zLXJpZ2h0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZS5wcmV2ZW50RGVmYXVsdCgpPScsZS5wcmV2ZW50RGVmYXVsdCgpKTtcbiAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlcigkKCcuYnV0dG9uX19pdGVtJykpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIFxufSgpKTtcblxuXG4kKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnNvbGUubG9nKCfQn9GA0LjQstC10YIt0Y8g0LfQsNC/0YPRgdGC0LjQu9Cw0YHRjCDQuNC3IGZ1bmN0aW9uPScpO1xuICAgIHNsaWRlci5pbml0KCk7XG5cbn0pO1xuXG5cbiQoJy5zbGlkZXJfX2J0bnMtbGVmdCcpLm9uKCdjbGljaycsZnVuY3Rpb24gKGUpIHtcbiAgICBjb25zb2xlLmxvZyhcItCf0YDQuNCy0LXRgi0hISEhXCIpO1xufSlcblxu0L9cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZygn0J/RgNC40LLQtdGCLdGPINC30LDQv9GD0YHRgtC40LvQsNGB0Ywg0LjQtyB3b3Jrcz0nKTtcbiAgICAvL2FsZXJ0KCfQn9GA0LjQstC10YIt0Y8g0LfQsNC/0YPRgdGC0LjQu9Cw0YHRjCDQuNC3IHdvcmtzLXdyYXBlcj0nKTtcblxuICAgIHNsaWRlci5pbml0KCk7XG59KTtcblxuXG4vL3ByZWxvYWRlciA9ICQoJy5wcmVsb2FkZXInKTtcbmlmKCQoJy5teXdvcmtzJykpe1xuICAgIGNvbnNvbGUubG9nKCfQn9GA0LjQstC10YIt0Y8g0LfQsNC/0YPRgdGC0LjQu9Cw0YHRjCDQuNC3IHdvcmtzLXdyYXBlcj0nKTtcbiAgICBzbGlkZXIuaW5pdCgpO1xufVxuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKCfQn9GA0LjQstC10YIt0Y8g0LfQsNC/0YPRgdGC0LjQu9Cw0YHRjCDQuNC3IHdvcmtzLXdpbmRvdy5vbmxvYWQ9Jyk7XG4gICAgc2xpZGVyLmluaXQoKTtcbn1cblxuJChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zb2xlLmxvZygn0J/RgNC40LLQtdGCLdGPINC30LDQv9GD0YHRgtC40LvQsNGB0Ywg0LjQtyB3b3JrczEg0L/QviA9Jyk7XG4gICAgc2xpZGVyLmluaXQoKTtcblxufSk7XG5cbiovXG5cblxuXG4iXX0=
