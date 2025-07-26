// public/app.js
const loginForm = document.querySelector("form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const message = await response.text();
    alert(message);

    if (response.ok) {
      window.location.href = "home.html"; // Redirect on success
    }
  });
}
