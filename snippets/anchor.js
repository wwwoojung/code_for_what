// url에 특정 파라미터를 붙혀서 파라미터와 일치하는 이미지 영역으로 스크롤

$(window).load(function () {
  /* --------------------------------------------------------------------------- */
  /* 앵커 */

  if (location.search.includes("anchor=")) {
    var anchor = location.search.split("anchor=")[1].split("&")[0];
    var targetElement = document.getElementById(anchor);

    if (targetElement) {
      var targetHeight = targetElement.offsetTop;
      var headerHeight = document.querySelector(".header_wrap").offsetHeight;
      var navElement = document.querySelector(".floating_nav");

      if (navElement) {
        // 존재하는지 확인
        var navHeight = navElement.offsetHeight;
        $(document).scrollTop(targetHeight - navHeight + headerHeight);
      } else {
        $(document).scrollTop(targetHeight + headerHeight);
      }
    }
  }
});