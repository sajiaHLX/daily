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
            clearTimeout(timer);

            phoneRender.init();
        }, 1500);
    }
    return {
        init: function () {
            $loadingBox.css('display', 'block');
            run(done);
            maxDelay(done);
        }
    }
})();

/* phone */
let phoneRender = (function () {
    let $phoneBox = $('.phoneBox'),
        $time = $phoneBox.find('span'),
        $answer = $phoneBox.find('.answer'),
        $answerMarkLink = $answer.find('.markLink'),
        $hang = $phoneBox.find('.hang'),
        $hangMarkLink = $hang.find('.markLink'),
        answerBell = $('#answerBell')[0],
        introduction = $('#introduction')[0];

    /* 点击answermark */
    let answerMarkTouch = function answerMarkTouch() {
        //1.remove answer
        $answer.remove();
        answerBell.pause();
        $(answerBell).remove(); //=>一定要先暂停播放然后再移除，否则即使移除了浏览器也会播放着这个声音

        //2.show hang
        $hang.css('transform', 'translateY(0rem)');
        $time.css('display', 'block');
        introduction.play();
        computedTime();
    };

    //计算播放时间
    let autoTimer = null;
    let computedTime = function computedTime() {
        //=>我们让AUDIO播放,首先会去加载资源,部分资源加载完成才会播放,才会计算出总时间DURATION等信息,所以我们可以把获取信息放到CAN-PLAY事件中
        autoTimer = setInterval(() => {
            let val = introduction.currentTime,
                duration = introduction.duration;
            if (val >= duration) {
                clearInterval(autoTimer);
                closePhone();
                return;
            }
            let minute = Math.floor(val / 60),
                second = Math.floor(val - minute * 60);
            minute = minute < 10 ? '0' + minute : minute;
            second = second < 10 ? '0' + second : second;
            $time.html(`${minute}:${second}`);
        }, 1000);
    }

    //关闭phone
    let closePhone = function closePhone() {
        clearInterval(autoTimer);
        introduction.pause();
        $(introduction).remove();
        $phoneBox.remove();

        messageRender.init();
    }
    return {
        init: function () {
            $phoneBox.css('display', 'block');
            //播放bell
            answerBell.play();
            answerBell.volume = 0.3;
            $answerMarkLink.tap(answerMarkTouch);
            $hangMarkLink.tap(closePhone)

        }
    }
})();

/* message */
let messageRender = (function () {
    let $messageBox = $('.messageBox'),
        $wrapper = $messageBox.find('.wrapper'),
        $messageList = $wrapper.find('li'),
        $keyBoard = $messageBox.find('.keyBoard'),
        $textInp = $keyBoard.find('span'),
        $submit = $keyBoard.find('.submit'),
        demonMusic = $('#demonMusic')[0];

    let step = -1, //当前展示信息的索引
        total = $messageList.length + 1, //记录的是信息的总数
        autoTimer = null,
        interval = 1500; //记录信息出来的间隔时间
    //展示信息
    let tt = 0;
    let showMessage = function showMessage() {
        ++step;
        if (step === 2) {
            //=>已经展示两条了:此时我们暂时结束自动信息发送，让键盘出来，开始执行手动发送
            clearInterval(autoTimer);
            handleSend();
            return;
        }
        let $cur = $messageList.eq(step);
        $cur.addClass('active');
        if (step >= 5) {
            //=>展示的条数已经是五条及以上了,此时我们让WRAPPER向上移动(移动的距离是新展示这一条的高度)
            //=>JS中基于CSS获取TRANSFORM，得到的结果是一个矩阵
            let curH = $cur[0].offsetHeight;
            tt -= curH;
            $wrapper.css('transform', `translateY(${tt}px)`);
        }
        if (step >= total - 1) {
            //=>展示完了
            clearInterval(autoTimer);
            closeMessage();
        }
    };

    //手动发送
    let handleSend = function handleSend() {
        $keyBoard.css({
            transform: 'translateY(0)'
        }).one('transitionend', () => {
            //=>TRANSITION-END:监听当前元素TRASITION动画结束的事件(并且有几个样式属性改变，并且执行了过渡效果，事件就会被触发执行几次 =>用ONE方法做事件绑定,只会让其触发一次)
            let str = '好的，马上介绍！',
                n = -1,
                textTimer = null;
            textTimer = setInterval(() => {
                let orginHTML = $textInp.html();
                $textInp.html(orginHTML + str[++n]);
                if (n >= str.length - 1) {
                    //=>文字显示完成
                    clearInterval(textTimer);
                    $submit.css('display', 'block');
                }
            }, 100);
        });
    };
    //=>点击SUBMIT
    let handleSubmit = function handleSubmit() {
        //=>把新创建的LI增加到页面中第二个LI的后面
        $(`<li class="self">
            <i class="arrow"></i>
            <img src="img/zf_messageStudent.png" alt="" class="pic">
            ${$textInp.html()}
        </li>`).insertAfter($messageList.eq(1)).addClass('active');
        $messageList = $wrapper.find('li'); //=>重要:把新的LI放到页面中,我们此时应该重新获取LI，让MESSAGE-LIST和页面中的LI正对应，方便后期根据索引展示对应的LI

        //=>该消失的消失
        $textInp.html('');
        $submit.css('display', 'none');
        $keyBoard.css('transform', 'translateY(3.7rem)');

        //=>继续向下展示剩余的消息
        autoTimer = setInterval(showMessage, interval);
    };

    //关掉message区域
    let closeMessage = function closeMessage() {
        let delayTimer = setTimeout(() => {
            demonMusic.pause();
            $(demonMusic).remove();
            $messageBox.remove();
            clearTimeout(delayTimer);

            cubeRender.init();
        }, interval);
    };

    return {
        init: function () {
            $messageBox.css('display', 'block');
            //=>加载模块立即展示一条信息,后期间隔INTERVAL在发送一条信息
            showMessage();
            autoTimer = setInterval(showMessage, interval);

            //=>SUBMIT
            $submit.tap(handleSubmit);
            console.log(demonMusic);
            //=>MUSIC
            demonMusic.play();
        }
    }
})();

/* cube */
let cubeRender = (function () {
    let $cubeBox = $('.cubeBox'),
        $cube = $('.cube'),
        $cubeList = $cube.find('li');

    //手指控制旋转
    let start = function start(ev) {
        //记录手指按住时的起始坐标位置
        let point = ev.changedTouches[0];
        this.strX = point.clientX;
        this.strY = point.clientY;
        this.changeX = 0;
        this.changeY = 0;
    }
    let move = function move(ev) {
        //用最新的手指位置-起始的位置，记录x和y轴的偏移量
        let point = ev.changedTouches[0];
        this.changeX = point.clientX - this.strX;
        this.changeY = point.clientY - this.strY;
    }
    let end = function end(ev) {
        let {
            changeX,
            changeY,
            rotateX,
            rotateY
        } = this,
        isMove = false;
        //验证是否发生移动（判断滑动误差）
        Math.abs(changeX) > 10 || Math.abs(changeY) > 10 ? isMove = true : null;
        //只有发生移动是才处理
        if (isMove) {
            //1.左右滑=>CHANGE-X=>ROTATE-Y (正比:CHANGE越大ROTATE越大)
            //2.上下滑=>CHANGE-Y=>ROTATE-X (反比:CHANGE越大ROTATE越小)
            //3.为了让每一次操作旋转角度小一点，我们可以把移动距离的1/3作为旋转的角度即可
            rotateX = rotateX - changeY / 3;
            rotateY = rotateY + changeX / 3;
            //=>赋值给魔方盒子
            $(this).css('transform', `scale(0.6) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
            //=>让当前旋转的角度成为下一次起始的角度
            this.rotateX = rotateX;
            this.rotateY = rotateY;
        }
        ['strX', 'strY', 'changeX', 'changeY'].forEach(item => this[item] = null);
    }
    return {
        init: function () {
            $cubeBox.css('display', 'block');

            //手指操作cube，让cube跟着旋转
            let cube = $cube[0];
            cube.rotateX = -35;
            cube.rotateY = 35; //记录初始的旋转角度【存储到自定义属性】
            $cube.on('touchstart', start).on('touchmove', move).on('touchend', end);
        }
    }
})();

/* detail */
let detailRender = (function () {
    let $detailBox = $('.detailBox'),
        swiper = null;
    let swiperInit = function swiperInit() {
        swiper = new Swiper('.swiper-container', {
            //这里放你需要实现的效果
            effect: "coverflow",
            // loop:true
            // freeMode: true,
            // slidesPerView: 'auto',
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            onInit:(swiper)=>{
                //切换动画成功执行的回调函数（参数是当前初始化的实例）
            },
            onTransitonEnd:(swiper)=>{
                //切换动画完成执行的回调函数
            }
        });
        /* 
         *实例的私有属性：
         *1.activeIndex：当前展示的slide块的索引
         *2.slides：获取所有的slide（数组）
         *....
         *实例的公有方法
         *1.slideTo：切换到指定索引的slide
         *....
        */
    }
    return {
        init: function () {
            $detailBox.css('display', 'block');
            swiperInit();
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
    case 'message':
        messageRender.init();
        break;
    case 'cube':
        cubeRender.init();
        break;
    case 'detail':
        detailRender.init();
        break;
    default:
        loadingRender.init();
}