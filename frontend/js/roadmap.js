document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("user_id");

    const res = await fetch(`http://127.0.0.1:5000/api/career/roadmap/${userId}`);
    const data = await res.json();

    document.getElementById("roadmapSection").innerHTML =
        `<pre>${JSON.stringify(data, null, 2)}</pre>`;
});
