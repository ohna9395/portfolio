//메인비주얼 스와이퍼
slide1 = new Swiper(".sc-visual .swiper", {
    slidesPerView: 1,
    effect: "fade",
    loop: true,
    pagination: {
        el: ".swiper-pagination",
      },
  });
//광고배너 스와이퍼
slide3 = new Swiper(".sc-ad .swiper", { 
    slidesPerView: 1,
    loop: true,
    autoplay: {
        delay: 5000, 
        // 슬라이드가 자동으로 전환되기까지의 시간 간격
    },
    pagination: {
        el: ".sc-ad .swiper-pagination", 
        type: "fraction",
        
      },
      
  });
//추천스타일 스와이퍼
slide4 = new Swiper(".sc-recomm .swiper", { 
    slidesPerView: 1.5,
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    pagination: {
        el: ".sc-recomm .swiper-pagination",
    },
      
  });

//탭
$('.link-bestgnb').click(function(e){
    e.preventDefault();

    tab = $(this).data('con');  /* #bestListAll */

    $('.link-bestgnb').removeClass('active');
    $(this).addClass('active');
    $(tab).addClass('show').siblings().removeClass('show');
    
    //console.log(tab);
})
