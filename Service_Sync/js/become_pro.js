document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('becomeProForm');
    const fields = Array.from(form.querySelectorAll('input:not([type="file"]), select'));

    // Validate input fields on blur
    fields.forEach((field) => {
        field.addEventListener('blur', () => validateField(field));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        fields.forEach((field) => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            alert('Application submitted successfully!');
            form.reset();
        }
    });

    function validateField(field) {
        const value = field.value.trim();
        const errorMessage = field.nextElementSibling;

        // Validation for Years of Experience
        if (field.id === 'experience' && field.value < 0) {
            setError(field, errorMessage, 'Experience cannot be negative');
            return false;
        }

        // Validation for Email
        if (field.id === 'email' && !isValidEmail(value)) {
            setError(field, errorMessage, 'Enter a valid email');
            return false;
        }

        // Validation for Phone Number
        if (field.id === 'phone' && !isvalidPhone(value)) {
            setError(field, errorMessage, 'Enter a valid phone number');
            return false;
        }

        // General Validation for Empty Fields
        if (!value) {
            setError(field, errorMessage, "Can't be blank");
            return false;
        } else {
            setSuccess(field, errorMessage);
            return true;
        }
    }

    function setError(field, errorMessage, message) {
        field.classList.add('error');
        field.classList.remove('success');
        errorMessage.textContent = message;
        errorMessage.style.visibility = 'visible';
    }

    function setSuccess(field, errorMessage) {
        field.classList.remove('error');
        field.classList.add('success');
        errorMessage.style.visibility = 'hidden';
    }

    // Email validation
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    //phone validation
    function isvalidPhone(phone) {
        return /^(?:\+88|88)?01[3-9]\d{8}$/.test(phone);
    }
});
