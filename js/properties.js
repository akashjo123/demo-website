/**
 * NORTH & KEY — Interactive Property Search & Split-Screen Map Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initPropertySearch();
});

function initPropertySearch() {
  const propertyGrid = document.getElementById('properties-list-container');
  const mapCanvas = document.getElementById('map-pins-container');
  const searchInput = document.getElementById('property-search-input');
  const typeFilter = document.getElementById('property-type-select');
  const priceFilter = document.getElementById('property-price-select');
  const bedsFilter = document.getElementById('property-beds-select');
  const sortSelect = document.getElementById('property-sort-select');
  const buyRentPills = document.querySelectorAll('.buy-rent-pill');
  const countDisplay = document.getElementById('results-count-display');
  const mobileToggleBtn = document.getElementById('mobile-map-toggle-btn');
  const mapColumn = document.querySelector('.split-map-column');

  let currentCategory = 'all'; // 'all', 'buy', 'rent'
  let currentSearch = '';
  let currentType = 'all';
  let currentPrice = 'all';
  let currentBeds = 'all';
  let currentSort = 'featured';

  // Read URL query params on initial load
  const urlParams = new URLSearchParams(window.location.search);
  const actionParam = urlParams.get('action') || urlParams.get('type');
  if (actionParam) {
    if (actionParam.toLowerCase() === 'buy') {
      currentCategory = 'buy';
      updatePills('buy');
    }
  }

  function updatePills(activeCategory) {
    buyRentPills.forEach((p) => {
      if (p.getAttribute('data-category') === activeCategory) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
  }

  // Filter Event Listeners
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      renderFilteredProperties();
    });
  }

  buyRentPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      currentCategory = pill.getAttribute('data-category');
      updatePills(currentCategory);
      renderFilteredProperties();
    });
  });

  if (typeFilter) {
    typeFilter.addEventListener('change', (e) => {
      currentType = e.target.value;
      renderFilteredProperties();
    });
  }

  if (priceFilter) {
    priceFilter.addEventListener('change', (e) => {
      currentPrice = e.target.value;
      renderFilteredProperties();
    });
  }

  if (bedsFilter) {
    bedsFilter.addEventListener('change', (e) => {
      currentBeds = e.target.value;
      renderFilteredProperties();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderFilteredProperties();
    });
  }

  // Mobile Map/List Toggle
  if (mobileToggleBtn && mapColumn) {
    mobileToggleBtn.addEventListener('click', () => {
      const isMapActive = mapColumn.classList.toggle('mobile-active');
      if (isMapActive) {
        mobileToggleBtn.innerHTML = '<i data-lucide="list" style="width:16px;height:16px;"></i> Show List';
      } else {
        mobileToggleBtn.innerHTML = '<i data-lucide="map-pin" style="width:16px;height:16px;"></i> Show Map';
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  }

  // Filter & Render Function
  function renderFilteredProperties() {
    let filtered = PROPERTIES_DATA.filter((p) => {
      // Category (Buy / Rent)
      if (currentCategory !== 'all' && p.category !== currentCategory) return false;

      // Text Search
      if (currentSearch) {
        const hay = `${p.title} ${p.location} ${p.city} ${p.type} ${p.description}`.toLowerCase();
        if (!hay.includes(currentSearch)) return false;
      }

      // Property Type
      if (currentType !== 'all' && p.type !== currentType) return false;

      // Bedrooms
      if (currentBeds !== 'all') {
        const minBeds = parseInt(currentBeds, 10);
        if (p.beds < minBeds) return false;
      }

      // Price Filter
      if (currentPrice !== 'all') {
        if (currentPrice === 'under-5m' && p.priceNumber >= 5000000) return false;
        if (currentPrice === '5m-10m' && (p.priceNumber < 5000000 || p.priceNumber > 10000000)) return false;
        if (currentPrice === 'over-10m' && p.priceNumber < 10000000) return false;
      }

      return true;
    });

    // Sorting
    if (currentSort === 'price-asc') {
      filtered.sort((a, b) => a.priceNumber - b.priceNumber);
    } else if (currentSort === 'price-desc') {
      filtered.sort((a, b) => b.priceNumber - a.priceNumber);
    } else if (currentSort === 'beds-desc') {
      filtered.sort((a, b) => b.beds - a.beds);
    }

    // Update Result Count
    if (countDisplay) {
      countDisplay.textContent = `${filtered.length} Available Residence${filtered.length === 1 ? '' : 's'}`;
    }

    // Render Cards in List Column
    if (propertyGrid) {
      if (filtered.length === 0) {
        propertyGrid.innerHTML = `
          <div style="padding: 80px 0; text-align: center; color: var(--text-secondary);">
            <h3 class="heading-3" style="margin-bottom: 12px;">No properties match your current criteria.</h3>
            <p class="body-medium">Try broadening your search filters or <a href="contact.html" style="text-decoration: underline; color: var(--accent-olive);">inquire directly</a> for private off-market residences.</p>
          </div>
        `;
      } else {
        propertyGrid.innerHTML = filtered.map((prop, idx) => `
          <div class="property-block ${idx % 2 === 1 ? 'reversed' : ''}" id="card-${prop.id}" data-id="${prop.id}" data-cursor="view" style="margin-bottom: clamp(60px, 8vh, 100px);">
            <div class="property-image-wrap">
              <a href="property-detail.html?id=${prop.id}">
                <img src="${prop.image}" alt="${prop.title}" class="property-image" loading="lazy">
              </a>
              <div class="property-badge">${prop.type} &bull; ${prop.city}</div>
            </div>
            <div class="property-meta-wrap">
              <div class="property-accent-line"></div>
              <span class="property-location">${prop.location}</span>
              <a href="property-detail.html?id=${prop.id}">
                <h3 class="property-title">${prop.title}</h3>
              </a>
              <div class="property-price">${prop.priceFormatted}</div>
              
              <div class="property-specs-list">
                <div class="spec-item">
                  <span class="spec-val">${prop.beds}</span>
                  <span class="spec-lbl">Beds</span>
                </div>
                <div class="spec-item">
                  <span class="spec-val">${prop.baths}</span>
                  <span class="spec-lbl">Baths</span>
                </div>
                <div class="spec-item">
                  <span class="spec-val">${prop.area.replace(' sq ft', '')}</span>
                  <span class="spec-lbl">Sq Ft</span>
                </div>
              </div>

              <div style="display: flex; gap: 20px; align-items: center; margin-top: 10px;">
                <a href="property-detail.html?id=${prop.id}" class="property-cta">
                  Explore Residence <span class="property-cta-arrow">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        `).join('');
      }
    }

    // Render Pins on Map Canvas
    if (mapCanvas) {
      mapCanvas.innerHTML = filtered.map((prop) => `
        <div class="map-pin" id="pin-${prop.id}" data-id="${prop.id}" style="left: ${prop.coords.x}%; top: ${prop.coords.y}%;">
          <div class="map-pin-pill">
            <i data-lucide="map-pin" style="width:12px;height:12px;"></i>
            ${prop.priceFormatted}
          </div>
          <div class="map-popup-card">
            <img src="${prop.image}" alt="${prop.title}" class="map-popup-img">
            <div class="map-popup-info">
              <h4 class="map-popup-title">${prop.title}</h4>
              <p style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 4px;">${prop.location}</p>
              <div class="map-popup-price">${prop.priceFormatted}</div>
            </div>
          </div>
        </div>
      `).join('');

      // Attach Map Pin Hover & Click Handlers
      const pins = mapCanvas.querySelectorAll('.map-pin');
      pins.forEach((pin) => {
        const propId = pin.getAttribute('data-id');
        const card = document.getElementById(`card-${propId}`);

        pin.addEventListener('click', () => {
          if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.style.outline = '2px solid var(--accent-olive)';
            setTimeout(() => { card.style.outline = 'none'; }, 2000);
          }
        });

        pin.addEventListener('mouseenter', () => {
          pin.classList.add('active');
        });
        pin.addEventListener('mouseleave', () => {
          pin.classList.remove('active');
        });
      });

      // Synchronize Card Hover to Pin
      const cards = propertyGrid.querySelectorAll('.property-block');
      cards.forEach((card) => {
        const propId = card.getAttribute('data-id');
        const pin = document.getElementById(`pin-${propId}`);
        if (pin) {
          card.addEventListener('mouseenter', () => { pin.classList.add('active'); });
          card.addEventListener('mouseleave', () => { pin.classList.remove('active'); });
        }
      });
    }

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Initial Render
  renderFilteredProperties();
}
