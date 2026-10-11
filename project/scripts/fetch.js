export async function fetchLocations() {
  const path = 'data/data.json';

  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
}

const PREF_KEY = 'pp_favorite_locations';

export function getFavorites() {
  const raw = localStorage.getItem(PREF_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(PREF_KEY, JSON.stringify(favorites));
}

export function toggleFavorite(id) {
  const favorites = getFavorites();
  const exists = favorites.includes(id);

  const updated = exists
    ? favorites.filter(favId => favId !== id)
    : [...favorites, id];

  saveFavorites(updated);
  return updated;
}