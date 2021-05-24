;(function($){
    $.extend({
        'scrollAnimation': function(options){
            return new ScrollAnimation(options)
        }
    })

    function ScrollAnimation(options){
        if(options === null || Object.keys(options).length === 0){
            console.error('options is null');
            return {}
        }
        
        this.scrollEl = $(options.scrollEl)
        this.animationList = options.animationList
        this.islockScroll = false
        this.scrollTop = 0
        this.init()
    }

    ScrollAnimation.prototype = {
        constructor: ScrollAnimation,
        // 初始化
        init: function(){
            let _this = this;

            this.infoInit()

            this.scrollEl.scroll(throttle(function(event){
                _this.scroll(event)
            }, 1000))
        },
        // 数据初始化
        infoInit: function(){
            this.animationList.forEach(animation => {
                // 没找到元素报错
                if(!$(animation.el).length){
                    console.error('bind el is not find');
                    return false
                }
                // 距离顶部高度
                animation.top = $(animation.el).offset().top

                // 初始化状态
                animation.status = 'wait'

                // 初始化状态
                animation.index = 0
            });
        },
        // 滚动监听
        scroll: function(event){
            var scrollTop = this.scrollEl.scrollTop()

            // 筛选符合条件
            var animationInfo = this.animationList.filter(animation => {
                return scrollTop >= animation.top - 200 && animation.status === 'wait'
            })[0] || null


            if(animationInfo){
                // 锁定滚动条
                this.islockScroll = true
                this.scrollTop = animationInfo.top

                animationInfo.eventList[animationInfo.index]()
                animationInfo.index++
                if(animationInfo.index === animationInfo.eventList.length){
                    // 完成 动画区域 事件后修改状态
                    animationInfo.status = 'success'

                    // 解锁滚动条
                    this.islockScroll = false
                    this.scrollTop = 0
                }
            }  
            
            if(this.islockScroll){
                this.scrollEl.scrollTop(this.scrollTop)
                event.stopPropagation()
                return false;
            }
        }
    }

    // 节流
    function throttle(fn, delay){
        var valid = true;

        return function(){
            var context = this,
                args = arguments;

            if(valid){
                valid = false;
                setTimeout(function(){
                    fn.apply(context, args)
                    valid = true;
                }, delay)
            } else {
                return false
            }
        }
    }
})($)