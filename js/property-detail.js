/**
 * NORTH & KEY — Property Detail & Private Viewing Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  initPropertyDetail();
});

function initPropertyDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const propId = urlParams.get('id') || 'casa-verde';
  
  // Find property in catalog
  const property = PROPERTIES_DATA.find((p) => p.id === propId) || PROPERTIES_DATA[0];

  // Populate Hero
  document.title = `${property.title} | NORTH & KEY Residences`;
  
  const heroImage = document.getElementById('detail-hero-img');
  if (heroImage) heroImage.src = property.image;

  const titleEl = document.getElementById('detail-prop-title');
  if (titleEl) titleEl.textContent = property.title;

  const locEl = document.getElementById('detail-prop-location');
  if (locEl) locEl.textContent = property.location;

  const priceEl = document.getElementById('detail-prop-price');
  if (priceEl) priceEl.textContent = property.priceFormatted;

  const taglineEl = document.getElementById('detail-prop-tagline');
  if (taglineEl) taglineEl.textContent = property.tagline;

  const descEl = document.getElementById('detail-prop-desc');
  if (descEl) descEl.textContent = property.description;

  // Populate Specs Grid
  const specsGrid = document.getElementById('detail-specs-container');
  if (specsGrid) {
    specsGrid.innerHTML = `
      <div class="spec-item">
        <span class="spec-lbl">Architect</span>
        <span class="spec-val" style="font-size: 1.1rem; margin-top: 4px;">${property.architect}</span>
      </div>
      <div class="spec-item">
        <span class="spec-lbl">Year Completed</span>
        <span class="spec-val" style="font-size: 1.1rem; margin-top: 4px;">${property.yearBuilt}</span>
      </div>
      <div class="spec-item">
        <span class="spec-lbl">Bedrooms / Baths</span>
        <span class="spec-val" style="font-size: 1.1rem; margin-top: 4px;">${property.beds} Bed &bull; ${property.baths} Bath</span>
      </div>
      <div class="spec-item">
        <span class="spec-lbl">Living Area</span>
        <span class="spec-val" style="font-size: 1.1rem; margin-top: 4px;">${property.area}</span>
      </div>
    `;
  }

  // Populate Gallery
  const galleryContainer = document.getElementById('detail-gallery-container');
  if (galleryContainer && property.gallery) {
    galleryContainer.innerHTML = `
      <div class="gallery-grid-item-main gallery-img-item" data-cursor="view">
        <img src="${property.gallery[0] || property.image}" alt="${property.title} Exterior" loading="lazy">
      </div>
      <div class="gallery-img-item" data-cursor="view">
        <img src="${property.gallery[1] || property.image}" alt="${property.title} Interior" loading="lazy">
      </div>
      <div class="gallery-img-item" data-cursor="view">
        <img src="${property.gallery[2] || property.image}" alt="${property.title} Detail" loading="lazy">
      </div>
      <div class="gallery-img-item" data-cursor="view">
        <img src="${property.gallery[3] || property.image}" alt="${property.title} Atmosphere" loading="lazy">
      </div>
      <div class="gallery-img-item" data-cursor="view">
        <img src="${property.gallery[4] || property.image}" alt="${property.title} Landscape" loading="lazy">
      </div>
    `;
  }

  // Populate Amenities
  const amenitiesContainer = document.getElementById('detail-amenities-container');
  if (amenitiesContainer && property.amenities) {
    amenitiesContainer.innerHTML = property.amenities.map((item) => `
      <div class="amenity-item">
        <i data-lucide="check" style="width:16px;height:16px;color:var(--accent-olive);flex-shrink:0;"></i>
        <span>${item}</span>
      </div>
    `).join('');
  }

  // Modal Functionality
  const modal = document.getElementById('viewing-modal');
  const openModalBtns = document.querySelectorAll('.open-viewing-modal-btn');
  const closeModalBtn = document.getElementById('close-viewing-modal-btn');
  const viewingForm = document.getElementById('viewing-booking-form');
  const confirmationToast = document.getElementById('viewing-confirmation-toast');

  function openModal() {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openModalBtns.forEach((btn) => btn.addEventListener('click', openModal));
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (viewingForm) {
    viewingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      viewingForm.style.display = 'none';
      if (confirmationToast) confirmationToast.style.display = 'block';
      setTimeout(() => {
        closeModal();
        setTimeout(() => {
          viewingForm.reset();
          viewingForm.style.display = 'block';
          if (confirmationToast) confirmationToast.style.display = 'none';
        }, 500);
      }, 3500);
    });
  }

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}
