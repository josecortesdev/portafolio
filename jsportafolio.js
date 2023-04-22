
$(document).ready(function () {

  PantallaCompleta();
  RotarTexto();

  $('[data-toggle="popover"]').popover({
    placement: 'bottom',
    trigger: 'hover'
  });

  //Letras zoom
  // $(".ver1").css("visibility", "hidden");
  // $(".zoom1").hover(function(){
  //   $(".letraszoom1").css("transform","scale(1.1)");
  //   $(".ver1").css("visibility", "visible");
  //   }, function(){
  //     $(".letraszoom1").css("transform","scale(1)");

  // });

  // $(".ver1").css("visibility", "hidden"); 

  //Letras zoom 2
  // $(".ver2").css("visibility", "hidden");
  // $(".zoom2").hover(function () {
  //   $(".letraszoom2").css("transform", "scale(1.1)");
  //   $(".ver2").css("visibility", "visible");
  // }, function () {
  //   $(".letraszoom2").css("transform", "scale(1)");
  //   $(".ver2").css("visibility", "hidden");
  // });

});


function PantallaCompleta() { // Pantalla completa
  var height = $(window).height(); // creamos variable con la altura de la pantalla

  $('.divuno').height(height); // Decimos que este div tendrá esa altura
  $('#video').height(height);
  // $('.divdos').height(height);

}

function RotarTexto() { // Desplazar texto

  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

//DESPLAZAR TEXTO

var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 7) || 20;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 40 - Math.random() * 1;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 5;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};



