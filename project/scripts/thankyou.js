const params = new URLSearchParams(window.location.search);

document.getElementById("out-first").textContent = params.get("first-name");
document.getElementById("out-last").textContent = params.get("last-name");
document.getElementById("out-email").textContent = params.get("email-box");
