const form = document.querySelector("form");
const liveRegion = document.querySelector(".input-aria-live");

const testEmail = email=>{
  let re = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
  return re.test(email);
}

const setErrors = ( input , errorId ) =>{
  input.setAttribute("aria-invalid", "true");
  input.setAttribute("aria-describedBy", errorId);
  input.classList.add("hasError");
  input.classList.add("input-error");
  input.classList.add("show-error");
  input.nextElementSibling.style.maxHeight = input.nextElementSibling.scrollHeight + "px";
  input.nextElementSibling.style.marginBottom = 1 + "rem";
}

const removeErrors = input =>{
  input.removeAttribute("aria-invalid");
  input.removeAttribute("aria-describedBy");
  input.classList.remove("hasError");
  input.classList.remove("input-error");
  input.classList.remove("show-error");
  input.nextElementSibling.style.maxHeight = null;
  input.nextElementSibling.style.marginBottom = 0 + "rem";
}

const testInputs = ( input, errorId ) =>{

  if ( input.name === "email") {
    if ( !testEmail(input.value) ) return true;
  }
  if ( !input.value ) return true;

  return false;
}

const handleFormSubmit = event =>{
  event.preventDefault();
  const errorMessage = [];
  const { firstName, lastName, email, password } = event.target;

  if ( testInputs(firstName) ) {
    setErrors(firstName, "errorFirstName");
    errorMessage.push("firstname");
  } else {
    removeErrors(firstName);
  }

  if ( testInputs(lastName) ) {
    setErrors(lastName, "errorLastName");
    errorMessage.push("lastname");
  } else {
    removeErrors(lastName);
  }

  if ( testInputs(email) ) {
    setErrors(email, "errorEmail");
    errorMessage.push("email");
  } else {
    removeErrors(email);
  }

  if ( testInputs(password) ) {
    setErrors(password, "errorPassword");
    errorMessage.push("password");
  } else {
    removeErrors(password);
  }

  if ( errorMessage.length > 0 ) {
    liveRegion.textContent = "Form submission invalid. Check your " + errorMessage.join(", ") + " input fields";
  } else {
    liveRegion.textContent = "Form submission success !"
  }
}

form.addEventListener("submit", handleFormSubmit);
