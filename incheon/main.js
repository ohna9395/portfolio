// 헤더고정
$(window).scroll(function(){
    curr = $(this).scrollTop();
    target = $('.sc-info').offset().top;
    
    console.log("curr=" + curr + "," + "target=" + target );
    

    if (curr >= target) {
        $('#header').addClass('fix');
    } else {
        $('#header').removeClass('fix');
    }
})

slide1 = new Swiper('.sc-info .swiper',{
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
    navigation:{ /* 버튼 클릭해서 이동하는 옵션 */
        nextEl:".sc-info .next",
        prevEl:".sc-info .prev"
    },
    pagination:{ /* 이름만 넣어주면 요소가 생김 */
        el:".sc-info .swiper-pagination",
        type: 'fraction',
        // 인터넷에서 복붙( /만 -이걸로 고침 )
        renderFraction: function (currentClass, totalClass) {
            return `<span class="${currentClass}"></span> - <span class="${totalClass}"></span>`;
        },
    }
})

slide2 = new Swiper('.sc-board .swiper',{
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    navigation:{ /* 버튼 클릭해서 이동하는 옵션 */
        nextEl:".sc-board .next",
        prevEl:".sc-board .prev"
    },
    pagination:{ /* 이름만 넣어주면 요소가 생김 */
        el:".sc-board .swiper-pagination",
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
            return `<span class="${currentClass}"></span> - <span class="${totalClass}"></span>`;
        },
    }
})

slide3 = new Swiper(".sc-citizen .swiper", {
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    slidesPerView: 4,
    spaceBetween: 16,
    pagination: {
        el: ".sc-citizen .swiper-pagination",
        clickable: true,
    },
    navigation:{
        nextEl:".sc-citizen .next",
        prevEl:".sc-citizen .prev"
    },
  });

$('.btn.pause').click(function() {
    // 버튼이 포함된 swiper 요소 찾기
    swiperEl = $(this).closest('section').find('.swiper')[0]; // jquery 객체에서 dom요소를 찾으려면 .get(0) / [0]
    // swiper 인스턴스 가져오기
    swiperInstance = swiperEl.swiper; // dom요소를 찾아야 인스턴스를 찾을 수 있음

    if ($(this).hasClass('pause')) {
        $(this).removeClass('pause').addClass('play');
        swiperInstance.autoplay.stop();
    } else {
        swiperInstance.autoplay.start();
        $(this).removeClass('play').addClass('pause');
    }
})
  
// <!-- gnb hover 시 -->
$('.gnb-item').hover(function() { /* 선택자를 item(즉, list)로 잡는 이유 : 그 자식요소까지도 hover효과를 주기위해 필수 ! */
    $(this).addClass('show');
}, function() {
    $(this).removeClass('show');
})

//btn-top 스크롤탑버튼
$(document).ready(function() { // dom이 생성된 이후에 실행되어야할 코드 작성
    // Top 버튼 클릭시 페이지 상단으로 이동
   	$('.btn-top').click(function(){

    	$('html, body').animate({scrollTop : 0}, 800);
        /* return false; */ /* e.preventDefault(); 같은 역할*/
        /* 근데 a링크가 아니었어서 해줄 필요 없음. */
    });
 });


//footer 아코디언
 $('.family-link').click(function(e){
    e.preventDefault();

    $('.family-link').not($(this)).removeClass('on').siblings('.family-content').stop().slideUp();
    $(this).toggleClass('on').siblings('.family-content').stop().slideToggle(); 
})

$('.modal-toggle').click(function() {
    let target = $(this).data('target');
    
    $(target).removeClass('modal-close');
    $('html, body').addClass('hidden')
})

$('.modal .close').click(function() {
    $(this).closest('.modal').addClass('modal-close');
    $('html, body').removeClass('hidden')
})