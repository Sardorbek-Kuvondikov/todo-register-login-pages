const loginToken = window.localStorage.getItem("token");

if (loginToken) {
  window.location.pathname = "../src/index.html";
}

const elLoginForm = document.querySelector(".js-login-form"),
  elLoginEmail = elLoginForm.querySelector(".js-login-email"),
  elLoginPassword = elLoginForm.querySelector(".js-login-password");

async function userLoginFn() {
  let response = await fetch("http://192.168.1.105:5000/user/login", {
    method: "POST",

    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: elLoginEmail.value.trim(),
      password: elLoginPassword.value,
    }),
  });
  let data = await response.json();
  console.log(data);

  if (data.token) {
    window.localStorage.setItem("token", data.token);
    window.location.pathname = "../src/index.html";
  }
}

elLoginForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  userLoginFn();
});
