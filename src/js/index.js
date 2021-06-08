$(function(){
    let scrollInfo = $.ScrollAnimation('#main-box', {
        animationList: [{
            el: '#block2',
            active({index, done}){
                animationA(index, done)
            }
        },{
            el: '#block4',
            active({index, done}){
                animationB(index, done)
            }
        }]
    })

    console.log(scrollInfo);
    

    function animationA(index, done){
        if(index === 2){
            done()
        }
        
        var width = $('#block2 .content-box li').width()
        
        $('#block2 .sign-box li').eq(index).addClass('active').siblings().removeClass("active")
        $('#block2 .content-box ul').animate({
            left: -1 * index * width
        })
    }

    function animationB(index, done){
        if(index === 2){
            done()
        }
        var width = $('#block4 .content-box li').width()
        
        $('#block4 .sign-box li').eq(index).addClass('active').siblings().removeClass("active")
        $('#block4 .content-box ul').animate({
            left: -1 * index * width
        })
    }
})