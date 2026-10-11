import { toggleFavorite, getFavorites } from './fetch.js';

const container = document.querySelector('#locations-container');
const modal = document.querySelector('#location-modal');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('#modal-description');
const modalRegion = document.querySelector('#modal-region');
const modalRating = document.querySelector('#modal-rating');
const modalClose = document.querySelector('#modal-close');

export function renderLocations(locations) {
  const favorites = getFavorites();

  container.innerHTML = '';

  locations.forEach(location => {
    const isFavorite = favorites.includes(location.id);

    const card = document.createElement('article');
    card.classList.add('location-card');

    card.innerHTML = `
      <h3>${location.name}</h3>
      <p><strong>Country:</strong> ${location.country}</p>
      <p><strong>Region:</strong> ${location.region}</p>
      <p><strong>Rating:</strong> ${location.rating}</p>
      <button class="details-btn" data-id="${location.id}">View Details</button>
      <button class="favorite-btn" data-id="${location.id}">
        ${isFavorite ? '★ Saved' : '☆ Save'}
      </button>
    `;

    container.appendChild(card);
  });

  attachCardEvents(locations);
}

function attachCardEvents(locations) {
  const detailButtons = container.querySelectorAll('.details-btn');
  const favoriteButtons = container.querySelectorAll('.favorite-btn');

  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const location = locations.find(loc => loc.id === id);
      openModal(location);
    });
  });

  favoriteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const updatedFavorites = toggleFavorite(id);
      btn.textContent = updatedFavorites.includes(id) ? '★ Saved' : '☆ Save';
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
}

function openModal(location) {
  modalTitle.textContent = location.name;
  modalDescription.textContent = location.description;
  modalRegion.textContent = `Region: ${location.region}`;
  modalRating.textContent = `Rating: ${location.rating}`;

  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('open');
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  modal.classList.remove('open');
}
