import { fetchLocations } from './fetch.js';
import { renderLocations } from './user-interface.js';

async function init() {
  const locations = await fetchLocations();

  const featured = locations.filter(loc => loc.featured);

  const toDisplay = featured.length >= 15 ? featured : locations;

  renderLocations(toDisplay);
}

init();


