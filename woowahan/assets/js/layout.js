//헤더 스크롤
let lastScrollY = 0; // 이전 스크롤 위치를 변수에 담는다.
$(window).scroll(function() {
         
    curr = $(this).scrollTop(); 
    target = $('.sc-visual').offset().top;

    
    if (curr > target) { //스크롤 올리고 내리고 하는 동작을 target지점으로 잡아서 하고 싶음!
        
        if (curr > lastScrollY) { //스크롤 내릴 때
            $('#header').addClass('scroll');
        }
        else{ //스크롤 올릴 때
            $('#header').removeClass('scroll');
        }
    
        lastScrollY = curr;
    }
})

//헤더 랭귀지 클릭 시 볼드처리
$('.language').click(function () {
    $('.language').removeClass('active'); /* 1.클릭 시, 전체에서 빼고 */
    $(this).addClass('active');           /* 2.선택한 애만 넣기 */
})

//gnb 호버시 sub 노출
// $('.gnb-item').hover(
//     function () {
//         if ($(this).find('.sub-list').length > 0) {
//             $('#header').addClass('hov');
//             $(this).find('.sub-area').addClass('on')
//     }
// },
//     function () {
//         if ($(this).find('.sub-list').length > 0) {
//             $('#header').removeClass('hov');
//             $(this).find('.sub-area').removeClass('on')
//         }
//     });
// $('.sub-item').hover(
// function () {
//     $(this).addClass('active').siblings().removeClass('active')    
// },
// function () {
//     $(this).removeClass('active')
// })
// $('.sub-list').on('mouseleave', function() {
//     $(this).find('.sub-item').eq(0).addClass('active')
// })

//gnb 호버시 sub 노출
$('.link-gnb').on('mouseenter', function () {
    $('#header').removeClass('hov');
    $('.sub-area').removeClass('on');
    if ($(this).siblings().find('.sub-list').length > 0) {
        $('#header').addClass('hov');
        $(this).siblings('.sub-area').addClass('on')
    }
});
$('.gnb-list').on('mouseleave', function () {
    if ($(this).find('.sub-list').length > 0) {
        $('#header').removeClass('hov');
        $(this).find('.sub-area').removeClass('on')
    }
});
$('.sub-item').hover(
function () {
    $(this).addClass('active').siblings().removeClass('active')    
},
function () {
    $(this).removeClass('active');
    $(this).closest('.sub-area').find('.sub-item').eq(0).addClass('active')
})
    

//푸터 관련사이트 클릭 시, div노출 / 버튼회전
$('.btn-family').click(function () {
    $('.family-area').toggleClass('open'); 
    $('.btn-family').toggleClass('rotate'); 
})