// 첫모션
// const introVisual = gsap.timeline({
// })
// introVisual.set(".sc-visual video", {
//     clipPath: "inset(30% 40% 30% 40%)",
// })
// introVisual.to('.sc-visual video',{
//     clipPath: "inset(0% 0% 0% 0%)",
// })
const visualText = gsap.timeline({
    // onComplete:function(){ /* 해당timeline이 끝난 후 실행할 것. */
    //     lenis.start();
    // }
})
visualText.to('.sc-visual .visual-title',{
    delay:1, /* 화면이 가려진 초기상태로 1초 보여진 후 실행됨. */
    autoAlpha:1, /* = opacity: 1; , visibility: visible; */
})
visualText.to('.sc-visual .visual-title .first .char',{ /* 글자한개 선택 */
    // delay:1, 
    yPercent:-100,
    stagger:0.1, /* 글자 한개씩 동작 */
    onStart:function(){
        $('.sc-visual video').addClass('start') /* clip-path 변경해주는 클래스 */
    },
})
visualText.to('.sc-visual .visual-title .last .char',{ 
    yPercent:-100,
    stagger:0.1,
},"<")

// 두번째모션
gsap.to('.sc-visual .grid .col',{
    scrollTrigger:{
        trigger: ".visual-wrapper", /* wrapper는 500vh */
        start: "0% 0%",
        end: "100% 100%",
        // markers: true,
        scrub: 0,
    },
    // 여기에 이제 실행할 모션작성
    "clip-path": "inset(0% 0% 0% 0%)", /* width: "100%", :  clip-path를 width로 하는 방법   */
    stagger: 0.1, /* 왼쪽부터 한개씩 동작 */
})

// 세번째모션
gsap.to('.sc-slogun h2 span',20,{ /* 20초동안 애니메이션을 실행하겠다. */
    xPercent: -100,
    repeat:-1, /* 무한반복 */
    ease:"linear",
})
// + 가속이 붙는 느낌 구현 (위에서 span을 컨트롤해줬으므로 이건 부모인 h2를 컨트롤하도록 함)
gsap.to('.sc-slogun h2',{
    scrollTrigger:{
        trigger: ".sc-slogun",
        start: "0% 100%", /* 섹션이 시작할때,끝날때를 의미 */
        end: "100% 0%",
        // markers: true,
        scrub: 0,
    },
    xPercent:-40,
})
// + 블러효과 (블러가 되었다가 돌아왔다가 하려면 -> timeline으로 짜야한다? -> 'yoyo: true'로 수정)
// const textBlur = gsap.timeline({})
gsap.to('.sc-slogun h2 .char',{
    filter: 'blur(10px)',
    duration: 1,
    stagger: {
        each: .3,
        repeat:-1,
        yoyo: true
    },
})
// textBlur.to('.sc-slogun h2 .char',{
//     filter: 'blur(0px)',
//     stagger: 0.1,
// })


// 네번째모션
// 근데 모션은 없고 스크롤'이벤트'만 주고싶다.(이벤트만 만들려고 썼다.) : 모션이라함은 CSS적 요소를 말하는것.
// $('.sc-project .project-item').each((idx, item) => {
//     ScrollTrigger.create({
//         trigger: item,
//         start: "0% 50%",
//         end: "100% 50%",
//         markers: true,
//         toggleClass: {
//             targets: $('.sc-project .project-img').eq(idx), 
//             className: "active"
//         }, /* link-side 보여주는 클래스 */
//         // onUpdate:function(self) { /* 스크롤 위치에 따라 원하는 동작을 실시간으로 업데이트할 수 있는 기능 */
//         //     // console.log(self); /* self는 현재 ScrollTrigger의 상태 정보를 담고 있음 */
//         //     idx = Math.floor(self.progress*2) /* 소수점을 떨굼 */
//         //     console.log(idx); /* 0/1/2 */
//         //     $('.sc-project .sticky .project-img').removeClass('active');
//         //     $('.sc-project .sticky .project-img').eq(idx).addClass('active');
//         // },
//     })
// })

ScrollTrigger.create({
    trigger: ".sc-project",
    start: "0% 100%",
    end: "100% 100%",
    toggleClass:"show", /* link-side 보여주는 클래스 */
    onUpdate:function(self) { /* 스크롤 위치에 따라 원하는 동작을 실시간으로 업데이트할 수 있는 기능 */
        // console.log(self); /* self는 현재 ScrollTrigger의 상태 정보를 담고 있음 */
        idx = Math.floor(self.progress*2) /* 소수점을 떨굼 */
        console.log(idx); /* 0/1/2 */
        $('.sc-project .sticky .project-img').removeClass('active');
        $('.sc-project .sticky .project-img').eq(idx).addClass('active');
    },
})
/* 
// sc-project의 link-side 노출 jquery로 구현 시도
$(window).on('scroll', function() {
    let windowTop = $(window).scrollTop(); // jquery 버전 스크롤 탑 구하기
    let projectTop = $('.sc-project').offset().top; // 1700
    let projectBottom = projectTop + $('.sc-project').outerHeight() - $(window).outerHeight(); // 4400
    const linkSide = $('.sc-project .link-side');

    // console.log('window',windowTop);
    // console.log('project top',projectTop);
    // console.log('project bottom',projectBottom);
    
    if (windowTop >= projectTop && windowTop < projectBottom) {
        linkSide.css('transform', 'translateX(0%)')
    } else {
        linkSide.css('transform', 'translateX(100%)')
    }
})
 */

// 다섯번째모션
gsap.from('.sc-project .project-img.first',{
    scrollTrigger:{
        trigger: ".sc-project",
        start: "0% 100%", /* 트리거 요소의 top이 뷰포트의 bottom에 닿을 때 시작 */
        end: "0% 0%", /* 트리거 요소의 bottom이 뷰포트의 top에 닿을 때 시작 */
        // markers: true,
        scrub: 0,
    },
    yPercent:-40,
})
gsap.to('.sc-project .project-img.last',{
    scrollTrigger:{
        trigger: ".sc-project",
        start: "100% 100%",
        end: "100% 0%",
        // markers: true,
        scrub: 0,
    },
    yPercent:40,
})

//여섯번째모션 : sc-sentence
gsap.from('.sc-sentence .char',{
    scrollTrigger:{
        trigger: ".sc-sentence",
        start: "0% 50%",
        end: "100% 50%",
        // markers: true,
        scrub: 0,
    },
    stagger: 0.1, 
    opacity:0.3,
})

//일곱번째모션 : sc-impact
hori = gsap.to('.sc-impact .flex-wrap',{
    scrollTrigger:{
        trigger: ".sc-impact",
        start: "0% 0%",
        end: "100% 100%",
        // markers: true,
        scrub: 0,
        invalidateOnRefresh:true,
    },
    xPercent:-100,
    ease:"linear",
    x:function(){
        return window.innerWidth;
    }
})
// + 횡스크롤에 대한 이벤트
$('.sc-impact .card-item').each(function(i,el) {
    // console.log(i);
    // console.log(el);
    ScrollTrigger.create({
        trigger: $(this),
        start: "0% 50%",
        end: "100% 50%",
        // markers: true, /* ease:"linear" 해줘야 정확한 시작점끝점을 파악할 수 있음. */
        containerAnimation:hori, 
        onEnter:function() { 
            $('.sc-impact .bg-img').removeClass('active');
            $('.sc-impact .bg-img').eq(i).addClass('active');
        },
        onLeaveBack:function() { 
            $('.sc-impact .bg-img').eq(i).removeClass('active');
            $('.sc-impact .bg-img').eq(i - 1).addClass('active');
        },
    })
})


//여덟번째모션 : sc-podcast = 세번째모션과 비슷
gsap.to('.sc-podcast h2 span',20,{ 
    xPercent: -100,
    repeat:-1, 
    ease:"linear",
})
gsap.to('.sc-podcast h2 .char',{
    filter: 'blur(10px)',
    duration: 1,
    stagger: {
        each: .3,
        repeat:-1,
        yoyo: true
    },
})


// 아홉번째
//스크롤 시에 이미지배경은 내려주고, 이미지위의 영역을 올리고 내려주기 = 다섯번째모션이랑 비슷
gsap.from('.sc-podcast .podcast-bottom .bg-background img',{
    scrollTrigger:{
        trigger: ".podcast-bottom",
        start: "0% 100%", 
        end: "100% 0%", 
        // markers: true,
        scrub: 0,
    },
    yPercent:-30,
})
gsap.to('.sc-podcast .podcast-bottom .card-group .card-area:first-child',{
    scrollTrigger:{
        trigger: ".podcast-bottom",
        start: "0% 50%",
        end: "100% 50%",
        // markers: true,
        scrub: 0,
    },
    yPercent:-25,
})
gsap.from('.sc-podcast .podcast-bottom .card-group .card-area:last-child',{
    scrollTrigger:{
        trigger: ".podcast-bottom",
        start: "0% 100%",
        end: "100% 0%",
        // markers: true,
        scrub: 0,
    },
    yPercent:-25,
})

// 열번째
const path = $('.sc-podcast .stroke .path');
path.each((idx, path) => {
    const pathLength = $(path)[0].getTotalLength();

    gsap.set(path, {
        strokeDashoffset: pathLength,
        strokeDasharray: pathLength,
    })
})
const pathTl = gsap.timeline({ repeat: -1})
const topTl = gsap.timeline().to($('.sc-podcast .stroke.top .path'), {
    duration: 1,
    strokeDashoffset: 0,
})
const lowerTl = gsap.timeline().to('.sc-podcast .stroke.lower .path', {
    duration: 1,
    strokeDashoffset: 0,
})

pathTl /* topTl 애니메이션이 끝난 후에 lowerTl 애니메이션이 실행되게 하려고 함. */
.add(topTl)
.add(lowerTl)




// sc-impact hover시 카드에 글자나타남 효과주기
$('.sc-impact .card-item').hover(
    function() {
      // 마우스 들어왔을 때
      $(this).addClass('hover');
    },
    function() {
      // 마우스 나갔을 때
      $(this).removeClass('hover');
    }
  );