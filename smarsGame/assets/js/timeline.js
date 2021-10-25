const steps = document.querySelectorAll(".step");
const timeline = document.querySelector(".timeline");
const line = document.querySelector(".line");
let prevScrollY = window.scrollY;
let downDirection;
let full = false;
let set = 0;
const targetY = window.innerHeight;

function scrollHandler(e) {
  const { scrollY } = window;
  downDirection = scrollY < prevScrollY;
  const timelineRect = timeline.getBoundingClientRect();
  const lineRect = line.getBoundingClientRect();
  const remToPx = parseInt(getComputedStyle(document.documentElement).fontSize);

  // distance from top of timeline to bottom of window
  const dist = targetY - timelineRect.top;
  const lineDist = dist - 7 * remToPx;

  if (!downDirection && !full) {
    set = Math.max(set, lineDist);
    line.style.bottom = `calc(100% - ${set}px)`;
  }

  if (lineDist > timeline.offsetHeight - 7 * remToPx && !full) {
    line.style.bottom = "7rem";
    full = true;
  }

  steps.forEach((item) => {
    const rect = item.getBoundingClientRect();

    if (rect.top + item.offsetHeight < targetY) {
      item.classList.add("show-me");
    }
  });

  prevScrollY = window.scrollY;
}

scrollHandler();
window.addEventListener("scroll", scrollHandler);
