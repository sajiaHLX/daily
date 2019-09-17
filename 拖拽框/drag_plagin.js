~ function ($) {
    if (typeof $ === 'undefined') {
        throw new ReferenceError('插件使用需要JQuery!');
    }
    class Drag {
        constructor(ele, options) {
            if (typeof ele === 'undefined' || ele.nodeType !== 1) {
                throw new ReferenceError('必须传递一个对象参数');
            }
            let {
                selector = ele
            } = options;
            /* 
             *dragTarget :通过谁来移动
             *ele ：移动谁
             */
            this.ele = ele;
            this.dragTarget = selector;
            if (typeof selector === 'string') {
                //传递了一个选择器进来了，我们是想实现通过操作ele的某个元素让ele实现移动
                this.dragTarget = $(ele).find(selector)[0];
            }

            //dragStart:保证执行原型上的方法，方法中的this都是当前类的实例
            this.dragTarget.addEventListener('mousedown',this.down.bind(this));
        }

        //mouseDown
        down(ev) {
            this.starX=ev.clientX;
            this.starY=ev.clientY;

            this.starL=parseFloat($(this.ev).css('left'));
            this.starT=parseFloat($(this.ev).css('top'));

            this.MOVE=this.move.bind(this);
            this.UP=this.up.bind(this);

            document.addEventListener('mousemove',this.MOVE);
            document.addEventListener('mouseup',this.UP);

        }

        //mouseMove
        move(ev) {
            let {starX,starY,starL,starT}=this,
                curL=ev.clientX-starX+starL;
                curT=ev.clientY-starY+starT;
                $(this.ele).css({
                    top:curT,
                    left:curL
                })
        }

        //mouseup
        up() {
            document.removeEventListener('mousemove',this.MOVE);
            document.removeEventListener('mouseup',this.UP);

        }
    }
    window.Drag = Drag;
}(jQuery);
/* 
 *ele是当前实现拖拽的元素
 */
new Drag(ele, {
    selector: 'h3' //当前需要操作的目标元素选择器（按住它实现ele移动）（不传就默认按住ele移动）
});