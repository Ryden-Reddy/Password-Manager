import { supabase } from "./supabase-config.js";

const isSignup = !!document.getElementById("signupBtn");
const isLogin = !!document.getElementById("loginBtn");
const errorMsg = document.getElementById("errorMsg");

// Check if user is already logged in
async function checkUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    window.location.href = "index.html";
  }
}
checkUser();

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.style.display = "block";
}

if (isLogin) {
  document.getElementById("loginBtn").addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const btn = document.getElementById("loginBtn");

    if (!email || !password) return showError("Please fill all fields.");

    btn.disabled = true;
    btn.textContent = "Verifying...";
    errorMsg.style.display = "none";

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      showError(error.message);
      btn.disabled = false;
      btn.textContent = "Sign In";
    } else {
      // SUCCESS: Trigger loader animation
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('active');
      
      // Wait 1.5 seconds so they see the animation, then redirect
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500); 
    }
  });
}

if (isSignup) {
  document.getElementById("signupBtn").addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    if (password !== confirm) return showError("Passwords do not match.");
    if (password.length < 6) return showError("Password too short.");

    const btn = document.getElementById("signupBtn");
    btn.disabled = true;
    btn.textContent = "Creating account...";
    errorMsg.style.display = "none";

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      showError(error.message);
      btn.disabled = false;
      btn.textContent = "Create Account";
    } else {
      alert("Success! Check your email or try logging in.");
      window.location.href = "login.html";
    }
  });
}
// --- Smooth Transitions Between Login and Signup ---
const authLinks = document.querySelectorAll('.auth-switch a');

authLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Stop the hard page reload
    
    const targetUrl = e.target.href;
    const authCard = document.querySelector('.auth-card');
    const authBrand = document.querySelector('.auth-brand');
    
    // Slide and fade out the card and the logo
    if (authCard) authCard.classList.add('auth-exit');
    if (authBrand) {
        authBrand.style.transition = 'all 0.3s ease-in';
        authBrand.style.opacity = '0';
        authBrand.style.transform = 'translateY(-10px)';
    }
    
    // Wait for the exit animation to finish (300ms) before changing the page
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 300); 
  });
});