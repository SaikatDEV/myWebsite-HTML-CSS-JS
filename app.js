// Create a scrollmagic controller
let controller;
let slidescene;
let pageScene;

function animateSlides() {
  // Init controller
  controller = new ScrollMagic.Controller();

  // Select some elements
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");

  // loop over the slides
  sliders.forEach((slide, index, slides) => {
    // select some elements
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");

    // GSAP for animation
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });

    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=1");

    // Create a scene So elements can be revealed while scrolled
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "slide-Element",
      // })
      .addTo(controller);

    // New Animation
    const pageTl = gsap.timeline();

    // get next slide and push down a little
    const nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });

    pageTl.fromTo(
      slide,
      { opacity: "1", scale: 1 },
      { opacity: "0", scale: 0.5 }
    );
    // push up a little
    pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");

    // Create newScene So elements can be revealed while scrolled
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      // .addIndicators({
      //   colorStart: "red",
      //   colorTrigger: "red",
      //   name: "page-Scene",
      //   indent: 200,
      // })
      // This will below will help to pin the slide while it hits the indicator start
      // pushFollowers will push the next section to up
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
  });
}

const burger = document.querySelector(".burger");

function activeCursor(e) {
  // console.log(e.toElement);
  const item = e.target;

  // if (item.classList.contains("explore")) {
  //   gsap.to(".title-swipe", 1, { y: "0%" });
  // } else {
  //   gsap.to(".title-swipe", 1, { y: "100%" });
  // }

  if (item.classList.contains("explore")) {
    gsap.to(".title-swipe", 1, { y: "0%" });
  } else if (item.classList.contains("explore-p")) {
    gsap.to(".title-swipe", 1, { y: "0%" });
  } else gsap.to(".title-swipe", 1, { y: "100%" });
}

function navToggle(e) {
  console.log(e);
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "white" });
    gsap.to("#logo", 1, { color: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    // removing the scroll for the new page nav-bar, So add a class with css
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to("#logo", 1, { color: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    document.body.classList.remove("hide");
  }
}

// Barba page transitions

// Event listeners
// window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);
burger.addEventListener("click", navToggle);

animateSlides();

// One time page refresh after first page load
// window.onload = function () {
//   if (!window.location.hash) {
//     window.location = window.location + "#loaded";
//     window.location.reload();
//   }
// };
