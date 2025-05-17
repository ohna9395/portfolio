//sc-visual 스와이퍼
slide1 = new Swiper(".sc-visual .swiper", {
  slidesPerView: 1, 
  loop:true,
  autoplay:{
    delay:6000,
  },
  // allowTouchMove: false, 
  // 슬라이드를 마우스로 조작 안되게 함
});

//sc-people 스와이퍼
slide2 = new Swiper(".sc-people .swiper", {
    slidesPerView: 1, /* auto를 줄거면 swipoer-slide에 너비 설정이 되어있어야 한다. */
    spaceBetween: 30,
    
    navigation: {
        prevEl: ".prev",
        nextEl: ".next",
      },

    breakpoints: {
      1024: {
        slidesPerView: 1.1, // 1024px 이상일 때
      },
    }
  });

//sc-benefits 스와이퍼
slide3 = new Swiper(".sc-benefits .swiper", {
    slidesPerView: 1, /* auto를 줄거면 swipoer-slide에 너비 설정이 되어있어야 한다. */
    spaceBetween: 30,
    
    navigation: {
        prevEl: ".prev",
        nextEl: ".next",
      },

    breakpoints: {
      1024: {
        slidesPerView: 3, // 768px 이상일 때
      },
      768: {
        slidesPerView: 2, // 768px 이상일 때
      },
    }
  });

//select박스의 선택된 값 색상 변경
$('select').change(function(){
  $(this).css('color','#000');
})