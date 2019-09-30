let musicRender = (function () {
    let $headerBox=$('.headerBox'),
        $contentBox=$('.contentBox'),
        $footerBox=$('.footerBox'),
        $wrapper=$contentBox.find('.wrapper'),
        $lyricList=null,
        musicAudio=$('#musicAudio')[0],
        $playBtn=$headerBox.find('.playBtn'),
        $already = $footerBox.find('.already'),
        $duration = $footerBox.find('.duration'),
        $current = $footerBox.find('.current');


    //计算content区域的高度
        let computedContent=function computedContent(){
        let winH = document.documentElement.clientHeight,
            font = parseFloat(document.documentElement.style.fontSize);
        $contentBox.css({
            height: winH - $headerBox[0].offsetHeight - $footerBox[0].offsetHeight - 0.8 * font
        });
    }

    //获取歌词
    let queryLyric=function queryLyric(){
        return new Promise(resolve=>{
            $.ajax({
                url:'json/lyric.json',
                method:'GET',
                dataType:'json',
                async:'true',
                success:resolve
            })
        });
    };

    //绑定歌词
    let bindHtml=function bindHtml(lyricAry){
        let str=``;
        lyricAry.forEach(item=>{
            let {minutes,seconds,content} =item;
            str +=`<p data-minutes="${minutes}" data-seconds="${seconds}">${content}</p>`;
            //数据绑定的时候把歌词对应得分钟秒设置为自定义属性存储起来，后期需要直接调用
        });
        $wrapper.html(str);
        $lyricList=$wrapper.find('p');
    };

    //开始播放
    let $plan=$.Callbacks();
    let playRun=function playRun(){
        musicAudio.play();
        musicAudio.addEventListener('canplay',$plan.fire);//能够播放了
    };

    //控制暂停播放
    $plan.add(()=>{
        $playBtn.css('display','block').addClass('move');

        $playBtn.tap(()=>{
            if(musicAudio.paused){
                //判断是否为暂停状态，是暂停我们让其播放
                musicAudio.play();
                $playBtn.addClass('move');
                return;
            }
            musicAudio.pause();
            $playBtn.removeClass('move');
        });
    });

    //控制进度条
    let autoTimer=null;
    $plan.add(()=>{
        let duration=musicAudio.duration;
        $duration.html(computedTime(duration));

        //随时监听播放状态
        autoTimer=setInterval(()=>{
            let currentTime=musicAudio.currentTime;
            if(currentTime>=duration){
                //=>播放完成
                clearInterval(autoTimer);
                $already.html(computedTime(duration));
                $current.css('width','100%');
                musicAudio.pause();
                $playBtn.removeClass('move');
                return;
            }
            $already.html(computedTime(currentTime));
            $current.css('width',currentTime/duration*100+'%');
            matchLyric(currentTime);
        },1000);
    })

    //计算时间
    let computedTime=function computedTime(time){
        let minutes=Math.floor(time/60),
            seconds=Math.floor(time-minutes*60);
        minutes<10?minutes='0'+minutes:null;
        seconds<10?seconds='0'+seconds:null;
        return `${minutes}:${seconds}`;
    };

    //匹配实现歌词对应
    let translateY=0;
    let matchLyric=function matchLyric(currentTime){
        //currentTime:已经播放的时间
        let [minutes,seconds]=computedTime(currentTime).split(':');

        //在歌词集合中筛选出我们想要展示的
        let $cur = $lyricList.filter(`[data-minutes="${minutes}"]`).filter(`[data-seconds="${seconds}"]`);
        if($cur.length===0) return;
        if($cur.hasClass('active')) return;//=>当前歌词已经被选中了(例如：这句歌词可能需要五秒才能播放完成，我们定时器监听五次，第一次设置后，后面四次不需要重新设置了)

        let index = $cur.index();
        $cur.addClass('active')
            .siblings().removeClass('active');
        if (index >= 4) {
            //=>已经对应超过四条歌词了,接下来每当对应一条都让WRAPPER向上移动一行
            let curH = $cur[0].offsetHeight;
            translateY -= curH;
            $wrapper.css('transform', `translateY(${translateY}px)`);
        }
    }

    return {
        init:function(){
            computedContent();
            let promise=queryLyric();
            promise.then(result=>{
                //格式化数据
                let {lyric=''}=result,
                    obj={
                        32:' ',
                        40:'(',
                        41:')',
                        45:'-'
                    }
                lyric=lyric.replace(/&#(\d+);/g,(...arg)=>{
                    let [item,num]=arg;
                    item=obj[num]||item;
                    return item;
                });
                return lyric;//上一个then方法中返回的结果会作为下一个then的实参传递过去
            }).then(lyric=>{
                //这次处理获得分钟秒歌词
                lyric+='&#10;'; //向歌词末尾追加一个符号，不然匹配不到最后一句话
                let lyricAry=[];
                    reg=/\[(\d+)&#58;(\d+)&#46;\d+\]([^&#]+)&#10/g;
                lyric.replace(reg,(...arg)=>{
                    let [,minutes,seconds,content]=arg;
                    lyricAry.push({
                        minutes,
                        seconds,
                        content
                    });
                });
                return lyricAry;
            }).then(bindHtml)
            .then(playRun)
        }
    }
})();
musicRender.init();