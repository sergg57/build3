/*(function() {
  'use strict';

  setTimeout(function() {
    document.querySelector('.greating_picture').classList.add('m--show');
  }, 1000);
})();
*/

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
            /*console.log("block=",block);
            console.log("transformString=",transformString);
            console.log("style=",style);
            */

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

                //console.log('layer=', layer);
                //console.log('transformString=', transformString);
                //console.log('layerStyle.transform=', layerStyle.transform);
                //console.log('layerStyle.bottom=', layerStyle.bottom);

            });
            //console.log('layers=', layers);
            /*console.log('transformString=', transformString);
            console.log('layerStyle.transform=', layerStyle.transform);
            console.log('initialX =', initialX );
            console.log('initialY=', initialY);*/
        }
    }
})();

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyZWF0aW5nX3BpY3R1cmUnKS5jbGFzc0xpc3QuYWRkKCdtLS1zaG93Jyk7XG4gIH0sIDEwMDApO1xufSkoKTtcbiovXG5cbi8qINCc0L7QtNGD0LvRjCDQtNC70Y8g0L/QsNGA0LDQu9C70LDQutGB0LAg0L/QviDRgdC60YDQvtC70LvRgyDQvdCwINGB0YLRgNCw0L3QuNGG0LUgYWJvdXQg0LTQu9GPINGB0LXQutGG0LjQuCAtIGhlcm8gICovXG52YXIgcGFyYWxheCA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm9fX2JnJyk7IC8vINC00LvRjyDQutCw0YDRgtC40L3QutC4INCyINC30LDQs9C+0LvQvtCy0LrQtVxuICAgIHZhciB1c2VyPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyLmhlcm9fX3VzZXItYmxvY2snKTsgLy8g0LTQu9GPINCx0LvQvtC60LAgLSDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y8gLSB1c2VyLWJsb2NrXG4gICAgdmFyIHNlY3Rpb25UZXh0ID1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VjdGlvbi10aXRsZScpOyAvLyDQtNC70Y8gUG9ydGZvbGlvXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBtb3ZlOiBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XG4gICAgICAgICAgICB2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsLyAtc3RyYWZlQW1vdW50ICsgJyUnO1xuXG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsJytzdHJhZmUrJywwKSc7XG5cbiAgICAgICAgICAgIHZhciBzdHlsZSA9IGJsb2NrLnN0eWxlO1xuXG4gICAgICAgICAgICBzdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG4gICAgICAgICAgICBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG4gICAgICAgICAgICAvKmNvbnNvbGUubG9nKFwiYmxvY2s9XCIsYmxvY2spO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0cmFuc2Zvcm1TdHJpbmc9XCIsdHJhbnNmb3JtU3RyaW5nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3R5bGU9XCIsc3R5bGUpO1xuICAgICAgICAgICAgKi9cblxuICAgICAgICB9LFxuICAgICAgICBpbml0OiBmdW5jdGlvbiAod1Njcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlKGJnLCB3U2Nyb2xsLCA0NSk7XG4gICAgICAgICAgICB0aGlzLm1vdmUoc2VjdGlvblRleHQsd1Njcm9sbCwzMCk7XG4gICAgICAgICAgICB0aGlzLm1vdmUodXNlcix3U2Nyb2xsLCAzKTtcbiAgICAgICAgfVxuICAgIH07XG59KCkpO1xuXG53aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cbiAgICBwYXJhbGF4LmluaXQod1Njcm9sbCk7XG5cbiAgICAvL2NvbnNvbGUubG9nKCfQrdGC0L4g0Y8gLSDQn9GA0LjQstC10YIhINCc0L7RkSDQv9C+0LvQvtC20LXQvdC40LUg0L3QsCDRgdGC0YDQsNC90LjRhtC1PScsIHdTY3JvbGwpO1xufTtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRU5EIHBhcmFsbGF4IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuLyog0JzQvtC00YPQu9GMINC00LvRjyDQv9Cw0YDQsNC70LvQsNC60YHQsCDQv9C+INC00LLQuNC20LXQvdC40Y4g0LzRi9GI0LrQuCDQvdCwINGB0YLRgNCw0L3QuNGG0LUgd2VsY29tINC4INCw0LLRgtC+0YDQuNC30LDRhtC40LggICovXG5cbnZhciBwYXJhbGxheG1vdXNlID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGFyYWxsYXhDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFyYWxsYXgnKSxcbiAgICBsYXllcnMgPSBwYXJhbGxheENvbnRhaW5lci5jaGlsZHJlbjtcblxuICAgIHJldHVybiB7XG4gICAgICAgIG1vdmVMYXllcnM6IGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgICAgIHZhciBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aC8yKSAtIGUucGFnZVgsXG4gICAgICAgICAgICAgICAgaW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0LzIpIC0gZS5wYWdlWTtcblxuXG4gICAgICAgICAgICBbXS5zbGljZS5jYWxsKGxheWVycykuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIsIGkpIHtcbiAgICAgICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgICAgICAgZGl2aWRlciA9IGkvMTAwLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblggPSBpbml0aWFsWCAqIDIqZGl2aWRlcixcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25YID0gaW5pdGlhbFkgKiAyKmRpdmlkZXIsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvc2l0aW9uID0gKHdpbmRvdy5pbm5lckhlaWdodC8yKSAqIGRpdmlkZXIsXG4gICAgICAgICAgICAgICAgICAgIGxheWVyU3R5bGUgPWxheWVyLnN0eWxlO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoJyArIHBvc2l0aW9uWCsncHgsJyArIHBvc2l0aW9uWCsncHgsMCknO1xuICAgICAgICAgICAgICAgICAgICBsYXllclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJTdHlsZS5ib3R0b20gPSAnLScgKyBib3R0b21Qb3NpdGlvbiArICdweCc7XG5cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdsYXllcj0nLCBsYXllcik7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygndHJhbnNmb3JtU3RyaW5nPScsIHRyYW5zZm9ybVN0cmluZyk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnbGF5ZXJTdHlsZS50cmFuc2Zvcm09JywgbGF5ZXJTdHlsZS50cmFuc2Zvcm0pO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2xheWVyU3R5bGUuYm90dG9tPScsIGxheWVyU3R5bGUuYm90dG9tKTtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdsYXllcnM9JywgbGF5ZXJzKTtcbiAgICAgICAgICAgIC8qY29uc29sZS5sb2coJ3RyYW5zZm9ybVN0cmluZz0nLCB0cmFuc2Zvcm1TdHJpbmcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xheWVyU3R5bGUudHJhbnNmb3JtPScsIGxheWVyU3R5bGUudHJhbnNmb3JtKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbml0aWFsWCA9JywgaW5pdGlhbFggKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbml0aWFsWT0nLCBpbml0aWFsWSk7Ki9cbiAgICAgICAgfVxuICAgIH1cbn0pKCk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBwYXJhbGxheG1vdXNlLm1vdmVMYXllcnMpO1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEVORCBwYXJhbGxheG1vdXNlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuLyog0JzQvtC00YPQu9GMINC00LvRjyDQv9GA0LXQu9C+0LDQtNC10YDQsCAtIHByZWxvYWRlciAgKi9cblxuXG52YXIgcHJlbG9hZGVyPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBwZXJjZW50c1RvdGFsID0wLFxuICAgICAgICBwcmVsb2FkZXIgPSAkKCcucHJlbG9hZGVyJyk7XG5cbiAgICAgICAgdmFyIGltZ1BhdGggPSQoJyonKS5tYXAoZnVuY3Rpb24gKG5keCwgZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIGJhY2tncm91bmQgPSQoZWxlbWVudCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyksIC8vINC/0YPRgtGMINC6INC60LDRgNGC0LjQvdC60LUg0LIgYmFja2dyb3VuZC1pbWFnZVxuICAgICAgICAgICAgICAgIGltZyA9ICQoZWxlbWVudCkuaXMoJ2ltZycpLFxuICAgICAgICAgICAgICAgIHBhdGggPSAnJztcbiAgICAgICAgICAgIGlmIChiYWNrZ3JvdW5kICE9ICdub25lJykge1xuICAgICAgICAgICAgICAgIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsJycpLnJlcGxhY2UoJ1wiKScsJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGltZykge1xuICAgICAgICAgICAgICAgIHBhdGggPSAkKGVsZW1lbnQpLmF0dHIoJ3NyYycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhdGgpIHJldHVybiBwYXRoXG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHNldFBlcmNlbnRzID0gZnVuY3Rpb24gKHRvdGFsLCBjdXJyZW50KSB7XG4gICAgICAgICAgICB2YXIgcGVyY2VudHMgPSBNYXRoLmNlaWwoY3VycmVudC90b3RhbCAqMTAwKTtcbiAgICAgICAgICAgICQoJy5wcmVsb2FkZXJfX3BlcmNlbnRzJykudGV4dChwZXJjZW50cyArICclJyk7XG4gICAgICAgICAgICBpZiAocGVyY2VudHMgPj0xMDApIHtcbiAgICAgICAgICAgICAgICBwcmVsb2FkZXIuZmFkZU91dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgbG9hZEltYWdlcyA9IGZ1bmN0aW9uIChpbWFnZXMpIHtcbiAgICAgICAgICAgIGlmICghaW1hZ2VzLmxlbmd0aCkgcHJlbG9hZGVyLmZhZGVPdXQoKTtcbiAgICAgICAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChpbWcsIGksIGltYWdlcykge1xuICAgICAgICAgICAgICAgIHZhciBmYWtlSW1hZ2UgPSAkKCc8aW1nPicse1xuICAgICAgICAgICAgICAgICAgICBhdHRyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM6IGltZ1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGZha2VJbWFnZS5vbignbG9hZCBlcnJvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xuICAgICAgICAgICAgICAgICAgICBzZXRQZXJjZW50cyhpbWFnZXMubGVuZ3RoLCBwZXJjZW50c1RvdGFsKTtcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdwYXRoPScsIGltZ1BhdGgpO1xuICAgICAgICAgICAgICAgIHZhciBpbWFncyA9IGltZ1BhdGgudG9BcnJheSgpO1xuICAgICAgICAgICAgICAgIGxvYWRJbWFnZXMoaW1hZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbn0oKSk7XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIHByZWxvYWRlci5pbml0KCk7XG59KTtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRU5EIHByZWxvYWRlciAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovIl19
