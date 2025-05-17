$(document).ready(function() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({
        ease:'linear'
    })

    // 부드러운스크롤
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time)=>{
      lenis.raf(time * 500)
    })
    gsap.ticker.lagSmoothing(0);

    // $(window).on('resize', function(){
    //   ScrollTrigger.refresh();
    // })






  // 헤더클리시 영역이동 애니메이션
  $('.gnb-item a, #header .logo').on('click', function(e) {
      e.preventDefault();
      const target = $(this).attr('href');
      const offset = $(this).attr('data-offset');

      lenis.scrollTo(target, {
          offset: offset ? offset : -80, // offset 값이 있으면 그 값 사용 아니면 -80
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
  });
    
  const splitTitle = new SplitType('[data-text="chars"]', { types: 'chars'}); 

  const $logo = $('#header .logo');

  // gsap 미디어쿼리 처리
  // 질문 선생님한테
  // 로고 줄어드는 애니메이션
  const mm = gsap.matchMedia();
  mm.add('(min-width: 769px)', () => {
    gsap.to($logo, {
      // fontSize: '2rem',
      ease:'power2',
      scale: 0.2,
      scrollTrigger: {
          trigger: '#wrap',
          start: 'top top',
          end: 'top top',
          endTrigger: '.sc-visual',
          // markers: true,
          scrub: 1,
      }
    })
  })
  mm.add('(max-width: 768px)', () => {
    gsap.to($logo, {
      ease:'power2',
      scale: 0.5,
      scrollTrigger: {
          trigger: '#wrap',
          start: 'top top',
          end: 'top top',
          endTrigger: '.sc-visual',
          // markers: true,
          scrub: 1,
      }
    })
  })

  
  // gnb 나타나게하는 애니메이션
  ScrollTrigger.create({
    trigger: '.sc-visual',
    start: '0% 0%',
    end: '100% 0%',
    endTrigger: '#footer', // 영역 설정을 visual top에서 footer bottom까지 설정
    toggleClass: {
      targets: '.gnb',
      className: 'active'
    }
  })

  // 메인 타이틀 글자간격 줄어드는 애니메이션
  const $mainTitle = $('.title[data-text="chars"]');
  $mainTitle.each((idx, titleItem) => {
      const $mainTitleChar = $(titleItem).find('.char');
      ScrollTrigger.create({
        trigger: titleItem,
        start: 'top 90%',
        end: 'bottom 90%',
        animation: gsap.to($mainTitleChar, {
            margin: 0,
            delay: .3,
            ease: 'power2.inOut',
        }),
        toggleActions: 'restart none none reverse'
      })
  })
})