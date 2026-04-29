import { supabase } from "./supabase-config.js";

let userId = null;

async function init() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    window.location.href = "login.html";
  } else {
    userId = user.id;
    const emailEl = document.getElementById("userEmail");
    if(emailEl) emailEl.textContent = user.email;
  }
}
init();

const submitBtn = document.getElementById("submitBtn");
if(submitBtn) {
  submitBtn.addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const category = document.getElementById("category").value;
    const url = document.getElementById("url").value.trim(); // Grab the new URL

    if (!name || !email || !password || !category) return alert("Fill all required fields.");

    submitBtn.disabled = true;
    
    // Include URL in the database insert
    const { error } = await supabase.from('passwords').insert([
      { name, email, password, category, url, user_id: userId }
    ]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Account Saved!");
      location.reload();
    }
    submitBtn.disabled = false;
  });
}

const logoutBtn = document.getElementById("logoutBtn");
if(logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "login.html";
  });
}
