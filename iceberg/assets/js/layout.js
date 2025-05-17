gsap.registerPlugin(ScrollTrigger);

/* 글자 쪼개기 */
const headTxt = new SplitType('[data-text="chars"]', { types: 'words, chars', }); 
/* 부드러운 스크롤 */
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000); /* 부드럽게 하고싶을수록 낮은숫자 */
});
gsap.ticker.lagSmoothing(0);
// lenis.stop();   /* 스크롤정지 -> 첫모션끝난 후 실행시켜줄 예정 */
/* 새로고침시 상단으로 */
// history.scrollRestoration = "manual"



// 글자 하이라이트 모션
gsap.from('.sc-contact .char',{
    scrollTrigger:{
        trigger: ".sc-contact",
        start: "0% 50%",
        end: "100% 100%",
        // markers: true,
        scrub: 0,
    },
    stagger: 0.1, 
    opacity:0.3,
})




