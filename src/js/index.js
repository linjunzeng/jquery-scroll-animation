$(function(){
    let scrollInfo = $.scrollAnimation({
        scrollEl: window,
        animationList: [
            {
                el: '#block-1',
                eventList: [animationA, animationA]
            },
            {
                el: '#block-3',
                eventList: [animationB, animationB, animationB]
            }
        ]
    })
    function animationA(){
        var index = $('#block-1 .sign-box li.active').index() + 1
        var width = $('#block-1 .content-box li').width()
        
        $('#block-1 .sign-box li').eq(index).addClass('active').siblings().removeClass("active")
        $('#block-1 .content-box ul').animate({
            left: -1 * index * width
        })
    }
    function animationB(){
        var index = $('#block-3 .sign-box li.active').index() + 1
        var width = $('#block-1 .content-box li').width()
        
        $('#block-3 .sign-box li').eq(index).addClass('active').siblings().removeClass("active")
        $('#block-3 .content-box ul').animate({
            left: -1 * index * width
        })
    }
})