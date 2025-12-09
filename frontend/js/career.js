document.getElementById("careerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
        user_id: localStorage.getItem("user_id"),
        dream_role: document.getElementById("dream_role").value,
        experience: document.getElementById("experience").value,
        learning_style: document.getElementById("learning_style").value
    };

    const res = await fetch("http://127.0.0.1:5000/api/career/generate", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });

    const data = await res.json();

    document.getElementById("careerOutput").classList.remove("hidden");
    document.getElementById("careerOutput").innerHTML =
        `<pre>${JSON.stringify(data, null, 2)}</pre>`;
});
