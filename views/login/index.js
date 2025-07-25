const PAGE_URL = window.location.origin; // Get the current origin (protocol + hostname + port)

const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const form = document.querySelector("#form");
const errorText = document.querySelector("#error-text");
const formBtn = document.getElementById("form-btn");

//Regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

//Validators
let emailValidation = false;
let passwordValidation = false;

form.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    const user = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    await axios.post(`${PAGE_URL}/api/login`, user, { withCredentials: true });
    window.location.pathname = `/stock/`;
  } catch (error) {
    console.log(error);
    errorText.innerHTML = error.response.data.error;
  }
});

const validation = () => {
  let isEnabled = emailValidation && passwordValidation;
  formBtn.disabled = !isEnabled;
  if (isEnabled) {
    formBtn.classList.remove("bg-blue-300");
    formBtn.classList.add("bg-blue-700", "hover:bg-blue-800", "cursor-pointer");
  } else {
    formBtn.classList.add("bg-blue-300");
    formBtn.classList.remove(
      "bg-blue-700",
      "hover:bg-blue-800",
      "cursor-pointer"
    );
  }
};

emailInput.addEventListener("input", (e) => {
  emailValidation = emailRegex.test(e.target.value);
  validation();
});

passwordInput.addEventListener("input", (e) => {
  passwordValidation = e.target.value.length >= 1;
  validation();
});
