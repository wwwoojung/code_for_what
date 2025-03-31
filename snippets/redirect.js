/*
**   1) ["출발 상품번호", "출발 상품번호"],						>> 필수 : 맨 뒤에 " , " 필수 작성
**   2) ["도착 상품번호"],									  >> 필수 : 맨 뒤에 " , " 필수 작성
**   3) ["Y"],										>> 필수 :  맨 뒤에 " , " 필수 작성 / 50:50 사용 여부( "Y" / "N" )
**   4) ["utm 포함조건1", "utm 포함조건2", "utm 포함조건3"]     >> 선택 : 맨 뒤에 " , " 필수 작성
**   5) ["utm 제외조건1", "utm 제외조건2", "utm 제외조건3"]     >> 선택
**
**
**   1) 상품, 카테고리 모두 입력 가능
**		상품일 때 : prd_상품번호
**		카테고리일 때 : cate_카테고리번호
**	 
**	 2) 상품, 카테고리 모두 입력 가능
**	 	1개의 값만 입력 가능(다중 세팅 불가)
**
**	 3) 50% 이동 사용 여부 ** 대문자 **
**	 	"Y" : 50% 확률 이동
**	 	"N" : 사용 안함
**		무조건 " " 사이에 띄어쓰기 없이 입력
**
**   4) 전체 utm을 넣을 필요는 없고 광고 url 중에서 특정 지을 수 있는 포함 값만 삽입
**		조건 값은 인코딩 전 utm으로 삽입
**
**   5) 전체 utm을 넣을 필요는 없고 광고 url 중에서 특정 지을 수 있는 제외 값만 삽입
**		조건 값은 인코딩 전 utm으로 삽입
**   
**   
**	 모든 값은 " "로 묶고 값과 값 사이는 , 로 구분
**   그 외 [ ] , 기호와 하단 코드는 삭제 되지 않도록 주의
** 
** ------------------------------- 양식 -------------------------------

    // 조건 없을 시
    
	[
        ["prd_상품번호", "prd_상품번호"],
        ["prd_상품번호"],
        ["N"],
	],

** --------------------------------------------------------------------

	// 특정 url 포함 조건, url 제외 조건
    
	[
        ["prd_상품번호", "prd_상품번호"],
        ["prd_상품번호"],
        ["Y"],
        ["utm 포함조건1", "utm 포함조건2"],
        ["utm 제외조건1", "utm 제외조건2"],
	],

*/
/*------------------------ 리다이렉트 세팅 영역 ------------------------*/


var redirectList = [];   
 
var redirectType = $("meta[property='product:productId']").length > 0 ? "product_page" :
    location.href.includes("list.html") || location.href.includes("/category/") ? "list_page" : "";
var now = redirectType == "product_page" ? "prd_" + $("meta[property='product:productId']").attr("content") :
    redirectType == "list_page" && location.href.includes("list.html") ? "cate_" + new URLSearchParams(location.search).get("cate_no") :
    redirectType == "list_page" && location.href.includes("/category/") ? "cate_" + location.href.split("/category")[1].split("/")[2] : "";

redirectList.forEach(function (arr) {
    var start = arr[0]; //처음 떨어지는 부분 = main
    var end = arr[1][0]; //이동하는 페이지
    var condition = arr[2][0]; 

    if (start.includes(now)) {
        var utmIncludeWhen = arr[3];
        var utmExclusionWhen = arr[4];
        var endType = end.includes("cate") ? "cate_no" : end.includes("prd") ? "product_no" : "";
        var endURL = endType == "cate_no" ? "/product/list.html" : endType == "product_no" ? "/product/detail.html" : "";
        var endNum = +(end.split("_")[1]);
        var getSearch = new URLSearchParams(location.search);
        getSearch.delete("cate_no");
        getSearch.delete("product_no");

        if (utmIncludeWhen == undefined && utmExclusionWhen == undefined) {
            if (condition == "Y") {
                var randomNum = Math.floor(Math.random() * 10 + 1);
                if (randomNum % 2 == 0) {
                    location.href = endURL + "?" + endType + "=" + endNum + "&" + getSearch.toString();
                }
            } else {
                location.href = endURL + "?" + endType + "=" + endNum + "&" + getSearch.toString();
            }
        } else {
            var inChk = true, exChk = true;
            var inCnt = 0;
            var exCnt = 0;

            if (utmIncludeWhen != undefined) {
                utmIncludeWhen.forEach(function (v) {
                    if (decodeURI(location.search).includes(v)) {
                        inCnt++;
                    }
                })

                if (inCnt != utmIncludeWhen.length) {
                    inChk = false;
                }
            }

            if (utmExclusionWhen != undefined) {
                utmExclusionWhen.forEach(function (ex) {
                    if (!decodeURI(location.search).includes(ex)) {
                        exCnt++;
                    }
                });

                if (exCnt != utmExclusionWhen.length) {
                    exChk = false;
                }
            }

            if (inChk && exChk) {
                if (condition == "Y") {
                    var randomNum = Math.floor(Math.random() * 10 + 1);
                    if (randomNum % 2 == 0) {
                        location.href = endURL + "?" + endType + "=" + endNum + "&" + getSearch.toString();
                    }
                } else {
                    location.href = endURL + "?" + endType + "=" + endNum + "&" + getSearch.toString();
                }
            }
        }

    }
});
 



// 특정 광고 url로 접근했을 때 타겟 랜딩페이지로 리다이렉트

var Path = $('meta[name="path_role"]').attr( 'content' );
var now = decodeURI(location.search);

if(Path == "MAIN"){
    console.log("---------------------------")
    var utmIncludeWhen = '특정 광고 utm';
    var end = "이동할 랜딩 페이지";
    var endType = end.includes("cate") ? "cate_no" : end.includes("prd") ? "product_no" : "";
    var endURL = endType == "cate_no" ? "/product/list.html" : endType == "product_no" ? "/product/detail.html" : "";
    var getSearch = new URLSearchParams(location.search);
    getSearch.delete("cate_no");
    getSearch.delete("product_no");

    if(now.includes(utmIncludeWhen)){
        console.log("---------------------------")      
        var randomNum = Math.floor(Math.random() * 10 + 1);
        if (randomNum % 2 == 0) {
            location.href = endURL + "?" + end + "&" + getSearch.toString() + "&utm_term=랜딩테스트";
        }
    }
}




// AB 테스트
// 단점: 강제로 리다이렉트 시키는 거라 순간적으로 깜빡거리는 현상 발생, 더 효율 적인 방법이 없을지..?

if (window.location.href.includes("&utm_group=redirect")) {
    $('#promotionWrap').remove();
    $('main.shopbrand').prepend(`
        <div id="promotionWrap">
        // B 프로모션 랜딩
        </div>
    `)
}else{
    var randomNum = Math.floor(Math.random() * 10 + 1);
    console.log(randomNum);
    if (randomNum % 2 == 0) {
        var redirectUrl = window.location.href + "&utm_group=redirect";
        location.href = redirectUrl;
    }else{
        $('main.shopbrand').prepend(`
            <div id="promotionWrap">
                // A 프로모션 랜딩
            </div>
        `)

    }
}
