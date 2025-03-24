var SET_PRODUCT = [
    { "prdnum" : [ "해당 몰에서 사용하는 상품번호 배열" ], "type" : "상품 타입", "color" : [ "색상 배열" ], "slide" : "디테일 슬라이드 타입" },
];

var SET_SLIDE = [
    {
        "PRDTYPE" : "상품 타입",
        "COLORCHIP" :  [
            { "name" : "색상", "code" : "색상 코드", "ftp" : [ "컬러칩 내 들어갈 이미지 ftp 배열"] },
        ],
        "PRDSLIDE" : [
            { "type" : "브라", "ftp" : [ "디테일 슬라이드에 들어가는 이미지 ftp 배열" ] },
        ]
    },
]



var brandid = $("input[name='branduid']").val();
var addHtml = '', colorList = '', colorSlide = '', detailSlide = '', defaultSelected = '', count_img_src = '';
var VIEW_IDX = 0, VIEW_TYPE = 0;
var swiper1, swiper2, isTrue = false;

SET_PRODUCT.some((product, index) => {
    if (product.prdnum.includes(Number(brandid)) ) {
        VIEW_IDX = index;
        isTrue = true;
        return true;
    }
});

SET_SLIDE.some((slide, index) => {
    if (SET_PRODUCT[VIEW_IDX].type === slide.PRDTYPE) {
        VIEW_TYPE = index;
        return true;
    }
});

var TOPJSON = SET_PRODUCT[VIEW_IDX], //현재 상품에 해당하는 배열 묶음
    BOTTOMJSON = SET_SLIDE[VIEW_TYPE]; //현재 상품에 해당하는 배열 묶음
var FILTER_COLOR = TOPJSON.color.map(color => BOTTOMJSON.COLORCHIP.findIndex(chip => chip.name === color)).filter(index => index !== -1); // 묶음끼리 일치하는 컬러 인덱스만 담아 배열 처리


if( $(".colorChip").length > 0 && isTrue ){

    // 컬러칩 타이틀 이미지, 컬러 개수에 따라 달라짐
    switch (TOPJSON.color.length) {
        case 2 : count_img_src = '이미지 ftp'; break;
        case 3 : count_img_src = '이미지 ftp'; break;
        case 4 : count_img_src = '이미지 ftp'; break;
        case 5 : count_img_src = '이미지 ftp'; break;
    };

    addHtml += `<div class="color_wrap"><article><img src=${count_img_src} class="color_count"></article>`

    // 컬러칩
    colorList = FILTER_COLOR.map((colorIndex, i) => {
        var chip = BOTTOMJSON.COLORCHIP[colorIndex];
        var defaultSelected = i === 0 ? "class='on'" : "";
        var borderStyle = chip.code == '#FFFFFF' ? 'border:solid 1px #dadada' : '';
        return `<li style="background:${chip.code};${borderStyle}" ${defaultSelected}></li>`;
    }).join('');

    // 슬라이드
    colorSlide = BOTTOMJSON.COLORCHIP[FILTER_COLOR[0]].ftp.map(url => `<li class="swiper-slide"><img src="/design/justmysize/ECHO/product${url}"></li>`).join('');

    // 디테일 슬라이드
    detailSlide = BOTTOMJSON.PRDSLIDE
        .filter(slide => slide.type === TOPJSON.slide)
        .flatMap(slide => slide.ftp.map(url => `<li class="swiper-slide"><img src="/design/justmysize/ECHO/product${url}"></li>`))
        .join('');

    var colorNameStyle = `background:${BOTTOMJSON.COLORCHIP[FILTER_COLOR[0]].code};${BOTTOMJSON.COLORCHIP[FILTER_COLOR[0]].code === '#FFFFFF' ? 'border:solid 1px #dadada' : ''}`;
    
    addHtml += `
            <ul class="color_chip">${colorList}</ul>
            <div class="color_name">
                <span style="${colorNameStyle}"></span><p>${BOTTOMJSON.COLORCHIP[FILTER_COLOR[0]].name}</p>
            </div>
            <div class="swiper" id="prdDetailSwiper1">
                <div class="swiper-wrapper">${colorSlide}</div>
                <div class="swiper-button-next"></div><div class="swiper-button-prev"></div><div class="swiper-pagination"></div>
            </div>
            <article><img src="/design/justmysize/ECHO/product/cdg007-nylon-hook/detail%20view.jpg"></article>
            <div class="swiper" id="prdDetailSwiper2">
                <div class="swiper-wrapper">${detailSlide}</div>
                <div class="swiper-button-next"></div><div class="swiper-button-prev"></div><div class="swiper-pagination"></div>
            </div>
        </div>
    `;

    $(".colorChip").append(addHtml);

    createSwiper();
    
    if(TOPJSON.color.length == 5) $('.color_count').css('padding','0 0 20px'); // 컬러 개수 이미지
    if(TOPJSON.color.length == 7) $('.color_chip').css({'width':'65%', 'flex-wrap':'wrap'}) 
    if(TOPJSON.color.length == 9) $('.color_chip').css({'width':'90%', 'flex-wrap':'wrap'}) 

};



$(".color_chip li").click(function(e){
    e.preventDefault();

    var idx = $(this).index();
    $(this).siblings("li").removeClass("on");
    $(this).addClass("on");

    $(".color_name").find("span").css({"background":BOTTOMJSON.COLORCHIP[FILTER_COLOR[idx]].code});
    $(".color_name").find("p").text(BOTTOMJSON.COLORCHIP[FILTER_COLOR[idx]].name);

    if(BOTTOMJSON.COLORCHIP[FILTER_COLOR[idx]].code == "#FFFFFF"){
        $(this).css({"border":"2px solid #E58364"});
        $(".color_name").find("span").css({"border":"solid 1px #dadada"});
    }else{
        $(this).siblings("li[style*='background: rgb(255, 255, 255)']").css({"border":"solid 1px #dadada"});
    }

    var chanageColorSlide=[];

    for(var j=0; j < BOTTOMJSON.COLORCHIP[FILTER_COLOR[idx]].ftp.length; j++){
        chanageColorSlide.push(`<li class="swiper-slide"><img src="/design/justmysize/ECHO/product${BOTTOMJSON.COLORCHIP[FILTER_COLOR[idx]].ftp[j]}"></li>`)
    };

    swiper1.removeAllSlides();
    swiper1.appendSlide(chanageColorSlide);
    swiper1.update();
    swiper1.slideTo(2);
});

function createSwiper(){
    swiper1 = new Swiper("#prdDetailSwiper1", {
        slidesPerView: '1.3', spaceBetween: 12, slidesPerGroup: 1, centeredSlides: true, loop: true, 
        pagination: { el: ".swiper-pagination" }, navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    });
    swiper2 = new Swiper("#prdDetailSwiper2", {
        slidesPerView: '1.3', spaceBetween: 12, slidesPerGroup: 1, centeredSlides: true, loop: true, 
        pagination: { el: ".swiper-pagination" }, navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    });
}
