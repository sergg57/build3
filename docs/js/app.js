
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



