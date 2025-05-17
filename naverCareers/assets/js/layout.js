// gnb hover 시 2depth
$('#gnb .gnb-item').hover(function() {
    $(this).find('.sub-list').addClass('show');
},function() {
    $(this).find('.sub-list').removeClass('show');
})

// gnb language 클릭 시
$('.link-util').click(function(e) {
    e.preventDefault();
    
    $('.link-util.EN').toggleClass('open');
    $('.language i').toggleClass('open');
})

// 푸터 관련사이트 클릭 시
$('.btn-site').click(function () {

    $(this).toggleClass('open');    
    $('.site-list').toggleClass('open');    
})

// 모바일 gnb
$('.btn-hamburger').click(function () {
    $(this).toggleClass('on');
    // $('.mo-gnb').toggleClass('on');
})
$('.mo-gnb .gnb-item').click(function() {
    if ($(this).find('.sub-list').length > 0) {
        $(this).toggleClass('open')
    }
})
$('.mo-gnb .language .gnb-item').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
})