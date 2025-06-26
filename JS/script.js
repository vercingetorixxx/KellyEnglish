// ---------- Dynamic Boxes ---------- //

document.addEventListener("DOMContentLoaded", () => {
    const targets = document.querySelectorAll(".box");
    const stateMap = new WeakMap(); // Store timeout IDs per element

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            // Get or initialize state
            const state = stateMap.get(entry.target) || { timeoutId: null, isAnimating: false };

            // Clear existing timeout
            if (state.timeoutId) { clearTimeout(state.timeoutId); }

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
            } else if (!entry.target.classList.contains("placeholder_permaScroll") && !state.isAnimating) {
                state.timeoutId = setTimeout(() => {
                    entry.target.classList.remove("scrolled");
                }, 100);
                stateMap.set(entry.target, state);
            };
        });
    };

    const options = {
        root: null, // Use viewport as root
        rootMargin: "0px", // Margin around root
        threshold: 0.25 // Trigger when 25% of the target is visible
    };

    const observer = new IntersectionObserver(callback, options);

    targets.forEach(target => {
        observer.observe(target);
        stateMap.set(target, { timeoutId: null, isAnimating: false }); // Initialize state
    });
});