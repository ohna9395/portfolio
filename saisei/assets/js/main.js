// * onEnter 트리거와 scrub 트리거 총 2개 필요하겠다!
//부드러운 스크롤 추가필요

// header및 section내의 요소들 각 방향대로 움직이면서 나타남
$(window).on('load', function() {
    

    // gsap은 자바스크립트 써주는게 좋음
    const aniSection = document.querySelectorAll('.sc-animation'); /* 전체 section 찾기=querySelectorAll */
    aniSection.forEach((section, index) => {
        // 각 section 아래 이미지와 트리거 요소 찾기
        const trigger = section.querySelector('.inner'); /* querySelector: 자식을 찾는 거 */
        const img = section.querySelectorAll('.animation-img');
        const text = section.querySelectorAll('.line');
        const button = section.querySelectorAll('.link-detail');
    
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: trigger,
                start: '0% 50%', // 'trigger 요소의 top0, 화면의 시작점'
                end: '100% 50%', // 'trigger 요소의 bottom0, 화면의 끝점'
                // markers: true,
            }
        })
        .to(text, {
            y: '0%',
            stagger: {
                amount: .5 /*each로 각각 주게되면 시간이 너무 오래걸리므로, 총 실행시간을 지정한다. (0.5초 안에 각각 실행되도록 한 것)  */
            }
        }, '<')
        if (img.length) {
            tl.to(img, { // tl을 안 쓰면, 조건문 안에 있기 때문에 .to라는 것을 인지하지 못해. 그렇다고 gsap.to로 적기에는 scrollTrigger를 공유할 수 없어. 그래서 gsap timeline의 변수로 씀
                clipPath: 'inset(0 0% 0 0)',
                stagger: {
                    each: .5 /* img를 querySelectorAll로 찾았기때문에 여러개일 수 있음 */
                }
            })
            img.forEach((imgArea, idx) => {
                gsap.to(imgArea.children, {
                    yPercent: 30,
                    scrollTrigger: {
                        trigger: imgArea,
                        start: '0% 100%',
                        end: '100% 0%',
                        // markers: true,
                        scrub: 0,
                    }
                })
            })
        }
        if (button.length) { // 요소의 개수를 반환하는 javascript 함수
            tl.to(button, {
                opacity : 1,
                duration: 2
            }, '<')
        }
    
        // ScrollTrigger.create({
        //     trigger: '',
        //     start: '',
        //     end: '',
        //     animation: tl,
        //     markers: true,
        // })
    })
    

    const projectSection = document.querySelectorAll('.group-project');
    projectSection.forEach((section, index) => {
        const img = section.querySelector('.bg-img');
        const text = section.querySelectorAll('.line');
        const button = section.querySelectorAll('.link-detail');
        // ScrollTrigger.create({
        //     trigger: section,
        //     start: '0% 0%',
        //     end: '100% 100%',
        //     animation: gsap.to(),
        //     markers: true,
        // })
        gsap.to(img, {
            y: '0%',
            scrollTrigger: {
                trigger: section,
                start: '0% 0%',
                end: '100% 0%',
                // markers: true,
                scrub: 0,
                onEnter: () => {
                    gsap.to(text, {
                        y: '0%',
                        stagger: {
                            each: .2
                        }
                    })
                    gsap.to(button, {
                        opacity: 1,
                    })
                }
            }
        })
    })

})


    


//스크롤에 따라 위치찾으면서 글자가 돌아가는모션
const innovationTl = gsap.timeline()
.set('.sc-innovation .sticky .sub-title .char',{
    rotateY:"random(-90,90)deg",
    x:"random(-30,30)%",
    y:"random(-30,30)%",
    scale:"random(0,1)"
})
.to('.sc-innovation .sticky .sub-title .char', {
    rotateY: 0,
    x:0,
    y:0,
    scale:1
})
.to('.sc-innovation .kanji-svg, .sc-innovation .line', {
    y: '0%'
}, '<')
.to('.sc-innovation .img-content > div', {
    yPercent: -120,
}, '<')
.to('.sc-innovation .img-content .img-area', {
    y:"random(-50, -100)%",
}, '<')

ScrollTrigger.create({
    trigger: '.sc-innovation',
    start: '0% 0%',
    end: '100% 100%',
    markers: true,
    animation: innovationTl,
    scrub: 0,
})