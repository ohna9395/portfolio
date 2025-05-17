//sc-visual 전체영상보기 버튼 클릭시 팝업 열기, 닫기
$('.sc-visual .btn-full').click(function () {
    $('html,body').addClass('dimmed');
    $('.video-dimmed').addClass('dimmed');
})
$('.video-dimmed .btn-close').click(function () {
    $('html,body').removeClass('dimmed');
    $('.video-dimmed').removeClass('dimmed');
})

gsap.registerPlugin(ScrollTrigger);// ScrollTrigger.defaults({
//     markers: true
//   });

// 1. 이미지가 스크롤 트리거로 돌아가는 것 구현
// 2. 이미지가 돌아가는 중에 특정 구간이 지나면 올라가는 애니메이션 구현
const frame = { /* gsap이 객체를 활용할 수 있으니까, 우선 숫자를 증감시킬 객체를 만든다. */
    count: 1 /* 초기값 */
}
const spinnerTl = gsap.timeline()
.to(frame, { count: 60, snap: 'count', onUpdate: () => {
    // COUNT가 1에서 60까지 커지는 동안(=onUpdate) 일어날 일 : img의 경로를 바꿔줄 것
    // snap: 'count' 를넣은 이유는 : 정수값으로 만들려고
    // `${}` 이걸로 열면 javascript 문법을 쓸 수 있음 '${}' 얘는 안됨
    // javascript 변수를 써줘서-> 변화하는 객체의 키값을 바꿔준것
    gsap.set('.sc-spinnerPhone .img-wrap img', 
        { attr: { src: `https://campaign-cdn.pstatic.net/0/campaign/2022/08/band-10th-anniversary/img/article/article01_${frame.count}.png`}}
    )
}})
// .to()
// .to()
// .to()
// .to()
// .to()

gsap.set('.sc-spinnerPhone .img-wrap', { y: 200})
// css로는 완성되었을때의 위치를 잡아놓으니까 애니메이션 시작전에 완성위치로 보여버림 그래서 애니매이션을 시작하기전에 다시 내려줘야함
ScrollTrigger.create({
    trigger: '.sc-spinnerPhone',
    start: '0% 0%',
    end: '100% 0%',
    // markers: true,
    animation: spinnerTl,  /* 만든 타임라인을 스크롤트리거의 애니메이션으로 사용! */
    scrub: 1, /* 드르르륵 움직이면서 변화도록 숫자가 커질수록 움직임이 부드러움 */ 
    onUpdate: (self) => { /* self.progress를 활용하여 진행률을 파악 -> [진행률을 기준]으로 추가 애니메이션을 구현 */
        // console.log(self.progress);
        if (self.progress > 0.1) {
            gsap.to('.sc-spinnerPhone .img-wrap', { y: 0})
        } else {
            gsap.to('.sc-spinnerPhone .img-wrap', { y: 200})
        }
        
    }
})

//sc-scrollIcon 모션
scrollIcon = gsap.to('.sc-scrollIcon .after',{
    'clip-path': 'inset(0% 0% 0% 0%)',
})
ScrollTrigger.create({
    trigger: '.sc-scrollIcon',
    start: '0% 50%',
    end: '100% 50%',
    scrub: 1,
    animation: scrollIcon,
    // markers: true,
})

// sc-userAge 스크롤시,이미지 올라옴
window.addEventListener("load", () => {
    gsap.set(".transition-wrap", { y:'80px' });
    gsap.to('.transition-wrap',{
        scrollTrigger:{
            trigger: ".sc-userAge",
            start: "0% 50%",
            end: "100% 50%",
            // markers: true,
            scrub: 1,
        },
        y:'0px',
    })
});

// 폭죽 로티 모션
var animationFirecracker = bodymovin.loadAnimation({
    container: document.getElementById('lottie-firecracker'),
    path: 'https://campaign-cdn.pstatic.net/0/campaign/2022/08/band-10th-anniversary/data/party_v2.json', // URL 직접 입력
    renderer: 'svg', // Required
    loop: true, // Optional
    autoplay: true // Optional
});
//스크롤에따라 위아래가 좌우로 이동하는 모션
const scrollMarqueeTl = gsap.timeline()
.to('.sc-scrollMarqee .top *', { x: 1000})
.to('.sc-scrollMarqee .bottom *', { x: -1000}, '<')

ScrollTrigger.create({
    trigger: '.sc-scrollMarqee',
    start: '0% 0%',
    end: '100% 0%',
    scrub: 1,
    animation: scrollMarqueeTl,
    // markers: true,
})

// 떨어지는공들 로티
var animationBall1 = bodymovin.loadAnimation({
    container: document.getElementById('lottie001'),
    path: 'https://campaign-cdn.pstatic.net/0/campaign/2022/08/band-10th-anniversary/data/age10_pc_v3.json',
    renderer: 'svg', 
    loop: false, 
    autoplay: false 
});
var animationBall2 = bodymovin.loadAnimation({
    container: document.getElementById('lottie002'),
    path: 'https://campaign-cdn.pstatic.net/0/campaign/2022/08/band-10th-anniversary/data/age20_pc_v3.json',
    renderer: 'svg', 
    loop: false, 
    autoplay: false 
});
var animationBall3 = bodymovin.loadAnimation({
    container: document.getElementById('lottie003'),
    path: 'https://campaign-cdn.pstatic.net/0/campaign/2022/08/band-10th-anniversary/data/age30_pc_v3.json',
    renderer: 'svg', 
    loop: false, 
    autoplay: false 
});
var animationBall4 = bodymovin.loadAnimation({
    container: document.getElementById('lottie004'),
    path: 'https://campaign-cdn.pstatic.net/0/campaign/2022/08/band-10th-anniversary/data/age40_pc_v3.json',
    renderer: 'svg', 
    loop: false, 
    autoplay: false 
});
var animationBall5 = bodymovin.loadAnimation({
    container: document.getElementById('lottie005'),
    path: 'https://campaign-cdn.pstatic.net/0/campaign/2022/08/band-10th-anniversary/data/age50_pc_v3.json',
    renderer: 'svg', 
    loop: false, 
    autoplay: false 
});
var animations = [animationBall1, animationBall2, animationBall3, animationBall4, animationBall5];

// 클릭이벤트 전 첫 번째 로티애니메이션만 재생
window.addEventListener('load', function () {
    if (animations[0].isLoaded) {
        animations[0].goToAndPlay(0, true);
    } else {
        animations[0].addEventListener('DOMLoaded', function handler() {
        animations[0].removeEventListener('DOMLoaded', handler);
        animations[0].goToAndPlay(0, true);
        });
    }
});
// sc-keyword 탭 클릭 시, slider의 위치이동 + 떨어지는공들 로티
$('.sc-keyword .tab-item').click(function() {
    index = $(this).index(); /* 번째 */
    width = $(this).outerWidth(); /* 한개당 너비 */

    $(this).addClass('active').siblings().removeClass('active');
    // $(this).parent('.sc-keyword').find('.content-area').addClass('show');
    
    gsap.to('.sc-keyword .slider',{
        x:index*width,
    })
    
    // 모든 content-area 숨기고 해당 인덱스만 보이게
    $('.tab-content .content-area').removeClass('show');
    $('.tab-content .content-area').eq(index).addClass('show');
    
    // animationBall1.stop();
    // animationBall1.play();
    animations.forEach(anim => anim.stop()); /* 모든 애니메이션 정지 */
    animations[index].goToAndPlay(0, true);  /* 클릭한 탭에 맞는 애니메이션만 재생 */
})


// sc-marquee 자동스와이퍼
slide3 = new Swiper(".sc-marquee .swiper", {
    slidesPerView: 'auto',
    loop: true,
    spaceBetween: 16,
    speed: 10000,
    allowTouchMove : false, // false시에 스와이핑이 되지 않으며 버튼으로만 슬라이드 조작이 가능

    autoplay: {
      delay: 0,
      disableOnInteraction: false, //스와이프 후 자동 재생
    },
});


// sc-local의 스와이퍼
const localSwiper = new Swiper('.sc-local .swiper', {
    slidesPerView: 1,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    direction: "vertical",
    allowTouchMove: false, // 슬라이드를 마우스로 조작 안되게 함

    // 2. swiper-slide가 loop로 active된게 바뀌면 tab button의 active도 같이 변경
    on: {
        slideChange: function() {
            // console.log(localSwiper.realIndex);
            // console.log(this.realIndex);
            // 현재active 슬라이드 3번째 (realIndex === 2) 세번째 tab-item에 active가 붙어야함
            // $('.tab-item').eq(2)
            $('.sc-local .tab-item').eq(this.realIndex).addClass('active').siblings().removeClass('active')
        }
    }
    // $().on('click')
    // $().click
})

// 1. tab 버튼 클릭시 swiper-slide 이동시키기
$('.sc-local .tab-item button').click(function() {
    // tab-item의 button은 하나라서 index가 0만 나옴
    // tab-item의 index를 찾아야함
    let idx = $(this).closest('.tab-item').index(); // 클릭한 버튼의 index
    localSwiper.slideToLoop(idx); // 슬라이드 이동시키는 함수
    // slideTo() 기본 || 옵션에 loop: true 인 경우 slideToLoop() 사용
})


// sc-bandYear스와이퍼
slide1 = new Swiper(".sc-bandYear .swiper", { 
    slidesPerView: 1,
    pagination: {
        el: ".sc-bandYear .swiper-pagination",
        clickable: true,
    },
    navigation:{
        nextEl:".sc-bandYear .next",
        prevEl:".sc-bandYear .prev"
    },
  });


//sc-story의 +버튼
$('.sc-story .btn').on('click',function(e){

    $('.sc-story .btn').removeClass('on');
    $(this).addClass('on');

    $('.sc-story .info-bubble').addClass('remove');
});
// sc-story스와이퍼
slide3 = new Swiper(".sc-story .swiper", { 
    slidesPerView: 1,
    pagination: {
        el: ".sc-story .swiper-pagination",
        clickable: true,
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' + ' / ' +
                  '<span class="' + totalClass + '"></span>';
        },
        formatFractionCurrent: function (number) {
            return number < 10 ? '0' + number : number;  // 현재 슬라이드 숫자에 0 추가
        }, 
        formatFractionTotal: function (number) {
            return number < 10 ? '0' + number : number;  // 전체 슬라이드 숫자에 0 추가
        }, 
    },
    navigation:{
        nextEl:".sc-story .next",
        prevEl:".sc-story .prev"
    },
});


// sc-event1스와이퍼
slide2 = new Swiper(".sc-event1 .swiper", { 
    slidesPerView: 3,
    spaceBetween: 40, /* spaceBetween주면 margin-right으로 들어간다. */
    pagination: {
        el: ".sc-event1 .swiper-pagination",
        clickable: true,
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' + ' / ' +
                  '<span class="' + totalClass + '"></span>';
        },
    },
    navigation:{
        nextEl:".sc-event1 .next",
        prevEl:".sc-event1 .prev"
    },
});





//notice내용 열고닫히기
$('.sc-notice .notice-title').on('click',function(){
    $(this).parent('.notice-cotent').toggleClass('open');
});

//btn-top 스크롤탑버튼
$(document).ready(function() { 

    // Top 버튼 특정 스크롤높이에서만 보이기 / 숨기기
    $(window).scroll(function(){
    	if($(this).scrollTop() > 100){
        	$('.btn-top').fadeIn();
        }else{
        	$('.btn-top').fadeOut();
        }
    });
    
    // Top 버튼 클릭시 페이지 상단으로 이동
   	$('.btn-top').click(function(){
    	$('html, body').animate({scrollTop : 0}, 800);
        return false;
    });
 });