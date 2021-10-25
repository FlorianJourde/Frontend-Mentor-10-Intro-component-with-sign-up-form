const form = document.querySelector("form");
const liveRegion = document.querySelector(".input-aria-live");

const testEmail = (email) => {
  let re = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
  return re.test(email);
};

// set error

const setErrors = (input, errorId) => {
  input.setAttribute("aria-invalid", "true");
  input.setAttribute("aria-describedBy", errorId);
  input.classList.add("hasError");
  input.classList.add("input-error");
  input.classList.add("show-error");
  input.nextElementSibling.style.maxHeight =
    input.nextElementSibling.scrollHeight + "px";
  input.nextElementSibling.style.marginBottom = 1 + "rem";
};

// remove error

const removeErrorHandler = (input, classes, attribures) => {
  classes.forEach((element) => {
    input.classList.remove(element);
  });
  attribures.forEach((element) => {
    input.removeAttribute(element);
  });
};

const removeErrors = (input) => {
  removeErrorHandler(
    input,
    ["hasError", "input-error", "show-error"],
    ["aria-invalid", "aria-describedBy"]
  );
  input.nextElementSibling.style.maxHeight = null;
  input.nextElementSibling.style.marginBottom = 0 + "rem";
};

const testInputs = (input) => {
  if (input.name === "email") {
    if (!testEmail(input.value)) return true;
  }
  if (!input.value) return true;

  return false;
};

// handle form submit

const handleErrors = (element, errorType, errorPush, errorPushArr) => {
  if (testInputs(element)) {
    setErrors(element, errorType);
    errorPushArr.push(errorPush);
  } else {
    removeErrors(element);
  }
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  const errorMessage = [];
  const { firstName, lastName, email, password } = event.target;

  handleErrors(firstName, "errorFirstName", "firstname", errorMessage);
  handleErrors(lastName, "errorLastName", "lastname", errorMessage);
  handleErrors(email, "errorEmail", "email", errorMessage);
  handleErrors(password, "errorPassword", "password", errorMessage);

  errorMessage.length > 0
    ? (liveRegion.textContent =
        "Form submission invalid. Check your " +
        errorMessage.join(", ") +
        " input fields")
    : (liveRegion.textContent = "Form submission success !");
};

form.addEventListener("submit", handleFormSubmit);
