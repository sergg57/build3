
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
      posX = blurSection.offset().left - blur.offset().left;

  blur.css({
      'background-size': imgWidth + 'px' + ' ' + 'auto',
      'background-position': (posX) + 'px' + ' ' + (posY-50)  +'px'

  });
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
/*------ Blog-active ----------------------------------*/

var menu = (function () {

    var menuItem = $('.item__link'),
        menuList = $('.blog__list'),
        menuFlag = $('.blog__flag'),
        leftColumn = $('.blog__content-left'),
        rightColumn = $('.blog__content-right');
        //menuBlogItem = $('.blog__item');

    console.log('menuItem=', menuItem);
    console.log('menuList=', menuList);
    //console.log('menuBlogItem=',menuBlogItem);
    console.log('leftColumn-1=', leftColumn);
    console.log('rightColumn-1=', rightColumn);

    return {

        setActive:function () {
            menuItem.on('click', function (e) {
                menuItem.removeClass('active');
                $(this).addClass('active');
                console.log('menuItem-3=', this);
            });

        },
        fixed: function () {
            $(window).scroll(function()  {

                if ($(window).scrollTop() > 400) {
                    menuList.addClass('blog__list_fixed');
                    menuFlag.addClass('blog__flag_fixed');
                    //console.log('posScroll=', $(window).scrollTop());
                    //console.log('menuList-2=', menuList);
                } else {
                    menuList.removeClass('blog__list_fixed');
                    menuFlag.removeClass('blog__flag_fixed');
                    //console.log('posScroll=', $(window).scrollTop());
                    //console.log('menuList-3=', menuList);
                }
            });
        },
        flag: function () {
            menuFlag.on('click', function (e) {
                e.preventDefault();
                console.log('leftColumn-2=', leftColumn);

                if (leftColumn.css('display') == 'block') {
                    leftColumn.hide();
                    //rightColumn.removeClass('blog__content-right_active-menu');
                    rightColumn.css('width', '100%');
                    //menuBlogItem.css('padding-right', '15px');
                    console.log('leftColumn-2=', leftColumn.css('display'));
                    console.log('rightColumn-2=', rightColumn.css('width'));
                    //console.log('menuBlogItem-2-1=', menuBlogItem.css('padding-right'));
                } else {
                    leftColumn.show();
                    //rightColumn.addClass('blog__content-right_active-menu');
                    rightColumn.css('width', '75%');
                    console.log('leftColumn-3=', leftColumn.css('display'));
                    console.log('rightColumn-3=', rightColumn.css('width'));
                    //console.log('menuBlogItem-3-1=', menuBlogItem.css('padding-right'));
                }
            });
        }


    };


})();

 $(function () {
     console.log('menuItem-1=', 1);
     menu.setActive();
     menu.fixed();
     menu.flag();
     //console.log('menuItem-2=',menu.setActive());

 });

/* ---------- BLUR for form page_works------------------------------- */




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


/* Модуль для параллакса по скроллу на страницах about, works, blog - для секции - hero  */
var paralax = (function () {
    var bg = document.querySelector('.hero__bg'); // для картинки в заголовке
    var user=document.querySelector('.user.hero__user-block'); // для блока - пользователя - user-block
    var sectionText =document.querySelector('.section-title'); // для Portfolio

    var bg_blog = document.querySelector('.hero-blog__bg'); // для картинки в заголовке on page-blog
    var user_blog=document.querySelector('.user.hero-blog__user-block'); // для блока - пользователя - user-block


    return {
        move: function (block, windowScroll, strafeAmount) {
            var strafe = windowScroll/ -strafeAmount + '%';

            var transformString = 'translate3d(0,'+strafe+',0)';

            var style = block.style;

            style.transform = transformString;
            style.webkitTransform = transformString;

        },
        init: function (wScroll) {
            if (bg != null) {
                this.move(bg, wScroll, 45);
                this.move(sectionText, wScroll, 30);
                this.move(user, wScroll, 3);
            }
            if (bg_blog != null) {
                this.move(bg_blog, wScroll, 45);
                this.move(user_blog, wScroll, 3);
            }

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



/*------ Blog-active ----------------------------------*/
/*
var menu = (function() {

    var leftColumn = $('.blog__content_left'),
        rightColumn = $('.blog__content_right'),
        menuList = $('.blog__content_list'),
        menuItem = $('.blog__content_list-item'),
        menuIcon = $('.blog__content_list-icon');

    return {

        setActive: function () {
            menuItem.on('click', function (e) {
                menuItem.removeClass('active-link');
                $(this).addClass('active-link');
            });
        },

        fixed: function () {
            $(window).scroll(function()  {

                if ($(window).scrollTop() > 900) {
                    menuList.addClass('blog__content_list_fixed');
                } else {
                    menuList.removeClass('blog__content_list_fixed');
                }
            });
        },

        flag: function () {
            menuIcon.on('click', function (e) {
                e.preventDefault();

                if (leftColumn.css('display') == 'block') {
                    leftColumn.hide();
                    rightColumn.removeClass('blog__content_right_active-menu');
                } else {
                    leftColumn.show();
                    rightColumn.addClass('blog__content_right_active-menu');
                }
            });
        }
    };
})();

if ($('.blog')) {
    menu.setActive();
    menu.fixed();
    menu.flag();
};

/*------ END Blog-active --------------------------*/







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




//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gIGJsdXIoKTtcbn0pXG4kKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XG4gIGJsdXIoKTtcbn0pO1xuXG5mdW5jdGlvbiBibHVyKCkge1xuICB2YXIgaW1nV2lkdGggPSAkKCcuZmVlZGJhY2snKS53aWR0aCgpLFxuICAgICAgYmx1clNlY3Rpb24gPSAkKCcuZmVlZGJhY2snKSxcbiAgICAgIGJsdXIgPSAkKCcuZmVlZGJhY2stZm9ybV9fYmx1cicpLFxuICAgICAgcG9zWSA9IGJsdXJTZWN0aW9uLm9mZnNldCgpLnRvcCAtIGJsdXIub2Zmc2V0KCkudG9wLCAvLyAgINGC0LXQutGD0YnQtdC1INC/0L7Qu9C+0LbQtdC90LjQtSDRjdC70LXQvNC10L3RgtCwINC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QviDQtNC+0LrRg9C80LXQvdGC0LAuXG4gICAgICBwb3NZID0gcG9zWSAtIGJsdXIuaGVpZ2h0KCkvMixcbiAgICAgIHBvc1ggPSBibHVyU2VjdGlvbi5vZmZzZXQoKS5sZWZ0IC0gYmx1ci5vZmZzZXQoKS5sZWZ0O1xuXG4gIGJsdXIuY3NzKHtcbiAgICAgICdiYWNrZ3JvdW5kLXNpemUnOiBpbWdXaWR0aCArICdweCcgKyAnICcgKyAnYXV0bycsXG4gICAgICAnYmFja2dyb3VuZC1wb3NpdGlvbic6IChwb3NYKSArICdweCcgKyAnICcgKyAocG9zWS01MCkgICsncHgnXG5cbiAgfSk7XG59XG5cblxuLyotLS0tLS0tLS0tLS0tLSBzbGlkZXIgZm9yIHBhZ2Utd29ya3MgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxudmFyIHNsaWRlcj0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY291bnRlciA9IDEsXG4gICAgICAgIGR1cmF0aW9uID0zMDAsXG4gICAgICAgIGluUHJvY2VzcyA9IGZhbHNlO1xuXG4gICAgLy9jb25zb2xlLmxvZygnY291bnRlci0xPScsY291bnRlcik7XG5cbiAgICB2YXIgbW92ZVNsaWRlciA9IGZ1bmN0aW9uIChjb250YWluZXIsIGRpcmVjdGlvbikge1xuICAgICAgICB2YXIgaXRlbXMgPSAkKCcuc2xpZGVyLWl0ZW0nLCBjb250YWluZXIpLFxuICAgICAgICAgIGFjdGl2ZUl0ZW0gPSBpdGVtcy5maWx0ZXIoJy5hY3RpdmUnKSxcbiAgICAgICAgICBkaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT0gJ2Rvd24nID8gMTAwIDogLTEwMDtcblxuICAgICAgICBpZiAoY291bnRlciA+PSBpdGVtcy5sZW5ndGggfHwgY291bnRlciA8PSAtaXRlbXMubGVuZ3RoKSBjb3VudGVyID0gMDtcblxuICAgICAgICB2YXIgcmVxSXRlbSA9IGl0ZW1zLmVxKGNvdW50ZXIpO1xuXG5cbiAgICAgICAgYWN0aXZlSXRlbS5hbmltYXRlKHtcbiAgICAgICAgICAgICd0b3AnOiBkaXJlY3Rpb24gKyAnJSdcbiAgICAgICAgfSwgZHVyYXRpb24pO1xuXG4gICAgICAgIHJlcUl0ZW0uYW5pbWF0ZSgge1xuICAgICAgICAgICAgJ3RvcCc6ICcwJ1xuICAgICAgICB9LCBkdXJhdGlvbiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYWN0aXZlSXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAuY3NzKCd0b3AnLCAgKyBkaXJlY3Rpb24gKyAnJScpO1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgIGluUHJvY2VzcyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvKmNvbnNvbGUubG9nKCdjb3VudGVyLTInLCBjb3VudGVyKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkaXJlY3Rpb24nLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FjdGl2ZUl0ZW0tMz0nLGFjdGl2ZUl0ZW0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlcUl0ZW0tMz0nLHJlcUl0ZW0pO1xuICAgICAgICAgICAgKi9cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1cEluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKCcuc2xpZGVyX19idG5zLXJpZ2h0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaW5Qcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpblByb2Nlc3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlcigkKCcubXl3b3Jrc19fbGVmdCcpLCAndXAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlU2xpZGVyKCQoJy5kaXNwbGF5X19ibG9jaycpLCAnZG93bicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZXIoJCgnLnNsaWRlcl9fYnV0dG9uLWxlZnQnKSwgJ3VwJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlcigkKCcuc2xpZGVyX19idXR0b24tcmlnaHQnKSwgJ2Rvd24nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdjb3VudGVyLTM9Jyxjb3VudGVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRvd25Jbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCgnLnNsaWRlcl9fYnRucy1sZWZ0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWluUHJvY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5Qcm9jZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZXIoJCgnLnNsaWRlcl9fYnV0dG9uLXJpZ2h0JyksICdkb3duJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlU2xpZGVyKCQoJy5zbGlkZXJfX2J1dHRvbi1sZWZ0JyksICd1cCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlcigkKCcuZGlzcGxheV9fYmxvY2snKSwgJ2Rvd24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZXIoJCgnLm15d29ya3NfX2xlZnQnKSwgJ2Rvd24nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlci0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnY291bnRlci00PScsY291bnRlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG59KSgpO1xuXG4kKGZ1bmN0aW9uICgpIHtcblxuICAgIC8vY29uc29sZS5sb2coJ9Cf0YDQuNCy0LXRgi3RjyDQt9Cw0L/Rg9GB0YLQuNC70LDRgdGMINC40LcgZnVuY3Rpb249Jyk7XG4gICAgc2xpZGVyLnVwSW5pdCgpO1xuICAgIHNsaWRlci5kb3duSW5pdCgpO1xuXG59KTtcblxuLyogLS0tLS0tLS0tLS0tLS0gRU5EIHNsaWRlciAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qLS0tLS0tIEJsb2ctYWN0aXZlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG52YXIgbWVudSA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgbWVudUl0ZW0gPSAkKCcuaXRlbV9fbGluaycpLFxuICAgICAgICBtZW51TGlzdCA9ICQoJy5ibG9nX19saXN0JyksXG4gICAgICAgIG1lbnVGbGFnID0gJCgnLmJsb2dfX2ZsYWcnKSxcbiAgICAgICAgbGVmdENvbHVtbiA9ICQoJy5ibG9nX19jb250ZW50LWxlZnQnKSxcbiAgICAgICAgcmlnaHRDb2x1bW4gPSAkKCcuYmxvZ19fY29udGVudC1yaWdodCcpO1xuICAgICAgICAvL21lbnVCbG9nSXRlbSA9ICQoJy5ibG9nX19pdGVtJyk7XG5cbiAgICBjb25zb2xlLmxvZygnbWVudUl0ZW09JywgbWVudUl0ZW0pO1xuICAgIGNvbnNvbGUubG9nKCdtZW51TGlzdD0nLCBtZW51TGlzdCk7XG4gICAgLy9jb25zb2xlLmxvZygnbWVudUJsb2dJdGVtPScsbWVudUJsb2dJdGVtKTtcbiAgICBjb25zb2xlLmxvZygnbGVmdENvbHVtbi0xPScsIGxlZnRDb2x1bW4pO1xuICAgIGNvbnNvbGUubG9nKCdyaWdodENvbHVtbi0xPScsIHJpZ2h0Q29sdW1uKTtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgc2V0QWN0aXZlOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG1lbnVJdGVtLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgbWVudUl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtZW51SXRlbS0zPScsIHRoaXMpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgZml4ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSAge1xuXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IDQwMCkge1xuICAgICAgICAgICAgICAgICAgICBtZW51TGlzdC5hZGRDbGFzcygnYmxvZ19fbGlzdF9maXhlZCcpO1xuICAgICAgICAgICAgICAgICAgICBtZW51RmxhZy5hZGRDbGFzcygnYmxvZ19fZmxhZ19maXhlZCcpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdwb3NTY3JvbGw9JywgJCh3aW5kb3cpLnNjcm9sbFRvcCgpKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnbWVudUxpc3QtMj0nLCBtZW51TGlzdCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbWVudUxpc3QucmVtb3ZlQ2xhc3MoJ2Jsb2dfX2xpc3RfZml4ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgbWVudUZsYWcucmVtb3ZlQ2xhc3MoJ2Jsb2dfX2ZsYWdfZml4ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncG9zU2Nyb2xsPScsICQod2luZG93KS5zY3JvbGxUb3AoKSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ21lbnVMaXN0LTM9JywgbWVudUxpc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmbGFnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBtZW51RmxhZy5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbGVmdENvbHVtbi0yPScsIGxlZnRDb2x1bW4pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxlZnRDb2x1bW4uY3NzKCdkaXNwbGF5JykgPT0gJ2Jsb2NrJykge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0Q29sdW1uLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgLy9yaWdodENvbHVtbi5yZW1vdmVDbGFzcygnYmxvZ19fY29udGVudC1yaWdodF9hY3RpdmUtbWVudScpO1xuICAgICAgICAgICAgICAgICAgICByaWdodENvbHVtbi5jc3MoJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgICAgICAgICAgICAgICAgLy9tZW51QmxvZ0l0ZW0uY3NzKCdwYWRkaW5nLXJpZ2h0JywgJzE1cHgnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2xlZnRDb2x1bW4tMj0nLCBsZWZ0Q29sdW1uLmNzcygnZGlzcGxheScpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JpZ2h0Q29sdW1uLTI9JywgcmlnaHRDb2x1bW4uY3NzKCd3aWR0aCcpKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnbWVudUJsb2dJdGVtLTItMT0nLCBtZW51QmxvZ0l0ZW0uY3NzKCdwYWRkaW5nLXJpZ2h0JykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnRDb2x1bW4uc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAvL3JpZ2h0Q29sdW1uLmFkZENsYXNzKCdibG9nX19jb250ZW50LXJpZ2h0X2FjdGl2ZS1tZW51Jyk7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0Q29sdW1uLmNzcygnd2lkdGgnLCAnNzUlJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsZWZ0Q29sdW1uLTM9JywgbGVmdENvbHVtbi5jc3MoJ2Rpc3BsYXknKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyaWdodENvbHVtbi0zPScsIHJpZ2h0Q29sdW1uLmNzcygnd2lkdGgnKSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ21lbnVCbG9nSXRlbS0zLTE9JywgbWVudUJsb2dJdGVtLmNzcygncGFkZGluZy1yaWdodCcpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cbiAgICB9O1xuXG5cbn0pKCk7XG5cbiAkKGZ1bmN0aW9uICgpIHtcbiAgICAgY29uc29sZS5sb2coJ21lbnVJdGVtLTE9JywgMSk7XG4gICAgIG1lbnUuc2V0QWN0aXZlKCk7XG4gICAgIG1lbnUuZml4ZWQoKTtcbiAgICAgbWVudS5mbGFnKCk7XG4gICAgIC8vY29uc29sZS5sb2coJ21lbnVJdGVtLTI9JyxtZW51LnNldEFjdGl2ZSgpKTtcblxuIH0pO1xuXG4vKiAtLS0tLS0tLS0tIEJMVVIgZm9yIGZvcm0gcGFnZV93b3Jrcy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG5cblxuLyog0JzQvtC00YPQu9GMINC00LvRjyDQv9GA0LXQu9C+0LDQtNC10YDQsCAtIHByZWxvYWRlciAgKi9cblxuXG52YXIgcHJlbG9hZGVyPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBwZXJjZW50c1RvdGFsID0wLFxuICAgICAgICBwcmVsb2FkZXIgPSAkKCcucHJlbG9hZGVyJyk7XG5cbiAgICAgICAgdmFyIGltZ1BhdGggPSQoJyonKS5tYXAoZnVuY3Rpb24gKG5keCwgZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIGJhY2tncm91bmQgPSQoZWxlbWVudCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyksIC8vINC/0YPRgtGMINC6INC60LDRgNGC0LjQvdC60LUg0LIgYmFja2dyb3VuZC1pbWFnZVxuICAgICAgICAgICAgICAgIGltZyA9ICQoZWxlbWVudCkuaXMoJ2ltZycpLFxuICAgICAgICAgICAgICAgIHBhdGggPSAnJztcbiAgICAgICAgICAgIGlmIChiYWNrZ3JvdW5kICE9ICdub25lJykge1xuICAgICAgICAgICAgICAgIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsJycpLnJlcGxhY2UoJ1wiKScsJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGltZykge1xuICAgICAgICAgICAgICAgIHBhdGggPSAkKGVsZW1lbnQpLmF0dHIoJ3NyYycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhdGgpIHJldHVybiBwYXRoO1xuXG4gICAgICAgIH0pO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdwYXRoPScsIGltZ1BhdGgpO1xuICAgICAgICB2YXIgc2V0UGVyY2VudHMgPSBmdW5jdGlvbiAodG90YWwsIGN1cnJlbnQpIHtcbiAgICAgICAgICAgIHZhciBwZXJjZW50cyA9IE1hdGguY2VpbChjdXJyZW50L3RvdGFsICoxMDApO1xuICAgICAgICAgICAgJCgnLnByZWxvYWRlcl9fcGVyY2VudHMnKS50ZXh0KHBlcmNlbnRzICsgJyUnKTtcbiAgICAgICAgICAgIGlmIChwZXJjZW50cyA+PTEwMCkge1xuICAgICAgICAgICAgICAgIHByZWxvYWRlci5mYWRlT3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBsb2FkSW1hZ2VzID0gZnVuY3Rpb24gKGltYWdlcykge1xuICAgICAgICAgICAgaWYgKCFpbWFnZXMubGVuZ3RoKSBwcmVsb2FkZXIuZmFkZU91dCgpO1xuICAgICAgICAgICAgaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24gKGltZywgaSwgaW1hZ2VzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZha2VJbWFnZSA9ICQoJzxpbWc+Jyx7XG4gICAgICAgICAgICAgICAgICAgIGF0dHI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogaW1nXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgZmFrZUltYWdlLm9uKCdsb2FkIGVycm9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwZXJjZW50c1RvdGFsKys7XG4gICAgICAgICAgICAgICAgICAgIHNldFBlcmNlbnRzKGltYWdlcy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncGF0aD0nLCBpbWdQYXRoKTtcbiAgICAgICAgICAgICAgICB2YXIgaW1hZ3MgPSBpbWdQYXRoLnRvQXJyYXkoKTtcbiAgICAgICAgICAgICAgICBsb2FkSW1hZ2VzKGltYWdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxufSgpKTtcblxuJChmdW5jdGlvbiAoKSB7XG4gICAgcHJlbG9hZGVyLmluaXQoKTtcbiAgICAvL2NvbnNvbGUubG9nKCfQn9GA0LjQstC10YIt0Y8g0LfQsNC/0YPRgdGC0LjQu9Cw0YHRjCDQuNC3IHByZWxvYWRlcj0nKTtcbiAgICAvL3NsaWRlci5pbml0KCk7XG5cbn0pO1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBFTkQgcHJlbG9hZGVyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuLyog0JzQvtC00YPQu9GMINC00LvRjyBoYW1idXJnZXIgICovXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICQoJyNoYW1idXJnZXInKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJywgZmFsc2UpO1xuICAgICAgICAgICQoJy5mdWxsLXNjcmVlbi1tZW51JykuY3NzKCdkaXNwbGF5Jywnbm9uZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnLCB0cnVlKTtcbiAgICAgICAgICAkKCcuZnVsbC1zY3JlZW4tbWVudScpLmNzcygnZGlzcGxheScsJ2Jsb2NrJyk7XG4gICAgICB9XG4gIH0pO1xufSk7XG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEVORCBodW1idXJnZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbi8qINCc0L7QtNGD0LvRjCDQtNC70Y8g0L/QsNGA0LDQu9C70LDQutGB0LAg0L/QviDRgdC60YDQvtC70LvRgyDQvdCwINGB0YLRgNCw0L3QuNGG0LDRhSBhYm91dCwgd29ya3MsIGJsb2cgLSDQtNC70Y8g0YHQtdC60YbQuNC4IC0gaGVybyAgKi9cbnZhciBwYXJhbGF4ID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVyb19fYmcnKTsgLy8g0LTQu9GPINC60LDRgNGC0LjQvdC60Lgg0LIg0LfQsNCz0L7Qu9C+0LLQutC1XG4gICAgdmFyIHVzZXI9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXIuaGVyb19fdXNlci1ibG9jaycpOyAvLyDQtNC70Y8g0LHQu9C+0LrQsCAtINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjyAtIHVzZXItYmxvY2tcbiAgICB2YXIgc2VjdGlvblRleHQgPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLXRpdGxlJyk7IC8vINC00LvRjyBQb3J0Zm9saW9cblxuICAgIHZhciBiZ19ibG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm8tYmxvZ19fYmcnKTsgLy8g0LTQu9GPINC60LDRgNGC0LjQvdC60Lgg0LIg0LfQsNCz0L7Qu9C+0LLQutC1IG9uIHBhZ2UtYmxvZ1xuICAgIHZhciB1c2VyX2Jsb2c9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXIuaGVyby1ibG9nX191c2VyLWJsb2NrJyk7IC8vINC00LvRjyDQsdC70L7QutCwIC0g0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPIC0gdXNlci1ibG9ja1xuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBtb3ZlOiBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XG4gICAgICAgICAgICB2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsLyAtc3RyYWZlQW1vdW50ICsgJyUnO1xuXG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsJytzdHJhZmUrJywwKSc7XG5cbiAgICAgICAgICAgIHZhciBzdHlsZSA9IGJsb2NrLnN0eWxlO1xuXG4gICAgICAgICAgICBzdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG4gICAgICAgICAgICBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG5cbiAgICAgICAgfSxcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcbiAgICAgICAgICAgIGlmIChiZyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlKGJnLCB3U2Nyb2xsLCA0NSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlKHNlY3Rpb25UZXh0LCB3U2Nyb2xsLCAzMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlKHVzZXIsIHdTY3JvbGwsIDMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJnX2Jsb2cgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZShiZ19ibG9nLCB3U2Nyb2xsLCA0NSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlKHVzZXJfYmxvZywgd1Njcm9sbCwgMyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH07XG59KCkpO1xuXG53aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cbiAgICBwYXJhbGF4LmluaXQod1Njcm9sbCk7XG5cbiAgICAvL2NvbnNvbGUubG9nKCfQrdGC0L4g0Y8gLSDQn9GA0LjQstC10YIhINCc0L7RkSDQv9C+0LvQvtC20LXQvdC40LUg0L3QsCDRgdGC0YDQsNC90LjRhtC1PScsIHdTY3JvbGwpO1xuICAgIC8vY29uc29sZS5sb2coJ9Cf0YDQuNCy0LXRgi3RjyDQt9Cw0L/Rg9GB0YLQuNC70LDRgdGMINC40LcgcGFyYWxheF9zY3JvbGw9Jyk7XG4gICAgLy9zbGlkZXIuaW5pdCgpO1xufTtcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRU5EIHBhcmFsbGF4IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuLyog0JzQvtC00YPQu9GMINC00LvRjyDQv9Cw0YDQsNC70LvQsNC60YHQsCDQv9C+INC00LLQuNC20LXQvdC40Y4g0LzRi9GI0LrQuCDQvdCwINGB0YLRgNCw0L3QuNGG0LUgd2VsY29tINC4INCw0LLRgtC+0YDQuNC30LDRhtC40LggICovXG5cbnZhciBwYXJhbGxheG1vdXNlID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGFyYWxsYXhDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFyYWxsYXgnKSxcbiAgICBsYXllcnMgPSBwYXJhbGxheENvbnRhaW5lci5jaGlsZHJlbjtcblxuICAgIHJldHVybiB7XG4gICAgICAgIG1vdmVMYXllcnM6IGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgICAgIHZhciBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aC8yKSAtIGUucGFnZVgsXG4gICAgICAgICAgICAgICAgaW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0LzIpIC0gZS5wYWdlWTtcblxuXG4gICAgICAgICAgICBbXS5zbGljZS5jYWxsKGxheWVycykuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIsIGkpIHtcbiAgICAgICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgICAgICAgZGl2aWRlciA9IGkvMTAwLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblggPSBpbml0aWFsWCAqIDIqZGl2aWRlcixcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25YID0gaW5pdGlhbFkgKiAyKmRpdmlkZXIsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvc2l0aW9uID0gKHdpbmRvdy5pbm5lckhlaWdodC8yKSAqIGRpdmlkZXIsXG4gICAgICAgICAgICAgICAgICAgIGxheWVyU3R5bGUgPWxheWVyLnN0eWxlO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoJyArIHBvc2l0aW9uWCsncHgsJyArIHBvc2l0aW9uWCsncHgsMCknO1xuICAgICAgICAgICAgICAgICAgICBsYXllclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJTdHlsZS5ib3R0b20gPSAnLScgKyBib3R0b21Qb3NpdGlvbiArICdweCc7XG5cbiAgICAgICAgICAgIH0pOyAvLyBlbmQgZm9yRWFjaFxuXG4gICAgICAgIH0gLy8gZW5kIG1vdmVsYXllcnNcbiAgICB9OyAvL2VuZCByZXR1cm5cbn0pKCk7IC8vZW5kIHBhcmFsbGF4bW91c2Vcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHBhcmFsbGF4bW91c2UubW92ZUxheWVycyk7XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRU5EIHBhcmFsbGF4bW91c2UgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cblxuLyotLS0tLS0gQmxvZy1hY3RpdmUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKlxudmFyIG1lbnUgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgbGVmdENvbHVtbiA9ICQoJy5ibG9nX19jb250ZW50X2xlZnQnKSxcbiAgICAgICAgcmlnaHRDb2x1bW4gPSAkKCcuYmxvZ19fY29udGVudF9yaWdodCcpLFxuICAgICAgICBtZW51TGlzdCA9ICQoJy5ibG9nX19jb250ZW50X2xpc3QnKSxcbiAgICAgICAgbWVudUl0ZW0gPSAkKCcuYmxvZ19fY29udGVudF9saXN0LWl0ZW0nKSxcbiAgICAgICAgbWVudUljb24gPSAkKCcuYmxvZ19fY29udGVudF9saXN0LWljb24nKTtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgc2V0QWN0aXZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBtZW51SXRlbS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIG1lbnVJdGVtLnJlbW92ZUNsYXNzKCdhY3RpdmUtbGluaycpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZS1saW5rJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBmaXhlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpICB7XG5cbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gOTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lbnVMaXN0LmFkZENsYXNzKCdibG9nX19jb250ZW50X2xpc3RfZml4ZWQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtZW51TGlzdC5yZW1vdmVDbGFzcygnYmxvZ19fY29udGVudF9saXN0X2ZpeGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZmxhZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbWVudUljb24ub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAobGVmdENvbHVtbi5jc3MoJ2Rpc3BsYXknKSA9PSAnYmxvY2snKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnRDb2x1bW4uaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICByaWdodENvbHVtbi5yZW1vdmVDbGFzcygnYmxvZ19fY29udGVudF9yaWdodF9hY3RpdmUtbWVudScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnRDb2x1bW4uc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICByaWdodENvbHVtbi5hZGRDbGFzcygnYmxvZ19fY29udGVudF9yaWdodF9hY3RpdmUtbWVudScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG5cbmlmICgkKCcuYmxvZycpKSB7XG4gICAgbWVudS5zZXRBY3RpdmUoKTtcbiAgICBtZW51LmZpeGVkKCk7XG4gICAgbWVudS5mbGFnKCk7XG59O1xuXG4vKi0tLS0tLSBFTkQgQmxvZy1hY3RpdmUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cblxuXG5cblxuXG4vKi0tLS0tLS0tLS0tLS0tIHNsaWRlciBmb3IgcGFnZS13b3JrcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKlxudmFyIHNsaWRlcj0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY291bnRlciA9IDEsXG4gICAgICAgIGR1cmF0aW9uID0zMDA7XG4gICAgY29uc29sZS5sb2coJ2NvdW50ZXI9Jyxjb3VudGVyKTtcbiAgICB2YXIgbW92ZVNsaWRlciA9IGZ1bmN0aW9uIChjb250YWluZXIsIGRpcmVjdGlvbikge1xuICAgICAgICAvL3ZhciBpdGVtcyA9IGNvbnRhaW5lci5maW5kKCcuYnV0dG9uX19pdGVtJylcbiAgICAgICAgdmFyIGl0ZW1zID0kKCcuYnV0dG9uX19pdGVtJywgY29udGFpbmVyKSxcbiAgICAgICAgICAgIGFjdGl2ZUl0ZW0gPWl0ZW1zLmZpbHRlcignLmFjdGl2ZScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FjdGl2ZUl0ZW09JyxhY3RpdmVJdGVtKTtcbiAgICAgICAgdmFyIHJlZ0l0ZW0gPWl0ZW1zLmVxKGNvdW50ZXIpOyAvL9C80LXRgtC+0LQgZXEg0L/QtdGA0LXQsdC40YDQsNC10YIg0L/QvtC/0L7RgNGP0LTQutGDINC80LDRgdGB0LjQslxuXG4gICAgICAgIGFjdGl2ZUl0ZW0uYW5pbWF0ZWQoIHtcbiAgICAgICAgICAgICd0b3AnOiAnMTAwJSdcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChwYXJhbSkge1xuICAgICAgICAgICAgICAgICQoJy5zbGlkZXJfX2J0bnMtcmlnaHQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlLnByZXZlbnREZWZhdWx0KCk9JyxlLnByZXZlbnREZWZhdWx0KCkpO1xuICAgICAgICAgICAgICAgICAgICBtb3ZlU2xpZGVyKCQoJy5idXR0b25fX2l0ZW0nKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgXG59KCkpO1xuXG5cbiQoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc29sZS5sb2coJ9Cf0YDQuNCy0LXRgi3RjyDQt9Cw0L/Rg9GB0YLQuNC70LDRgdGMINC40LcgZnVuY3Rpb249Jyk7XG4gICAgc2xpZGVyLmluaXQoKTtcblxufSk7XG5cblxuJCgnLnNsaWRlcl9fYnRucy1sZWZ0Jykub24oJ2NsaWNrJyxmdW5jdGlvbiAoZSkge1xuICAgIGNvbnNvbGUubG9nKFwi0J/RgNC40LLQtdGCLSEhISFcIik7XG59KVxuXG7Qv1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKCfQn9GA0LjQstC10YIt0Y8g0LfQsNC/0YPRgdGC0LjQu9Cw0YHRjCDQuNC3IHdvcmtzPScpO1xuICAgIC8vYWxlcnQoJ9Cf0YDQuNCy0LXRgi3RjyDQt9Cw0L/Rg9GB0YLQuNC70LDRgdGMINC40Lcgd29ya3Mtd3JhcGVyPScpO1xuXG4gICAgc2xpZGVyLmluaXQoKTtcbn0pO1xuXG5cbi8vcHJlbG9hZGVyID0gJCgnLnByZWxvYWRlcicpO1xuaWYoJCgnLm15d29ya3MnKSl7XG4gICAgY29uc29sZS5sb2coJ9Cf0YDQuNCy0LXRgi3RjyDQt9Cw0L/Rg9GB0YLQuNC70LDRgdGMINC40Lcgd29ya3Mtd3JhcGVyPScpO1xuICAgIHNsaWRlci5pbml0KCk7XG59XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coJ9Cf0YDQuNCy0LXRgi3RjyDQt9Cw0L/Rg9GB0YLQuNC70LDRgdGMINC40Lcgd29ya3Mtd2luZG93Lm9ubG9hZD0nKTtcbiAgICBzbGlkZXIuaW5pdCgpO1xufVxuXG4kKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnNvbGUubG9nKCfQn9GA0LjQstC10YIt0Y8g0LfQsNC/0YPRgdGC0LjQu9Cw0YHRjCDQuNC3IHdvcmtzMSDQv9C+ID0nKTtcbiAgICBzbGlkZXIuaW5pdCgpO1xuXG59KTtcblxuKi9cblxuXG5cbiJdfQ==
