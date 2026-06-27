(() => {
  const cards = document.querySelectorAll(".certification-card");
  const imageExtensions = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

  cards.forEach((card) => {
    const link = card.querySelector(".certification-link");
    const title = card.querySelector("h2")?.textContent?.trim() || "Certification";

    if (!link) return;

    const href = link.getAttribute("href") || "";
    const normalizedHref = href.toLowerCase();
    const media = document.createElement("div");
    media.className = "certification-media";

    if (imageExtensions.some((extension) => normalizedHref.endsWith(extension))) {
      const image = document.createElement("img");
      image.src = href;
      image.alt = `Aperçu du certificat : ${title}`;
      image.loading = "lazy";
      image.decoding = "async";
      media.appendChild(image);
    } else {
      const preview = document.createElement("div");
      preview.className = "certification-document-preview";

      const label = document.createElement("span");
      label.textContent = title;
      preview.appendChild(label);
      media.appendChild(preview);
    }

    card.prepend(media);
  });
})();
