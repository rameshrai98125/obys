function locomotiveAni() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function loader() {
  //loader counter

  var tl = gsap.timeline();

  tl.from(".loader h1", {
    y: 100,
    stagger: 0.2,
  });

  tl.from(".line-part1 .line h2", {
    onStart: function () {
      var timerh5 = document.querySelector(".line-part1 h5");
      var grow = 0;
      setInterval(() => {
        if (grow < 100) {
          grow++;
          // console.log(grow);
          timerh5.innerHTML = grow;
        } else {
          grow = 100;
        }
      }, 35);
    },
  });

  tl.to(".loader", {
    opacity: 0,
    duration: 0.5,
    delay: 3.5,
    // y: -1200,
  });

  tl.from(".page1", {
    delay: 0.5,
    y: 1600,
    opacity: 0,
  });
  tl.to(".loader", {
    display: "none",
  });

  tl.from(".nav", {
    opacity: 0,
  });
  // hero anm
  tl.from(".hero1 h1, .hero2 h1, .hero3 h1, .hero4 h1", {
    y: 150,
    stagger: 0.2,
  });
}
// cursor
function cursor() {
  document.addEventListener("mousemove", function (e) {
    gsap.to(".cursor", {
      x: e.clientX,
      y: e.clientY,
      duration: 0.2,
    });
  });

  Shery.makeMagnet(
    ".nav-part2 h4, .menu , .close, .overlay-nav .left-overlay h1",
    {
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      duration: 1,
    }
  );

  var videoContainer = document.querySelector(".videoContainer");

  var video = document.querySelector(".videoContainer video");

  videoContainer.addEventListener("mouseenter", (e) => {
    videoContainer.addEventListener("mousemove", (dets) => {
      gsap.to(".cursor", {
        opacity: 0,
      });
      gsap.to(".video-cursor", {
        left: dets.x - 550,
        top: dets.y - 250,
        duration: 0.2,
      });
    });
  });

  videoContainer.addEventListener("mouseleave", (e) => {
    gsap.to(".cursor", {
      opacity: 1,
    });
    gsap.to(".video-cursor", {
      left: "80%",
      top: "-10%",
      duration: 0.2,
    });
  });

  var flag = 0;
  video.addEventListener("click", () => {
    if (flag === 0) {
      video.play();
      video.style.opacity = 1;
      document.querySelector(".videoContainer img").style.opacity = 0;
      document.querySelector(
        ".video-cursor"
      ).innerHTML = `<i class="ri-pause-line"></i>`;
      gsap.to(".video-cursor", {
        scale: 0.5,
      });
      flag = 1;
    } else {
      video.pause();
      video.style.opacity = 0;
      document.querySelector(".videoContainer img").style.opacity = 1;
      document.querySelector(
        ".video-cursor"
      ).innerHTML = `<i class="ri-play-line"></i>`;
      gsap.to(".video-cursor", {
        scale: 1,
      });
      flag = 0;
    }
  });
}

function sheryAnimation() {
  // Shery.mouseFollower();
  Shery.imageEffect(".imageDiv", {
    style: 1, //Select Style
    config: {
      resolutionXY: { value: 100 },
      distortion: { value: true },
      mode: { value: -3 },
      mousemove: { value: 0 },
      modeA: { value: 1 },
      modeN: { value: 0 },
      speed: { value: 1, range: [-500, 500], rangep: [-10, 10] },
      frequency: { value: 50, range: [-800, 800], rangep: [-50, 50] },
      angle: { value: 0.5, range: [0, 3.141592653589793] },
      waveFactor: { value: 1.4, range: [-3, 3] },
      color: { value: 10212607 },
      pixelStrength: { value: 3, range: [-20, 100], rangep: [-20, 20] },
      quality: { value: 5, range: [0, 10] },
      contrast: { value: 1, range: [-25, 25] },
      brightness: { value: 1, range: [-1, 25] },
      colorExposer: { value: 0.18, range: [-5, 5] },
      strength: { value: 0.2, range: [-40, 40], rangep: [-5, 5] },
      exposer: { value: 8, range: [-100, 100] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7272749932567818 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.21, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.53, range: [0, 10] },
      metaball: { value: 0.34, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 12.21, range: [0, 100] },
    }, // Debug Panel
    gooey: true,
  });
}
function flag() {
  document.addEventListener("mousemove", (e) => {
    gsap.to(".flag", {
      x: e.x,
      y: e.y,
    });
  });

  document
    .querySelector("#webgrapicHero")
    .addEventListener("mouseenter", () => {
      gsap.to(".flag", {
        opacity: 1,
      });
    });
  document
    .querySelector("#webgrapicHero")
    .addEventListener("mouseleave", () => {
      gsap.to(".flag", {
        opacity: 0,
      });
    });
}
locomotiveAni();
loader();
cursor();
sheryAnimation();
flag();

var tl = gsap.timeline();
var menu = document.querySelector(".menu");
var close = document.querySelector(".close");

tl.to(".overlay-nav", {
  transform: "translateY(0%)",
});

tl.pause();

menu.addEventListener("click", () => {
  // alert("hello");
  tl.play();
});

close.addEventListener("click", () => {
  // alert("hello");
  tl.reverse();
});
