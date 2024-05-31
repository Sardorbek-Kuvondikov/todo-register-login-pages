let token = window.localStorage.getItem("token");

if (token) {
  window.location.pathname = "../src/index.html";
}

const elRegisterForm = document.querySelector(".js-register-form"),
  elRegisterUserName = elRegisterForm.querySelector(".js-user-name"),
  elRegisterUserPhone = elRegisterForm.querySelector(".js-user-phone-number"),
  elRegisterUserEmail = elRegisterForm.querySelector(".js-user-email"),
  elRegisterUserPassword = elRegisterForm.querySelector(".js-user-password");

const elPasswordEye = document.querySelector(".js-password-eye");
const elEyeOn = document.querySelector(".js-open-eye");
const jsEyeOff = document.querySelector(".js-off-eye");

async function userRender() {
  try {
    let res = await fetch("http://192.168.1.105:5000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: elRegisterUserName.value.trim(),
        phone: elRegisterUserPhone.value.trim(),
        email: elRegisterUserEmail.value.trim(),
        password: elRegisterUserPassword.value,
      }),
    });
    let data = await res.json();

    console.log(data);

    if (data.token) {
      window.localStorage.setItem("token", data.token);
      window.location.pathname = "../src/index.html";
    }
  } catch (error) {
    console.log(error);
  }
}

elRegisterForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  userRender();
});

elPasswordEye.addEventListener("mousedown", () => {
  elRegisterUserPassword.type = "text";
  elEyeOn.style.display = "block";
  jsEyeOff.style.display = "none";
});

elPasswordEye.addEventListener("mouseup", () => {
  elRegisterUserPassword.type = "password";
  elEyeOn.style.display = "none";
  jsEyeOff.style.display = "block";
});

elPasswordEye.addEventListener("mouseleave", () => {
  elRegisterUserPassword.type = "password";
  elEyeOn.style.display = "none";
  jsEyeOff.style.display = "block";
});
