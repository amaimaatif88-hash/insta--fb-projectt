// Sign-in page: uses accounts saved by register.js in localStorage (demo only)
var form = document.getElementById("signin");
var msg = document.getElementById("msg");

form.onsubmit = function (e) {
  e.preventDefault();
  var name = document.getElementById("u").value.trim().toLowerCase();
  var pass = document.getElementById("p").value;
  var users = JSON.parse(localStorage.getItem("igUsers") || "[]");

  var found = null;
  for (var i = 0; i < users.length; i++) {
    if (users[i].handle === name || users[i].mail === name) found = users[i];
  }

  if (!found) {
    msg.innerText = "No account found. Create one first.";
  } else if (found.secret !== pass) {
    msg.innerText = "Wrong password, try again.";
  } else {
    msg.style.color = "green";
    msg.innerText = "Hi " + found.full + "! You are signed in.";
  }
};
