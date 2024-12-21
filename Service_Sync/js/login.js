document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const fields = [email, password];
    const submitButton = form.querySelector('button[type="submit"]');

    // Mark fields as unvisited initially
    fields.forEach((field) => {
        field.visited = false;

        // Mark field as visited on focus
        field.addEventListener('focus', () => {
            field.visited = true;
        });

        // Validate on blur
        field.addEventListener('blur', () => validateField(field));
    });

    // Disable submit button initially
    toggleSubmitButton();

    fields.forEach((field) => {
        field.addEventListener('input', toggleSubmitButton);
    });

    // Form submission handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        fields.forEach((field) => {
            if (!validateField(field, true)) {
                isValid = false;
            }
        });

        if (isValid) {
            alert('Login successful!');
            form.reset();
            resetValidation();
            toggleSubmitButton(); // Re-disable the button after successful login
        }
    });

    // Validate individual fields
    function validateField(field, isSubmit = false) {
        const value = field.value.trim();
        const errorMessage = field.nextElementSibling;

        // Skip validation if the field was not visited and it's not a form submission
        if (!field.visited && !isSubmit) {
            errorMessage.style.visibility = 'hidden';
            return true;
        }

        if (!value) {
            setError(field, errorMessage, "Can't be blank");
            return false;
        }

        if (field.type === 'email' && !isValidEmail(value)) {
            setError(field, errorMessage, 'Enter a valid email');
            return false;
        }

        setSuccess(field, errorMessage);
        return true;
    }

    // Show error styles
    function setError(field, errorMessage, message) {
        field.classList.add('error');
        field.classList.remove('success');
        errorMessage.textContent = message;
        errorMessage.style.visibility = 'visible';
    }

    // Show success styles
    function setSuccess(field, errorMessage) {
        field.classList.remove('error');
        field.classList.add('success');
        errorMessage.style.visibility = 'hidden';
    }

    // Remove validation styles
    function resetValidation() {
        fields.forEach((field) => {
            field.visited = false; // Reset visited state
            removeValidationStyles(field);
        });
    }

    // Remove validation styles
    function removeValidationStyles(field) {
        field.classList.remove('error', 'success');
        field.nextElementSibling.style.visibility = 'hidden';
    }

    // Disable/Enable Submit Button
    function toggleSubmitButton() {
        let allValid = fields.every((field) => validateField(field));
        submitButton.disabled = !allValid;
    }

    // Validate email format
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
