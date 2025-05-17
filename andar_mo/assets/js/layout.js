//띠배너 스와이퍼
slide2 = new Swiper(".main-header .swiper", {
    slidesPerView: 1,
    loop: true,
    autoplay: {
        delay: 9000, 
        // 슬라이드가 자동으로 전환되기까지의 시간 간격
    },
    
  });

//헤더 변환
$(window).scroll(function() {
    let b = 0;
    // 스크롤 값
    curr = $(this).scrollTop();
    target = $('#container').offset().top;

    if (curr > target) {
        $('#header .main-header').addClass('scroll');
    }else{
        $('#header .main-header').removeClass('scroll');
    }

})

//플로팅 버튼
let lastScroll = 0; /* 재할당해야함 */
$(window).scroll(function() {
    curr = $(this).scrollTop();

    if (curr > 0) {    /* 상단에 닿았을 때는 사라지게 함 */
        if (curr > lastScroll) {
            // console.log('내림');
            $('.fix-btns').removeClass('show');
        } else {
            // console.log('올림');
            $('.fix-btns').addClass('show');
        }
        lastScroll = curr;
    }else{
        $('.fix-btns').removeClass('show');
    }
})
//플로팅 버튼 탑 기능
$('.btn-top').click(function(){
    $('html, body').animate({scrollTop : 0}, 800);
});

    
//gnb 드롭
$('.btngnb-all').click(function() {
    $('#gnb').toggleClass('active');
    $('.all-menu').stop().slideToggle();
})

//햄버거버튼 클릭
$('.btn-hamburger').click(function() {
    $('.hamburger,html,body,.dimmed').addClass('open');
})
$('.hamburger .close, .dimmed').click(function(e) {
    e.preventDefault();
    
    $('.hamburger,html,body,.dimmed').removeClass('open');
})
//햄버거내부 아코디언 depth1
$('.link-depth1').click(function(e) {
    e.preventDefault();

    $(this).toggleClass('on');
    $(this).siblings('.depth2-list').stop().slideToggle();
})
//햄버거내부 아코디언 depth2
$('.link-depth2').click(function(e) {
    e.preventDefault();

    $(this).toggleClass('on');
    $(this).siblings('.depth3-area').stop().slideToggle();
})

//돋보기버튼 클릭
$('.btn-search').click(function(e) {
    e.preventDefault();

    $('.search,html,body').addClass('show'); /* html,body에도 .show해주는 이유 : 밑 레이어 스크롤 없애기 */
})
$('.prev').click(function(e) {
    e.preventDefault();

    $('.search,html,body').removeClass('show');
})