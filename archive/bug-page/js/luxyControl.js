let isLuxyEnabled = true;

export function luxyControll() {
  if (isLuxyEnabled === true) {
    luxy.init({
      wrapper: "#luxy",
      wrapperSpeed: 0.1,
    });
  } else {
  }
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      var href = this.getAttribute("href");
      var target = href === "#" ? document.body : document.querySelector(href);

      if (target) {
        var position = target.offsetTop;

        window.scrollTo({
          top: position,
          behavior: "smooth",
        });
      }
    });
  });
}

export function pauseLuxy() {
  isLuxyEnabled = false;
  document.getElementById("luxy").classList.add("noLuxy");
}

export function resumeLuxy(e) {
  isLuxyEnabled = true;
  document.getElementById("luxy").classList.remove("noLuxy");
  e.stopPropagation();
}

export function isLuxyActive() {
  return isLuxyEnabled;
}
