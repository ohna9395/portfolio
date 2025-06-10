$(document).ready(function() {
    AOS.init({
      duration: 1000,
    })

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

    //모바일로 열었을 시, 주소표시줄때문에 깜빡이는거 잡는 코드
    // 100vh가 주소표시줄에 따라 달라져서
    // 고정된 px값으로 변환
    function setVhUnit() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setVhUnit();/* 처음 한번 실행시키고 */

    let prevWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      const currentWidth = window.innerWidth;
      if (currentWidth !== prevWidth) {
        prevWidth = currentWidth;
        // 주소표시줄이 사라질때 세로의 높이가 달라져서 그것도 리사이즈로 인식해서 그건 제외하려고
        setVhUnit(); /* 리사이즈 될때마다 실행시키고! 단, 주소표시줄을 제외한 가로값만 체크하여 리사이즈한다 */
      }
    });


  // 헤더클리시 영역이동 애니메이션
  $('.gnb-item a, #header .logo a').on('click', function(e) {
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
})