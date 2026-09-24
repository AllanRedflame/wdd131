const year = new Date().getFullYear();
const modified = document.lastModified;

let copyright = document.getElementById("currentyear");

document.getElementById("lastModified").innerHTML = "Last updated: " + modified;
copyright.innerHTML = `&copy; ${year} | David Poulsen | United States`;
