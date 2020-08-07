var lastScrollTop = 0;
window.addEventListener("scroll", function(){ 
   var element = document.querySelector(".nav-scroll");
   if(!element) return;
   var st = window.pageYOffset || document.documentElement.scrollTop;
   if (st > 120 && st > lastScrollTop){
        element.classList.add("hidden-nav")
   } else if(st < lastScrollTop) {
        element.classList.remove("hidden-nav")
   }
   lastScrollTop = st <= 0 ? 0 : st;
}, false);