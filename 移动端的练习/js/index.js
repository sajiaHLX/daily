/* loading */
let loadingRender = (function () {
    let $loadingBox = $('.loadingBox'),
        $current = $loadingBox.find('.current');
    let imgData = ["img/icon.png", "img/zf_concatAddress.png", "img/zf_concatInfo.png", "img/zf_concatPhone.png", "img/zf_course.png", "img/zf_course1.png", "img/zf_course2.png", "img/zf_course3.png", "img/zf_course4.png", "img/zf_course5.png", "img/zf_course6.png", "img/zf_cube1.png", "img/zf_cube2.png", "img/zf_cube3.png", "img/zf_cube4.png", "img/zf_cube5.png", "img/zf_cube6.png", "img/zf_cubeBg.jpg", "img/zf_cubeTip.png", "img/zf_emploment.png", "img/zf_messageArrow1.png", "img/zf_messageArrow2.png", "img/zf_messageChat.png", "img/zf_messageKeyboard.png", "img/zf_messageLogo.png", "img/zf_messageStudent.png", "img/zf_outline.png", "img/zf_phoneBg.jpg", "img/zf_phoneDetail.png", "img/zf_phoneListen.png", "img/zf_phoneLogo.png", "img/zf_return.png", "img/zf_style1.jpg", "img/zf_style2.jpg", "img/zf_style3.jpg", "img/zf_styleTip1.png", "img/zf_styleTip2.png", "img/zf_teacher1.png", "img/zf_teacher2.png", "img/zf_teacher3.jpg", "img/zf_teacher4.png", "img/zf_teacher5.png", "img/zf_teacher6.png", "img/zf_teacherTip.png"];

    /* 预加载图片 */
    let n = 0,
        len = imgData.length;
    let run = function run(callback) {
        imgData.forEach(item => {
            let tempImg = new Image;
            tempImg.onload = () => {
                tempImg = null;
                $current.css('width', ((++n) / len) * 100 + '%');

                //=>加载完成,执行回调函数（让当前loading页面消失）
                if (n == len) {
                    clearInterval(delayTimer);
                    callback && callback();
                }
            };
            tempImg.src = item;
        });
    };

    //=>设置最长等待时间（假设到达一个时间，加载量达到90%，可以直接访问内容，如果没到直接提示用户网络不好）
    let delayTimer = null;
    let maxDelay = function maxDelay(callback) {
        delayTimer = setTimeout(() => {
            if (n / len >= 0.9) {
                $current.css('width', '100%');
                callback && callback();
                return;
            }
            alert('非常遗憾当前网络不佳，请稍后再试');
        }, 6000);
    };

    //=>完成
    let done = function done() {
        let timer = setTimeout(() => {
            $loadingBox.remove();
        }, 1500);
    }
    return {
        init: function () {
            run(done);
            maxDelay(done);
        }
    }
})();
loadingRender.init();

/* phone */
let phoneRender = (function () {
    let $phoneBox=$('.phoneBox'),
        $time = $phoneBox.find('span');
    return {
        init:function(){

        }
    }
})();
/* 开发过程中，由于当前项目板块众多（每一个板块都是单例），我们最好规划一种机制：通过标识的判
 *断可以让程序只执行对应板块的内容，这样开发哪一个板块，我们就把标识改为啥（hash路由控制）
 */
let url = window.location.href; //获取当前页面的url地址 .url='xx'这样写是让其跳转到某一个页面
let well = url.indexOf('#'),
    hash = well === -1 ? null : url.substr(well + 1);
switch (hash) {
    case 'loading':
        loadingRender.init();
        break;
    case 'phone':
        phoneRender.init();
        break;
}