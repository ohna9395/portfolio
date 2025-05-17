//헤더 스크롤
$(window).scroll(function() {
    // 스크롤 값
    curr = $(this).scrollTop();
    target = $('.sc-visual').outerHeight();
    // gnb로 offset().top을 하면, gnb가 sticky라서 자신의 높이를 넘으면 스크롤값이 추가가됨
    // 그래서 curr보다 target의 값이 커져서 else 조건 밖에 충족이 안됨
    // 해결법!
    // 1. gnb포함 밑에 애들을 새로운 요소로 감싸고 그걸 offset().top으로 함
    // 2. sc-visual의 outerHeight()가 gnb의 offset().top과 같으니 그걸 사용

    if (curr > target) {
        $('#header').addClass('scroll');
    }else{
        console.log('false');
        $('#header').removeClass('scroll');
    }

})


//gnb버튼 클릭 시 스크롤 영역 이동
// $('a[href*="#"]').on('click',function(e){
//     e.preventDefault();

//     $('html,body').animate({scrollTop:
//         $($(this).attr('href')).offset().top -64
//     }, 500);
// });
$('.link-gnb').on('click',function(e){
    e.preventDefault();

    $('.link-gnb').removeClass('on');
    $(this).addClass('on');

    $('html,body').animate({scrollTop:
        $($(this).attr('href')).offset().top -64
    }, 500);
});
