// Two-step registration form
var step1 = document.getElementById("step1");
var step2 = document.getElementById("step2");
var dots = document.querySelectorAll(".steps li");
var msg = document.getElementById("msg");

document.getElementById("next").onclick = function () {
  var mail = document.getElementById("mail");
  var full = document.getElementById("full");
  if (!mail.checkValidity() || full.value.trim() === "") {
    msg.innerText = "Enter a valid email and your name.";
    return;
  }
  msg.innerText = "";
  step1.classList.add("hidden");
  step2.classList.remove("hidden");
  dots[1].classList.add("active");
};

// live username check
var handle = document.getElementById("handle");
var info = document.getElementById("handleInfo");
handle.oninput = function () {
  var ok = /^[a-z0-9._]{3,20}$/.test(handle.value);
  info.innerText = ok ? "✓ looks good" : "3-20 chars: lowercase, numbers, . or _";
  info.style.color = ok ? "green" : "#c13584";
};

document.getElementById("register").onsubmit = function (e) {
  e.preventDefault();
  var secret = document.getElementById("secret").value;
  if (secret.length < 6) { msg.innerText = "Password needs 6+ characters."; return; }

  var users = JSON.parse(localStorage.getItem("igUsers") || "[]");
  users.push({
    mail: document.getElementById("mail").value.toLowerCase(),
    full: document.getElementById("full").value,
    handle: handle.value,
    secret: secret
  });
  localStorage.setItem("igUsers", JSON.stringify(users));
  msg.style.color = "green";
  msg.innerText = "Account ready! Taking you to sign in...";
  setTimeout(function () { location.href = "../index.html"; }, 1500);
};
