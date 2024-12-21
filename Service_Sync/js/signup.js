document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signupForm");
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
  
    const fields = [firstName, lastName, email, password, confirmPassword];
  
    // Validate input fields on blur
    fields.forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
    });
  
    // Form submission handler
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;
  
      fields.forEach((field) => {
        if (!validateField(field)) {
          isValid = false;
        }
      });
  
      if (isValid) {
        alert("Sign up successful!");
        form.reset();
        fields.forEach((field) => removeValidationStyles(field));
      }
    });
  
    // Validate individual fields
    function validateField(field) {
      const value = field.value.trim();
      const errorMessage = field.nextElementSibling;
  
      if (!value) {
        setError(field, errorMessage, "Can't be blank");
        return false;
      } else if (field === email && !isValidEmail(value)) {
        setError(field, errorMessage, "Enter a valid email");
        return false;
      } else if (field === confirmPassword && value !== password.value) {
        setError(field, errorMessage, "Passwords do not match");
        return false;
      } else {
        setSuccess(field, errorMessage);
        return true;
      }
    }
  
    // Show error styles
    function setError(field, errorMessage, message) {
      field.classList.add("error");
      field.classList.remove("success");
      errorMessage.textContent = message;
      errorMessage.style.visibility = "visible";
    }
  
    // Show success styles
    function setSuccess(field, errorMessage) {
      field.classList.remove("error");
      field.classList.add("success");
      errorMessage.style.visibility = "hidden";
    }
  
    // Remove validation styles
    function removeValidationStyles(field) {
      field.classList.remove("error", "success");
      const errorMessage = field.nextElementSibling;
      errorMessage.style.visibility = "hidden";
    }
  
    // Validate email format
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  });
  