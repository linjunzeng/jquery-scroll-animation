;(function($){
    $.extend({
        'ScrollAnimation': function(el, opt){
            return new ScrollAnimation(el, opt)
        }
    })

    function ScrollAnimation(el, opt){
        // 合并参数
        var options = $.extend({
            // 动画滚动元素
            scrollBox: '#scroll-box',
            // 距离顶部触发动画距离
            space: 100,
            // 动画元素列表
            animationList: []
        }, opt)
        
        this.$el = $(el)
        this.$scrollBox = $(options.scrollBox)
        this.options = options
        this.isAnimating = false
        this.signScrollTop = ''

        this.init()
    }

    ScrollAnimation.prototype = {
        constructor: ScrollAnimation,
        init(){
            this._reset()
            setTimeout(() => {
                this._setElHeight()
                this._initAnimationList()
                this._bindScroll()
            }, 10)
        },
        // 刷新重置滚动条
        _reset(){
            $(window).scrollTop(0)
            this.$scrollBox.css('transform','translate(0, 0')
        },
        // 设置 $el height
        _setElHeight(height){
            this.$el.css('height', height || this.$scrollBox.height())

        },
        // 初始化动画元素列表
        _initAnimationList(){
            this.options.animationList.forEach(animation => {
                let $el = $(animation.el)
                
                animation.top = $el.offset().top
                animation.status = 'wait'
                animation.index = 1
            })
        },
        // 绑定滚动事件
        _bindScroll(){
            $(window).on('scroll', this._scroll.bind(this))
        },
        // 滚动事件
        _scroll(){
            let scrollTop = $(window).scrollTop()
            // 滚动方向
            // let scrollDirection = scrollTop - this.signScrollTop > 0 ? 'lower' : 'upper'
            
            let index = this._getTopIndex(scrollTop)
            
            if(index > -1){
                this._activeAnimation(index, 200)
                
                // 保持滚动条
                $(window).scrollTop(scrollTop - this.$scrollBox.offset().top)
            } else {
                this.$scrollBox.css('transform','translate(0, '+ -1 * scrollTop +'px)')
            }
            // 标记滚动高度 用于判断方向
            // this.signScrollTop = scrollTop
        },
        // 获取滚动所在的区间
        _getTopIndex(scrollTop, scrollDirection = 'lower'){
            let animationList = this.options.animationList,
                space = this.options.space
                index = -1;

            animationList.forEach((animation, key) => {
                let number = animation.top - space;
                
                if( animation.status === 'wait' && scrollDirection === 'lower' && scrollTop >= number) {
                    index = key
                    return false
                }
                /* if( animation.status === 'wait' && 
                    ((scrollDirection === 'lower' && scrollTop >= number) || 
                    (scrollDirection === 'upper' && scrollTop <= number))
                )
                {
                    index = key
                    return false
                } */
            })

            return index
        },
        // 执行动画
        _activeAnimation(index, delay){
            // 是否动画中
            if(this.isAnimating){
                return false
            }
            this.isAnimating = true

            let animation = this.options.animationList[index]
            animation.active({
                index: animation.index,
                done: () => {
                    setTimeout(() => {
                        animation.status = 'done'
                    }, delay)
                }
            })
            animation.index++

            setTimeout(() => {
                this.isAnimating = false
            }, delay)
        }
    }
})($)