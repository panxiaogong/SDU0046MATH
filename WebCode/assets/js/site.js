const body = document.body;
const navToggle = document.querySelector("[data-nav-toggle]");
const closeNavTrigger = document.querySelector("[data-close-nav]");
const progressBar = document.querySelector("[data-progress-bar]");
const tocLinks = Array.from(document.querySelectorAll(".toc-list a"));
const headings = Array.from(document.querySelectorAll(".article-body h2[id], .article-body h3[id], .article-body h4[id], .article-body h5[id]"));

function closeNav() {
  body.classList.remove("nav-open");
}

navToggle?.addEventListener("click", () => {
  body.classList.toggle("nav-open");
});

closeNavTrigger?.addEventListener("click", closeNav);

document.querySelectorAll(".side-panel--nav a").forEach((link) => {
  link.addEventListener("click", closeNav);
});

function updateProgress() {
  if (!progressBar) {
    return;
  }
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = maxScroll <= 0 ? 0 : Math.min(scrollTop / maxScroll, 1);
  progressBar.style.width = `${ratio * 100}%`;
}

function updateActiveHeading() {
  if (!tocLinks.length || !headings.length) {
    return;
  }

  let currentId = headings[0].id;
  for (const heading of headings) {
    if (heading.getBoundingClientRect().top <= 140) {
      currentId = heading.id;
    }
  }

  tocLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const active = href === `#${currentId}`;
    link.parentElement?.classList.toggle("is-active", active);
  });
}

function onScroll() {
  updateProgress();
  updateActiveHeading();
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", updateProgress);
onScroll();
