const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const name = String(data.get("parentName") || "").trim();
  const email = String(data.get("parentEmail") || "").trim();
  const type = String(data.get("enquiryType") || "General enquiry");
  const message = String(data.get("message") || "").trim();
  const subject = encodeURIComponent("Website enquiry: " + type);
  const body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\nEnquiry type: " + type + "\n\nMessage:\n" + message);
  const feedback = document.getElementById("formFeedback");
  feedback.textContent = "Opening your email app. Please review the message and send it.";
  window.location.href = "mailto:thedearsp@gmail.com?subject=" + subject + "&body=" + body;
});

// Gentle reveal-on-scroll interaction; respects visitors who prefer reduced motion.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  document.body.classList.add('reveal-ready');
  document.querySelectorAll('.section-heading-row, .value-card, .gallery-item, .fees-card, .fees-promise, .payment-methods, .news-card, .contact-form').forEach((item, index) => {
    item.classList.add('reveal-on-scroll');
    item.style.transitionDelay = `${(index % 4) * 55}ms`;
  });
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal-on-scroll').forEach(item => revealObserver.observe(item));
}
