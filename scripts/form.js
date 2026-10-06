const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

function initFormPage() {
  const productSelect = document.getElementById("productName");
  if (!productSelect) return; // Not on the form page

  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name; 
    productSelect.appendChild(option);
  });
}

function initReviewPage() {
  const reviewDiv = document.getElementById("reviewDetails");
  if (!reviewDiv) return; // Not on review.html

  const params = new URLSearchParams(window.location.search);

  const productId = params.get("productName");
  const productObj = products.find(p => p.id === productId);
  const productName = productObj ? productObj.name : productId;

  reviewDiv.innerHTML = `
    <p><strong>Product:</strong> ${productName}</p>
    <p><strong>Rating:</strong> ${params.get("rating")}</p>
    <p><strong>Date Installed:</strong> ${params.get("installDate")}</p>
    <p><strong>Useful Features:</strong> ${params.getAll("features").join(", ") || "None selected"}</p>
    <p><strong>Written Review:</strong> ${params.get("writtenReview") || "No written review provided"}</p>
    <p><strong>User Name:</strong> ${params.get("userName") || "Anonymous"}</p>
  `;

  // Review counter
  let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;
  reviewCount++;
  localStorage.setItem("reviewCount", reviewCount);

  const counterDisplay = document.getElementById("reviewCounter");
  if (counterDisplay) {
    counterDisplay.textContent = `Total Reviews Submitted: ${reviewCount}`;
  }
}

initFormPage();
initReviewPage();
