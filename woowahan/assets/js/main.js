//sc-visual 스와이퍼
slide1 = new Swiper(".sc-visual .swiper", {
    slidesPerView: 1,
    loop: true,
    pagination: {
        el: ".sc-visual .swiper-pagination",
        clickable: true,
      },
});

//sc-card 스와이퍼
var slide2 = new Swiper(".sc-card .swiper", {
    slidesPerView: 'auto',
    loop: true,
    spaceBetween: 16,
    speed: 3000,

    autoplay: {
      delay: 0,
      disableOnInteraction: false, //사용자가 슬라이드를 터치하거나 마우스로 조작해도 autoplay가 계속 돌아감
    },

});
//sc-card 스와이퍼 hover시 autoplay멈춤.
$('.sc-card .swiper').hover(function(){
  slide2.autoplay.stop();
  // slide2.stopAutoplay();
}, function(){
  slide2.autoplay.start();
  // slide2.startAutoplay();
});


//sc-work 동영상 hover 시 버튼노출.
// $('.sc-work video').hover(function(){
//   $('.sc-work .btn-play').addClass('active');
// }, function(){
//   $('.sc-work .btn-play').removeClass('active');
// });
/* 이거는 css의 :hover로 간단하게 작성할 수 있었음ㅜ */

/* 
sc-work 동영상 버튼 클릭 시 
1. 버튼이미지 변경
2. 동영상 멈춤/처음부터재생.
*/
$('.sc-work .btn-play').click(function () {

  $(this).toggleClass('change');

  if ($(this).hasClass('change')) {
    $(".sc-work video").get(0).pause(); // 영상 일시정지
  } else {
    $(".sc-work video").get(0).currentTime = 0; // 처음으로 이동
    $(".sc-work video").get(0).play();          // 재생
  }

})

//sc-font 스와이퍼
slide3 = new Swiper(".sc-font .swiper", {
    
    slidesPerView: 'auto',
    loop: true,
    spaceBetween: 16,
    speed: 3000,
    allowTouchMove : false, // false시에 스와이핑이 되지 않으며 버튼으로만 슬라이드 조작이 가능

    autoplay: {
      delay: 0,
    },
});