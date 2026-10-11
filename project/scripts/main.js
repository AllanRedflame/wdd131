import { fetchLocations } from './fetch.js';
import { renderLocations } from './user-interface.js';

async function init() {
  const locations = await fetchLocations();

  // Example array method: filter featured
  const featured = locations.filter(loc => loc.featured);

  // Ensure at least 15 items displayed (use full list if needed)
  const toDisplay = featured.length >= 15 ? featured : locations;

  renderLocations(toDisplay);
}

init();


