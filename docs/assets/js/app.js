
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKiDQnNC+0LTRg9C70Ywg0LTQu9GPIGhhbWJ1cmdlciAgKi9cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgJCgnI2hhbWJ1cmdlcicpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnLCBmYWxzZSk7XG4gICAgICAgICAgJCgnLmZ1bGwtc2NyZWVuLW1lbnUnKS5jc3MoJ2Rpc3BsYXknLCdub25lJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScsIHRydWUpO1xuICAgICAgICAgICQoJy5mdWxsLXNjcmVlbi1tZW51JykuY3NzKCdkaXNwbGF5JywnYmxvY2snKTtcbiAgICAgIH1cbiAgfSk7XG59KTtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRU5EIGh1bWJ1cmdlciAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuLyog0JzQvtC00YPQu9GMINC00LvRjyDQv9Cw0YDQsNC70LvQsNC60YHQsCDQv9C+INGB0LrRgNC+0LvQu9GDINC90LAg0YHRgtGA0LDQvdC40YbQtSBhYm91dCDQtNC70Y8g0YHQtdC60YbQuNC4IC0gaGVybyAgKi9cbnZhciBwYXJhbGF4ID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVyb19fYmcnKTsgLy8g0LTQu9GPINC60LDRgNGC0LjQvdC60Lgg0LIg0LfQsNCz0L7Qu9C+0LLQutC1XG4gICAgdmFyIHVzZXI9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXIuaGVyb19fdXNlci1ibG9jaycpOyAvLyDQtNC70Y8g0LHQu9C+0LrQsCAtINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjyAtIHVzZXItYmxvY2tcbiAgICB2YXIgc2VjdGlvblRleHQgPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLXRpdGxlJyk7IC8vINC00LvRjyBQb3J0Zm9saW9cblxuICAgIHJldHVybiB7XG4gICAgICAgIG1vdmU6IGZ1bmN0aW9uIChibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bnQpIHtcbiAgICAgICAgICAgIHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwvIC1zdHJhZmVBbW91bnQgKyAnJSc7XG5cbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwnK3N0cmFmZSsnLDApJztcblxuICAgICAgICAgICAgdmFyIHN0eWxlID0gYmxvY2suc3R5bGU7XG5cbiAgICAgICAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcbiAgICAgICAgICAgIHN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcblxuICAgICAgICB9LFxuICAgICAgICBpbml0OiBmdW5jdGlvbiAod1Njcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlKGJnLCB3U2Nyb2xsLCA0NSk7XG4gICAgICAgICAgICB0aGlzLm1vdmUoc2VjdGlvblRleHQsd1Njcm9sbCwzMCk7XG4gICAgICAgICAgICB0aGlzLm1vdmUodXNlcix3U2Nyb2xsLCAzKTtcbiAgICAgICAgfVxuICAgIH07XG59KCkpO1xuXG53aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cbiAgICBwYXJhbGF4LmluaXQod1Njcm9sbCk7XG5cbiAgICAvL2NvbnNvbGUubG9nKCfQrdGC0L4g0Y8gLSDQn9GA0LjQstC10YIhINCc0L7RkSDQv9C+0LvQvtC20LXQvdC40LUg0L3QsCDRgdGC0YDQsNC90LjRhtC1PScsIHdTY3JvbGwpO1xufTtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRU5EIHBhcmFsbGF4IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuLyog0JzQvtC00YPQu9GMINC00LvRjyDQv9Cw0YDQsNC70LvQsNC60YHQsCDQv9C+INC00LLQuNC20LXQvdC40Y4g0LzRi9GI0LrQuCDQvdCwINGB0YLRgNCw0L3QuNGG0LUgd2VsY29tINC4INCw0LLRgtC+0YDQuNC30LDRhtC40LggICovXG5cbnZhciBwYXJhbGxheG1vdXNlID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGFyYWxsYXhDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFyYWxsYXgnKSxcbiAgICBsYXllcnMgPSBwYXJhbGxheENvbnRhaW5lci5jaGlsZHJlbjtcblxuICAgIHJldHVybiB7XG4gICAgICAgIG1vdmVMYXllcnM6IGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgICAgIHZhciBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aC8yKSAtIGUucGFnZVgsXG4gICAgICAgICAgICAgICAgaW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0LzIpIC0gZS5wYWdlWTtcblxuXG4gICAgICAgICAgICBbXS5zbGljZS5jYWxsKGxheWVycykuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIsIGkpIHtcbiAgICAgICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgICAgICAgZGl2aWRlciA9IGkvMTAwLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblggPSBpbml0aWFsWCAqIDIqZGl2aWRlcixcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25YID0gaW5pdGlhbFkgKiAyKmRpdmlkZXIsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvc2l0aW9uID0gKHdpbmRvdy5pbm5lckhlaWdodC8yKSAqIGRpdmlkZXIsXG4gICAgICAgICAgICAgICAgICAgIGxheWVyU3R5bGUgPWxheWVyLnN0eWxlO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoJyArIHBvc2l0aW9uWCsncHgsJyArIHBvc2l0aW9uWCsncHgsMCknO1xuICAgICAgICAgICAgICAgICAgICBsYXllclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJTdHlsZS5ib3R0b20gPSAnLScgKyBib3R0b21Qb3NpdGlvbiArICdweCc7XG5cbiAgICAgICAgICAgIH0pOyAvLyBlbmQgZm9yRWFjaFxuXG4gICAgICAgIH0gLy8gZW5kIG1vdmVsYXllcnNcbiAgICB9IC8vZW5kIHJldHVyblxufSkoKTsgLy9lbmQgcGFyYWxsYXhtb3VzZVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgcGFyYWxsYXhtb3VzZS5tb3ZlTGF5ZXJzKTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBFTkQgcGFyYWxsYXhtb3VzZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbi8qINCc0L7QtNGD0LvRjCDQtNC70Y8g0L/RgNC10LvQvtCw0LTQtdGA0LAgLSBwcmVsb2FkZXIgICovXG5cblxudmFyIHByZWxvYWRlcj0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGVyY2VudHNUb3RhbCA9MCxcbiAgICAgICAgcHJlbG9hZGVyID0gJCgnLnByZWxvYWRlcicpO1xuXG4gICAgICAgIHZhciBpbWdQYXRoID0kKCcqJykubWFwKGZ1bmN0aW9uIChuZHgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBiYWNrZ3JvdW5kID0kKGVsZW1lbnQpLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLCAvLyDQv9GD0YLRjCDQuiDQutCw0YDRgtC40L3QutC1INCyIGJhY2tncm91bmQtaW1hZ2VcbiAgICAgICAgICAgICAgICBpbWcgPSAkKGVsZW1lbnQpLmlzKCdpbWcnKSxcbiAgICAgICAgICAgICAgICBwYXRoID0gJyc7XG4gICAgICAgICAgICBpZiAoYmFja2dyb3VuZCAhPSAnbm9uZScpIHtcbiAgICAgICAgICAgICAgICBwYXRoID0gYmFja2dyb3VuZC5yZXBsYWNlKCd1cmwoXCInLCcnKS5yZXBsYWNlKCdcIiknLCcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbWcpIHtcbiAgICAgICAgICAgICAgICBwYXRoID0gJChlbGVtZW50KS5hdHRyKCdzcmMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXRoKSByZXR1cm4gcGF0aFxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBzZXRQZXJjZW50cyA9IGZ1bmN0aW9uICh0b3RhbCwgY3VycmVudCkge1xuICAgICAgICAgICAgdmFyIHBlcmNlbnRzID0gTWF0aC5jZWlsKGN1cnJlbnQvdG90YWwgKjEwMCk7XG4gICAgICAgICAgICAkKCcucHJlbG9hZGVyX19wZXJjZW50cycpLnRleHQocGVyY2VudHMgKyAnJScpO1xuICAgICAgICAgICAgaWYgKHBlcmNlbnRzID49MTAwKSB7XG4gICAgICAgICAgICAgICAgcHJlbG9hZGVyLmZhZGVPdXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGxvYWRJbWFnZXMgPSBmdW5jdGlvbiAoaW1hZ2VzKSB7XG4gICAgICAgICAgICBpZiAoIWltYWdlcy5sZW5ndGgpIHByZWxvYWRlci5mYWRlT3V0KCk7XG4gICAgICAgICAgICBpbWFnZXMuZm9yRWFjaChmdW5jdGlvbiAoaW1nLCBpLCBpbWFnZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmFrZUltYWdlID0gJCgnPGltZz4nLHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBpbWdcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBmYWtlSW1hZ2Uub24oJ2xvYWQgZXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcbiAgICAgICAgICAgICAgICAgICAgc2V0UGVyY2VudHMoaW1hZ2VzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncGF0aD0nLCBpbWdQYXRoKTtcbiAgICAgICAgICAgICAgICB2YXIgaW1hZ3MgPSBpbWdQYXRoLnRvQXJyYXkoKTtcbiAgICAgICAgICAgICAgICBsb2FkSW1hZ2VzKGltYWdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG59KCkpO1xuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICBwcmVsb2FkZXIuaW5pdCgpO1xufSk7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEVORCBwcmVsb2FkZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4kKCcuaGFtYnVyZ2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnNvbGUubG9nKFwiINC60LvQsNGB0YEtMi0wPVwiLCB0aGlzKTtcbiAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIiDQutC70LDRgdGBLTItMT1cIiwgdGhpcyk7XG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJCgnLmZ1bGwtc2NyZWVuLW1lbnUnKS5jc3MoJ2Rpc3BsYXknLCdub25lJyk7XG4gIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIiDQutC70LDRgdGBLTItMj1cIiwgdGhpcyk7XG4gICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgJCgnLmZ1bGwtc2NyZWVuLW1lbnUnKS5jc3MoJ2Rpc3BsYXknLCdmbGV4Jyk7XG4gIH1cbiAgY29uc29sZS5sb2coXCIg0LrQu9Cw0YHRgS0yLTM9XCIpO1xufSk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRU5EIGh1bWJ1cmdlciAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovIl19
