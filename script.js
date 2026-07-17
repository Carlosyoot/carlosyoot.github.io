const portfolioItems = [
  {
    size: "large",
    title: "Edição Dinâmica - Reel",
    kind: "Trecho",
    duration: "00:32",
    video: "videos/video-001.mp4",
    originalUrl: "https://www.youtube.com/@CarlosDaniel-cy2wj",
    description: "Cortes rápidos, impacto visual e ritmo pensado para retenção em redes sociais.",
    tags: ["Reel", "DaVinci Resolve", "Motion"]
  },
  {
    size: "large",
    title: "Transições Cinematográficas",
    kind: "Trecho",
    duration: "00:45",
    video: "videos/video-002.mp4",
    originalUrl: "https://www.youtube.com/@CarlosDaniel-cy2wj",
    description: "Transições fluidas entre cenas com efeitos integrados ao movimento.",
    tags: ["Cinemático", "Fusion", "Cor"]
  },
  {
    size: "xl",
    title: "Motion Graphics",
    kind: "Trecho",
    duration: "00:28",
    video: "videos/video-003.mp4",
    originalUrl: "https://www.youtube.com/@CarlosDaniel-cy2wj",
    description: "Tipografia, chamadas e elementos gráficos dando suporte à narrativa.",
    tags: ["Motion", "DaVinci Fusion", "Photoshop"]
  },
  {
    size: "large",
    title: "Curta-Metragem - Sombras",
    kind: "Completo",
    duration: "05:22",
    video: "videos/video-004.mp4",
    originalUrl: "https://www.youtube.com/@CarlosDaniel-cy2wj",
    description: "Montagem, cor e finalização para narrativa independente.",
    tags: ["Curta", "Color Grading"]
  },
  {
    size: "large",
    title: "Vlog de Viagem",
    kind: "Completo",
    duration: "08:10",
    video: "videos/video-005.mp4",
    originalUrl: "https://www.youtube.com/@CarlosDaniel-cy2wj",
    description: "Edição cinematográfica com ritmo narrativo e tratamento de cor.",
    tags: ["Vlog", "DaVinci Resolve"]
  }
];

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function renderPortfolio() {
  const mosaic = document.querySelector("#portfolioMosaic");
  if (!mosaic) return;

  mosaic.innerHTML = portfolioItems.map((item) => {
    const tags = item.tags
      .map((tag) => `<span>${escapeHtml(tag)}</span>`)
      .join("");

    const originalLink = item.originalUrl
      ? `<a class="video-original" href="${escapeHtml(item.originalUrl)}" target="_blank" rel="noopener" aria-label="Assistir vídeo original">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17 17 7"></path>
            <path d="M9 7h8v8"></path>
          </svg>
        </a>`
      : "";

    return `
      <article class="video-card size-${escapeHtml(item.size)} reveal">
        <div class="video-media" role="button" tabindex="0" data-video="${escapeHtml(item.video)}" data-original-url="${escapeHtml(item.originalUrl || "")}" aria-label="Reproduzir ${escapeHtml(item.title)}">
          ${originalLink}
          <video src="${escapeHtml(item.video)}" muted playsinline preload="metadata"></video>
          <span class="play-overlay"><span class="play-icon"></span></span>
        </div>
        <div class="video-info">
          <h3>${escapeHtml(item.title)}</h3>
          <div class="video-meta">
            <span>${escapeHtml(item.kind)} ${escapeHtml(item.duration)}</span>
          </div>
          <p>${escapeHtml(item.description)}</p>
          <div class="video-tags">${tags}</div>
        </div>
      </article>
    `;
  }).join("");
}

function playLocalVideo(el) {
  const src = el.dataset.video;
  if (!src) return;
  const originalUrl = el.dataset.originalUrl;
  const originalLink = originalUrl
    ? `<a class="video-original" href="${escapeHtml(originalUrl)}" target="_blank" rel="noopener" aria-label="Assistir vídeo original">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 17 17 7"></path>
          <path d="M9 7h8v8"></path>
        </svg>
      </a>`
    : "";
  el.classList.add("playing");
  el.innerHTML = `${originalLink}<video src="${escapeHtml(src)}" autoplay controls playsinline></video>`;
}

function setupInteractions() {
  document.querySelectorAll(".video-media").forEach((media) => {
    media.addEventListener("click", (event) => {
      if (event.target.closest(".video-original")) return;
      playLocalVideo(media);
    });
    media.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        playLocalVideo(media);
      }
    });
  });
}

function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function setupTestimonials() {
  const cards = Array.from(document.querySelectorAll(".testimonial-card"));
  const prevButton = document.querySelector("#testimonialPrev");
  const nextButton = document.querySelector("#testimonialNext");
  const pageLabel = document.querySelector("#testimonialPage");
  const perPage = 3;
  let page = 0;

  if (!cards.length || !prevButton || !nextButton || !pageLabel) return;

  const totalPages = Math.max(1, Math.ceil(cards.length / perPage));

  function renderPage() {
    const start = page * perPage;
    const end = start + perPage;

    cards.forEach((card, index) => {
      const hidden = index < start || index >= end;
      card.classList.toggle("is-hidden", hidden);
      if (!hidden && page > 0) card.classList.add("visible");
    });

    pageLabel.textContent = `${page + 1} / ${totalPages}`;
    prevButton.disabled = page === 0;
    nextButton.disabled = page >= totalPages - 1;
  }

  prevButton.addEventListener("click", () => {
    page = Math.max(0, page - 1);
    renderPage();
  });

  nextButton.addEventListener("click", () => {
    page = Math.min(totalPages - 1, page + 1);
    renderPage();
  });

  renderPage();
}

renderPortfolio();
setupInteractions();
setupTestimonials();
setupReveal();
