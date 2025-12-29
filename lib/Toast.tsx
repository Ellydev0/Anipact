export function showToast(message: string, duration = 1000) {
  if (!message) return;

  // Remove any existing toast immediately to avoid duplicates
  const existing = document.querySelector(".notify");
  if (existing) existing.remove();

  const toast = document.createElement("div");

  toast.className = `
    notify text-[.8rem] fixed bottom-4 left-1/2 -translate-x-1/2 z-[100]
    bg-card/70 backdrop-blur-sm text-center w-fit shadow-xl
    border border-accent/70 px-5 py-2 rounded
  `.trim();
  toast.textContent = message;

  document.body.appendChild(toast);

  // Force a reflow then add the show class to trigger transition.
  // Using requestAnimationFrame ensures the browser registers the initial state.
  requestAnimationFrame(() => {
    // A second rAF ensures styles are applied before we add the class to animate.
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });
  });

  // After the requested duration, animate out and remove the element.
  const TRANSITION_MS = 280;

  setTimeout(() => {
    // start exit animation
    toast.classList.remove("show");
    toast.classList.add("hide");

    // remove element after animation completes
    setTimeout(() => {
      toast.remove();
    }, TRANSITION_MS);
  }, duration);
}
