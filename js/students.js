import { supabase } from "./supabase-config.js";

const container = document.getElementById("tableContainer");
const searchInput = document.getElementById("searchInput");
let allPasswords = [];

async function loadData() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return window.location.href = "login.html";
  
  const emailSpan = document.getElementById("userEmail");
  if(emailSpan) emailSpan.textContent = user.email;

  const { data, error } = await supabase
    .from('passwords')
    .select('*')
    .order('created_at', { ascending: false });

  if (data) {
    allPasswords = data;
    renderTable(allPasswords);
    updateCategoryCounts(allPasswords);
  }
}

function updateCategoryCounts(data) {
  const counts = { All: data.length, Login: 0, Email: 0, Work: 0, Finance: 0, Social: 0, Shopping: 0, DevTools: 0, Other: 0 };
  data.forEach(p => {
    const catKey = p.category ? p.category.replace(/\s+/g, '') : 'Other';
    if(counts[catKey] !== undefined) counts[catKey]++; else counts.Other++;
  });
  for (const [key, value] of Object.entries(counts)) {
    const countEl = document.getElementById(`count${key}`);
    if (countEl) countEl.textContent = value;
  }
}

function renderTable(data) {
  if (data.length === 0) {
    container.innerHTML = "<p style='color: #888;'>No accounts found.</p>";
    return;
  }

  // Adding an index parameter to calculate staggered animation delays
  const cards = data.map((p, index) => {
    let icon = "🌐";
    if(p.category === "Email") icon = "✉️";
    if(p.category === "Finance") icon = "💳";
    if(p.category === "Social") icon = "💬";
    if(p.category === "Shopping") icon = "🛒";
    if(p.category === "Work") icon = "💼";
    if(p.category === "Dev Tools") icon = "💻";

    // Show the saved URL if it exists
    const urlHtml = p.url ? `<a href="${p.url}" target="_blank">${p.url}</a>` : '';

    return `
    <div class="password-card" data-id="${p.id}" style="animation-delay: ${index * 0.05}s">
      <div class="card-left">
        <div class="site-icon-wrap">${icon}</div>
        <div class="site-info">
          <h3>${p.name}</h3>
          <p>${p.email}</p>
          ${urlHtml}
        </div>
      </div>
      <div class="card-right">
        <div class="pass-box">
          <input type="password" value="${p.password}" readonly id="pass-${p.id}">
        </div>
        <div class="action-icons">
          <button class="icon-btn" onclick="toggleVisibility('${p.id}')" title="View">👁️</button>
          <button class="icon-btn" onclick="copyPass('${p.password}')" title="Copy">📋</button>
          <button class="icon-btn" onclick="editItem('${p.id}')" title="Edit">✏️</button>
          <button class="icon-btn" onclick="deleteItem('${p.id}')" title="Delete">🗑️</button>
        </div>
      </div>
    </div>`;
  }).join("");

  container.innerHTML = `<div class="cards-container">${cards}</div>`;
}

window.toggleVisibility = function(id) {
  const input = document.getElementById(`pass-${id}`);
  input.type = input.type === "password" ? "text" : "password";
};

window.copyPass = function(passwordText) {
  navigator.clipboard.writeText(passwordText).then(() => alert("Password copied to clipboard!"));
};

window.deleteItem = async (id) => {
  if (confirm("Delete this entry?")) {
    await supabase.from('passwords').delete().eq('id', id);
    loadData();
  }
};

window.editItem = function(id) {
  const item = allPasswords.find(p => p.id === id);
  if (!item) return;
  document.getElementById('editId').value = item.id;
  document.getElementById('editName').value = item.name;
  document.getElementById('editEmail').value = item.email;
  document.getElementById('editPassword').value = item.password;
  document.getElementById('editUrl').value = item.url || ''; // Load URL into modal
  document.getElementById('editCategory').value = item.category || 'Other';
  document.getElementById('editModal').style.display = 'flex';
};

window.closeEditModal = function() {
  document.getElementById('editModal').style.display = 'none';
};

window.saveEdit = async function() {
  const id = document.getElementById('editId').value;
  const name = document.getElementById('editName').value.trim();
  const email = document.getElementById('editEmail').value.trim();
  const password = document.getElementById('editPassword').value.trim();
  const url = document.getElementById('editUrl').value.trim(); // Get new URL
  const category = document.getElementById('editCategory').value;

  if (!name || !email || !password) return alert("Please fill all required fields.");

  // Save the URL to Supabase along with everything else
  const { error } = await supabase.from('passwords').update({ name, email, password, url, category }).eq('id', id);
  if (error) {
      alert("Error updating: " + error.message);
  } else {
      closeEditModal();
      loadData(); 
  }
};

const logoutBtn = document.getElementById("logoutBtn");
if(logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await supabase.auth.signOut();
      window.location.href = "login.html";
    });
}

loadData();