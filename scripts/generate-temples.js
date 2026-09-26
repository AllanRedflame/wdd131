const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Seattle Temple",
    location: "Seattle, Washington",
    dedicated: "1980, November, 17",
    area: 111000,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/02bc5fa239bfc78d3fdc3da6d851d95c65d054d3/full/640%2C/0/default"
  },
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
      "https://addfaith.org/wp-content/uploads/2024/04/Salt-Lake-Temple-2019-4-2.jpg"
  },
  {
    templeName: "Taipei Taiwan Temple",
    location: "Taipei, Taiwan",
    dedicated: "1984, November, 17",
    area: 9945,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/292ab7814b6355ac40236fbc39eb1a4ed8c058a7/full/800%2C/0/default"
  }
];

function parseTempleDate(dateString) {
  const parts = dateString.split(",").map(p => p.trim());
  return new Date(`${parts[0]} ${parts[1]} ${parts[2]}`);
}

function renderTemples(list) {
  const container = document.getElementById("figure-div");
  container.innerHTML = "";

  list.forEach(t => {
    const card = document.createElement("figure");
    card.classList.add("temple-card");

    const img = document.createElement("img");
    img.src = t.imageUrl;
    img.alt = `${t.templeName} Temple`;
    img.loading = "lazy";

    const caption = document.createElement("figcaption");
    caption.innerHTML = `
      <h2>${t.templeName}</h2>
      <p><strong>Location:</strong> ${t.location}</p>
      <p><strong>Dedicated:</strong> ${t.dedicated}</p>
      <p><strong>Area:</strong> ${t.area.toLocaleString()} sq ft</p>
    `;

    card.append(img, caption);
    container.appendChild(card);
  });
}

function filterTemples(mode) {
  let filtered = [...temples];

  switch (mode) {
    case "old":
      filtered.sort((a, b) => parseTempleDate(a.dedicated) - parseTempleDate(b.dedicated));
      break;

    case "new":
      filtered.sort((a, b) => parseTempleDate(b.dedicated) - parseTempleDate(a.dedicated));
      break;

    case "large":
      filtered.sort((a, b) => b.area - a.area);
      break;

    case "small":
      filtered.sort((a, b) => a.area - b.area);
      break;

    case "default":
    default:
      filtered = [...temples];
      break;
  }

  renderTemples(filtered);
}

document.querySelectorAll('#filters a, #header-filters a').forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault(); // prevents page jump
    const mode = link.dataset.filter;
    filterTemples(mode);
  });
});

renderTemples(temples);

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("filters");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("open");
});
