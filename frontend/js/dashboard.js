const userId = localStorage.getItem("user_id");

if (!userId) window.location.href = "index.html";

document.addEventListener("DOMContentLoaded", async () => {

    document.getElementById("welcomeCard").innerHTML =
        "Welcome, user " + userId;

    const res = await fetch(`http://127.0.0.1:5000/api/career/history/${userId}`);
    const data = await res.json();

    document.getElementById("activityList").innerHTML =
        data.map(a => `<li>${a.description}</li>`).join("");
});
