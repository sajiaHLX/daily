/* header */
let headerRender = (function () {
    let $header = $('.headerBox'),
        $navMenu = $header.find('.navMenu'),
        $navBox = $('.navBox');

    let handleTap = function handleTap() {
        // $navBox.stop().slideToggle(200);//zepto和jQ不完全一样，zep中只实现了部分的jQ方法
        let isShow = $navBox.css('display');
        if (isShow === 'none') {
            $navBox.css('display', 'block');
            return;
        } else {
            $navBox.css('display', 'none');
        }
    }
    return {
        init: function () {
            $navMenu.tap(handleTap);
        }
    }
})();
headerRender.init();

/* bannner */
let bannerRender = (function () {
    let $bannerBox = $('.bannerBox'),
        $wrapper = $bannerBox.find('.swiper-wrapper');

    let queryData = function queryData() {
        return new Promise(resolve => {
            $.ajax({
                url: "banner.json",
                dataType: 'json',
                success: resolve
            })
        });
    };
    let bindHTML = function bindHTML(result) {
        let str = ``;
        result.forEach(item => {
            let {img,desc} = item;
            str += `<div class="swiper-slide">
                    <img src="${img}" alt="">
                    <p>${desc}</p></div>`;
        });
        $wrapper.html(str);
        $bannerBox.css('display', 'block');
    };
    let swiperInit=function swiperInit(){
        let swiper=new Swiper('.bannerBox',{
            loop:true,
            autoplay:{
                autoplay:true,
                disableOnInteraction:false
            },
            pagination:{
                el:'.swiper-pagination',
                type:'fraction'
            }
        });
    } 
    return {
        init: function () {
            let Promise = queryData();
            Promise.then(bindHTML)
                .then(swiperInit);
        }
    }
})();
bannerRender.init();

/* message */
let messageRender = (function () {
    let $messageBox = $('.messageBox'),
        $wrapper = $messageBox.find('.swiper-wrapper');

    let queryData = function queryData() {
        return new Promise(resolve => {
            $.ajax({
                url: "aside.json",
                dataType: 'json',
                success: resolve
            })
        });
    };
    let bindHTML = function bindHTML(result) {
        let str = ``;
        result.forEach(item => {
            let {title,link} = item;
            str += `<div class="swiper-slide">
            <a href="${link}">${title}</a>
            </div>`;
        });
        $wrapper.html(str);
        $messageBox.css('display', 'block');
    };
    let swiperInit=function swiperInit(){
        var mySwiper=new Swiper('.messageCon',{
            loop:true,
            autoplay:true,
            direction : 'vertical'
        });
    } ;
    return {
        init: function () {
            let promise = queryData();
            promise.then(bindHTML)
                .then(swiperInit);
        }
    }
})();
messageRender.init();
