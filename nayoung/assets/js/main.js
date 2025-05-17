$(document).ready(function() {
    // visual 영역스크롤 이미지변경 + 상단 배경색 전환 (이미지 완료 후)
    const frame = {
        count: 416
    }
    const $img = $('.sc-visual img');
    const visual = gsap.to(frame, { count: 457, snap: 'count', onUpdate: () => {
        gsap.set( $img, { 
                attr: { 
                    src: `./assets/images/seq/${frame.count}.webp`
                }
            }
        )
    }})
    
    ScrollTrigger.create({
        trigger: '#wrap',
        start: '0% 0%',
        end: '100% 0%',
        endTrigger: '.sc-visual',
        animation: visual,
        scrub: 1,
        // markers: true,
        onLeave: () => {
            gsap.to('.sc-main-p', {
                background: '#dfddd6'
            })
            gsap.to('.sc-main-p .title', {
                color: '#2b2b2b'
            })
        },
        onEnterBack: () => {
            gsap.to('.sc-main-p', {
                background: '#000'
            })
            gsap.to('.sc-main-p .title', {
                color: '#fff'
            })
        }
    })

    // 사이드에 p-name 회전
    const $mainProjectItem = $('.sc-main-p .group-project')

    $mainProjectItem.each(function(idx, project) {
        ScrollTrigger.create({
            trigger: project,
            start: 'top 50%',
            end: 'bottom 50%',
            toggleClass: {
                targets: $(project).closest('.wrap-grid').find('.p-name').eq(idx),
                className: 'active'
            },
        })
    })

    // 마우스움직임에따라 카드 3d
    $('.sc-sub-p .wrap-img').each((idx, item) => {
        const rotateXTo = gsap.quickTo($(item).find('.card'), "rotationX", { duration: 0.3, ease: "power3.out" });
        const rotateYTo = gsap.quickTo($(item).find('.card'), "rotationY", { duration: 0.3, ease: "power3.out" });

        $(item).on('mousemove', function(e) {
            let pointerX = -($(this).outerWidth() / 2 - e.offsetX) / 10,
                pointerY = ($(window).innerHeight() / 2 - e.clientY) / 10;
                //pageX, pageY는 문서 기준에서 마우스의 위치
                // clientX, clientY는 화면 기준에서 마우스의 위치
                // offsetX, offsetY는 이벤트 대상, $().on에 적은 기준에서 마우스의 위치
                rotateYTo(pointerX);
                rotateXTo(pointerY); 
        })
        $(item).on('mouseleave', function(e) {/* 영역밖으로 나가면 원래상태로 돌리기 */
                rotateYTo(0);
                rotateXTo(0); 
        })
    })

    // 하단 배경색 전환
    ScrollTrigger.create({
        trigger: '.sc-sub-p',
        start: '80% 0%',
        end: '100% 100%',
        // markers: true,
        onLeave: () => {
            gsap.to('.sc-sub-p,.sc-about, .sc-contact, #footer', {
                color: '#dfddd6',
                background: '#2b2b2b'
            })
            gsap.to('.sc-sub-p .shortcut-link', {
                color: '#dfddd6',
                borderColor: '#dfddd6'
            })
        },
        onEnterBack: () => {
            gsap.to('.sc-sub-p .shortcut-link', {
                color: '#dfddd6',
                borderColor: '#2b2b2b'
            })
            gsap.to('.sc-sub-p,.sc-about, .sc-contact, #footer', {
                color: '#2b2b2b',
                background: '#dfddd6'
            })
        }
    })

    // about 애니메이션
    const aboutTl = gsap.timeline()
    .fromTo('.sc-about .txt', {
        y: '100%',
        immediateRender: false, // 애니메이션이 중복 실행 시, 가장 최근에 애니메이션을 실행시키도록
    }, {
        y: '0%',
        stagger: {
            each: 0.1
        }
    })
    .fromTo('.sc-about .wrap-img', {
        clipPath: 'inset(0 100% 0 0)',
        immediateRender: false,
    }, {
        clipPath: 'inset(0 0% 0 0)',
        stagger: {
            each: 0.2
        }
    }, '<')

    ScrollTrigger.create({
        trigger: '.sc-about',
        start: '0% 80%',
        end: '100% 80%',
        animation: aboutTl,
        // markers: true,
        toggleActions: 'restart none none reverse' // enter leave enterback leaveback
    })
    
    
    // 화살표 애니메이션???
    ScrollTrigger.create({
        trigger: '.sc-about',
        start: 'top 50%',
        once: true,
        onEnter: () => {
            animation.screen.width = window.innerWidth;
            animation.screen.height = window.innerHeight;
            animation.setLineCenters(); // 필요하면 재계산
            // 추가로 필요한 초기화 작업 여기에
        }
    });





})