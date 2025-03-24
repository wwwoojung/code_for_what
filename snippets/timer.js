function pad(n, width) { return (n + '').length >= width ? n : '0'.repeat(width - (n + '').length) + n; };

function CountDownTimer(dt, id) {
    var end = new Date(dt);
    var _millisecond = 1;
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;
  function showRemaining() {
      var now = new Date();
      var distance = end - now;
      // 시간 종료 시 뜨는 문구
      if (distance < 0) {
          document.getElementById(id).innerHTML = '<span>00</span> <span>00</span> <span>00</span> <span>00</span>';
          clearInterval(timer);
          return;
      }
        var day =  Math.floor(distance / _day);
        var hours = Math.floor((distance) / _hour);
        //var hours = Math.floor((distance % _day) / _hour);  
        //var minutes = Math.floor((distance) / _minute);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);
        var millisecond = Math.floor((distance % _second) / _millisecond);

      document.getElementById(id).innerHTML = '<span>' + pad(day,1) + '</span>';
      document.getElementById(id).innerHTML = '<span>' + pad(hours,2) + '</span>';
      document.getElementById(id).innerHTML += '<span>' + pad(minutes,2) + '</span>';
      document.getElementById(id).innerHTML += '<span>' + pad(seconds,2) + '</span>';
      //document.getElementById(id).innerHTML += '<span>' + pad(millisecond / 10 | 0, 2) + '</span>';
      document.getElementById(id).innerHTML += '<span>' + pad(millisecond / 1 | 0, 3) + '</span>';
  }

  timer = setInterval(showRemaining, 1);
};