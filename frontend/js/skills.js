document.getElementById("skillForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
        user_id: localStorage.getItem("user_id"),
        skill: document.getElementById("skill_name").value
    };

    await fetch("http://127.0.0.1:5000/api/skills/add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });

    loadSkills();
});

async function loadSkills() {
    const res = await fetch(
        `http://127.0.0.1:5000/api/skills/${localStorage.getItem("user_id")}`
    );

    const data = await res.json();

    document.getElementById("skillList").innerHTML =
        data.map(s => `<li>${s.skill}</li>`).join("");
}

loadSkills();
