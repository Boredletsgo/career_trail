const API_BASE = "http://127.0.0.1:5000/api";

// LOGIN
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const res = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            // Store user_id instead of token
            localStorage.setItem("user_id", data.user_id);

            window.location.href = "dashboard.html";
        } else {
            document.getElementById("message").innerText =
                data.error || "Login failed";
        }
    });
}

// SIGNUP
if (document.getElementById("signupForm")) {
    document.getElementById("signupForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const full_name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const res = await fetch(`${API_BASE}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ full_name, email, password })
        });

        const data = await res.json();

        if (res.ok) {
            alert("Signup successful! Please login.");
            window.location.href = "index.html";
        } else {
            document.getElementById("message").innerText =
                data.error || "Signup failed";
        }
    });
}
