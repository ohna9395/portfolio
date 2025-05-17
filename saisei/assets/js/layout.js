gsap.registerPlugin(ScrollTrigger); // gsap 관련 플러그인 등록
gsap.defaults({ // gsap은 default가 ease: 'ease'여서 linear로 두고 시작해야 오류를 덜 범할 수 있다
    ease: 'linear'
})

/* 부드러운 스크롤 */
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000); /* 부드럽게 하고싶을수록 낮은숫자 */
});
gsap.ticker.lagSmoothing(0);

function splitLinesInit() {
    const splitLine = new SplitType('.split-line', { types: 'lines' })
    const splitChars = new SplitType('.split-char', { types: 'chars' })
    $('.line').wrap('<div class="animation-hidden"></div>')
}
  
// 초기화 함수 호출
splitLinesInit();

// 리사이즈 이벤트에 대응하여 재초기화
$(window).resize(function() {
// 기존 SplitType으로 생성된 요소들 제거
SplitType.revert('.split-line')

// SplitType 다시 초기화
splitLinesInit();
});

// 헤더 스크롤 (.scroll은 헤더 숨기는 css)
let lastScrollY = 0;
$(window).on('scroll', function () {
    let curr = $(this).scrollTop();

    if (curr > lastScrollY) {
        // 스크롤을 내릴 때 -> 헤더 숨기기
        $('#header').addClass('scroll');
    } else {
        // 스크롤을 올릴 때 -> 헤더 다시 보이기
        $('#header').removeClass('scroll');
    }

    lastScrollY = curr;
});
// let lastScrollY = 0;
// $(window).scroll(function() {
//     curr = $(this).scrollTop(); // 현재 스크롤 값

//     if (curr > 0) { //스크롤 내릴 때
//         $('#header').addClass('scroll');
//         if (curr < lastScrollY) {
//             $('#header').removeClass('scroll');
//         }
//     } else {
//         // 스크롤이 무조건 0일때만 일어나는 곳
//     }
//     lastScrollY = curr;
// })


// 햄버거버튼 클릭 시, gnb 열림/닫힘
$('.btn-nav').click(function () {
    $('#gnb,body').addClass('show');

    const tl = gsap.timeline()
    .to('#gnb', {'--opacity': 1})
    //  양 옆에서 들어오는 애니메이션
    // 왼쪽 1번부터 7번까지 stagger로 아래서 올라오는 애니메이션
    // 
})
$('.btn-close').click(function () {
    $('#gnb,body').removeClass('show');
})

lenis.stop();
//인트로 화면
const pathLength = $('.intro-circle')[0].getTotalLength();

intro = gsap.timeline({
    onComplete:function() {
        $('.intro').remove(); // intro가 화면에 fixed로 떠있어서 없애야 버튼 요소가 눌림
        $('body').addClass('animation-start'); // header css 애니메이션
        mainVisual.play() // 메인 비주얼에 관련된 타임라인
        lenis.start() // 끝나면 스크롤 되게
    }
})
intro.set('.intro .intro-circle', {
    strokeDashoffset: 0,
    strokeDasharray: pathLength
})
intro.to('.intro .line-01', {
    yPercent(idx) {
        return idx % 2 === 0 ? 100 : -100
    },
    duration: 0.7,
})
intro.to('.intro .line-02', {
    yPercent(idx) {
        return idx % 2 === 0 ? 100 : -100
    },
    duration: 0.7,
}, '<')
intro.to('.intro .intro-circle', {
    opacity: 0,
    strokeDashoffset: pathLength,
    duration: 0.4
}, '-=0.4') // 0.4초 땡겨서 시작
intro.to('.intro .intro-path', {
    opacity: 0,
    duration: 0.4
}, '-=0.2')
intro.to('.intro .intro-inner', {
    xPercent(idx) {
        return idx % 2 === 0 ? -100 : 100
    },
    duration: 1,
    ease: "power2.out"
})


const mainVisual = gsap.timeline({
    paused: true
})
.to(".sc-visual .animation-hidden .line", {
    y: '0%',             // 아래에서 올라옴
    duration: 1,       // 지속시간
    ease: "power3.out", // 부드럽게
    stagger: 0.1       // 한 줄씩 순차적으로
});