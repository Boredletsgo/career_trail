document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("user_id");
    const res = await fetch(`http://127.0.0.1:5000/api/auth/user/${userId}`);
    const user = await res.json();

    document.getElementById("full_name").value = user.full_name;
    document.getElementById("email").value = user.email;
});
