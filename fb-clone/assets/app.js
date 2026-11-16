// Shared script for login + register pages
function showToast(text) {
  const t = document.getElementById("toast");
  t.innerText = text;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2500);
}

// ----- Theme toggle (saved in localStorage) -----
const themeBtn = document.getElementById("themeToggle");
if (localStorage.getItem("fbTheme") === "light") document.body.className = "light";
if (themeBtn) {
  themeBtn.innerText = document.body.className === "light" ? "☾ Dark" : "☀ Light";
  themeBtn.addEventListener("click", () => {
    const light = document.body.className !== "light";
    document.body.className = light ? "light" : "dark";
    themeBtn.innerText = light ? "☾ Dark" : "☀ Light";
    localStorage.setItem("fbTheme", light ? "light" : "dark");
  });
}

// ----- Login page -----
const fbForm = document.getElementById("fbForm");
if (fbForm) {
  const eye = document.getElementById("eye");
  const pwd = document.getElementById("pwd");
  eye.addEventListener("click", () => {
    const hidden = pwd.type === "password";
    pwd.type = hidden ? "text" : "password";
    eye.innerText = hidden ? "Hide" : "Show";
  });

  fbForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let ok = true;
    const uid = document.getElementById("uid").value.trim();
    const setErr = (id, m) => { document.querySelector(`[data-for="${id}"]`).innerText = m; if (m) ok = false; };

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(uid);
    const isPhone = /^[0-9]{10,13}$/.test(uid);
    setErr("uid", uid === "" ? "Required" : (!isEmail && !isPhone ? "Enter a valid email or phone" : ""));
    setErr("pwd", pwd.value.length < 8 ? "Use at least 8 characters" : "");

    if (ok) { showToast("Welcome back! (demo – no data sent)"); fbForm.reset(); }
  });
}

// ----- Register page -----
const regForm = document.getElementById("regForm");
if (regForm) {
  const newpwd = document.getElementById("newpwd");
  const bar = document.getElementById("bar");
  newpwd.addEventListener("input", () => {
    let score = 0;
    if (newpwd.value.length >= 8) score++;
    if (/[A-Z]/.test(newpwd.value)) score++;
    if (/[0-9]/.test(newpwd.value)) score++;
    if (/[^A-Za-z0-9]/.test(newpwd.value)) score++;
    const colors = ["#f02849", "#f02849", "#f7b928", "#45bd62", "#31a24c"];
    bar.style.width = score * 25 + "%";
    bar.style.background = colors[score];
  });
  regForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const gender = document.querySelector('input[name="g"]:checked');
    if (!document.getElementById("fname").value || !document.getElementById("dob").value || !gender) {
      showToast("Please complete all fields");
      return;
    }
    showToast("Account created for " + document.getElementById("fname").value);
    setTimeout(() => (window.location = "login.html"), 1800);
  });
}
