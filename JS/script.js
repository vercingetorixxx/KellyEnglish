// ---------- Dynamic Boxes ---------- //

document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".box");
  const stateMap = new WeakMap(); // Store timeout IDs per element

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      // Get or initialize state
      const state = stateMap.get(entry.target) || {
        timeoutId: null,
        isAnimating: false,
      };

      // Clear existing timeout
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }

      if (entry.isIntersecting) {
        state.timeoutId = setTimeout(() => {
          entry.target.classList.add("scrolled");
          state.isAnimating = true;
          stateMap.set(entry.target, state);
          // Clear animation flag after transition duration (500ms)
          setTimeout(() => {
            state.isAnimating = false;
            stateMap.set(entry.target, state);
          }, 250);
        }, 100);
        stateMap.set(entry.target, state);
      } else if (
        !entry.target.classList.contains("placeholder_permaScroll") &&
        !state.isAnimating
      ) {
        state.timeoutId = setTimeout(() => {
          entry.target.classList.remove("scrolled");
        }, 100);
        stateMap.set(entry.target, state);
      }
    });
  };

  const options = {
    root: null, // Use viewport as root
    rootMargin: "0px", // Margin around root
    threshold: 0.25, // Trigger when 25% of the target is visible
  };

  const observer = new IntersectionObserver(callback, options);

  targets.forEach((target) => {
    observer.observe(target);
    stateMap.set(target, { timeoutId: null, isAnimating: false }); // Initialize state
  });
});

// ---------- plusButtons ---------- //

const triggers = document.querySelectorAll(".faqItem");

triggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const plusButton = trigger.querySelector(".plusButton");
    plusButton.querySelector(".rotate").classList.toggle("rotated");
    trigger.nextElementSibling.classList.toggle("hidden");
    trigger.classList.toggle("clicked");
  });
});

// ---------- top button ---------- //

const topBtn = document.querySelector(".top");
const threshold = window.innerHeight;
let hideTimeout = null;
let showTimeout = null;

function handleScrollDown() {
  if (window.scrollY > threshold) {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
    if (topBtn.style.display !== "flex" && !showTimeout) {
      showTimeout = setTimeout(() => {
        topBtn.style.display = "flex";
        setTimeout(() => {
          topBtn.classList.remove("hidden");
          showTimeout = null;
        }, 100);
      }, 200);
    }
  } else {
    if (showTimeout) {
      clearTimeout(showTimeout);
      showTimeout = null;
    }
    if (topBtn.style.display === "flex" && !hideTimeout) {
      hideTimeout = setTimeout(() => {
        topBtn.classList.add("hidden");
        setTimeout(() => {
          topBtn.style.display = "none";
          hideTimeout = null;
        }, 500);
      }, 200);
    }
  }
}

window.addEventListener("scroll", handleScrollDown);



// ---------- default scroll behavior override ---------- //

const scrollers = document.querySelectorAll(".scroller");

function scrollToLevel1(btn, event) {
  event.preventDefault(); // Prevent default anchor behavior
  const element = document.querySelector(`${btn.getAttribute('href')}`);
  const offset = 60; // Pixels below the top
  const y = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

scrollers.forEach((scroller) => {
  scroller.addEventListener("click", (event) => scrollToLevel1(scroller, event));
});



// ---------- dropdown menu ---------- //

const dropBtn = document.querySelector(".dropdownButton");
const chevron = document.querySelector(".chevron");
const dropCnt = document.getElementById("dropdownContent");

dropBtn.addEventListener('click', () => {
    chevron.classList.toggle('rotated');
    dropCnt.classList.toggle('hidden');
});