(function () {
    var form = document.getElementById('booking-form');
    if (!form) return; // safety check if script is loaded on another page by accident

    var successBox = document.getElementById('booking-success');

    function setError(fieldName, message) {
        var wrapper = form.querySelector('.form-field[data-field="' + fieldName + '"]');
        if (!wrapper) return;
        wrapper.classList.add('has-error');
        var msgEl = wrapper.querySelector('.error-message');
        if (msgEl) {
            msgEl.textContent = message || '';
        }
    }

    function clearError(fieldName) {
        var wrapper = form.querySelector('.form-field[data-field="' + fieldName + '"]');
        if (!wrapper) return;
        wrapper.classList.remove('has-error');
        var msgEl = wrapper.querySelector('.error-message');
        if (msgEl) {
            msgEl.textContent = '';
        }
    }

    function clearAllErrors() {
        var fields = form.querySelectorAll('.form-field');
        fields.forEach(function (field) {
            field.classList.remove('has-error');
            var msgEl = field.querySelector('.error-message');
            if (msgEl) msgEl.textContent = '';
        });
    }

    function validateEmail(value) {
        // Simple email pattern
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(value);
    }

    function validatePhone(value) {
        // Allow digits, spaces, +, -, parentheses – must have at least 8 digits
        var digits = (value.match(/\d/g) || []).length;
        return digits >= 8;
    }

    function validateDateNotPast(value) {
        if (!value) return false;
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var chosen = new Date(value + 'T00:00:00');
        return chosen >= today;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        clearAllErrors();
        if (successBox) successBox.classList.remove('show');

        var isValid = true;

        var fullName = form.fullName.value.trim();
        var email = form.email.value.trim();
        var phone = form.phone.value.trim();
        var patientType = form.querySelector('input[name="patientType"]:checked');
        var service = form.service.value;
        var date = form.date.value;
        var timeWindow = form.timeWindow.value;
        var consent = form.consent.checked;

        // Name
        if (!fullName) {
            setError('name', 'Please enter your full name.');
            isValid = false;
        } else if (fullName.length < 3) {
            setError('name', 'Name should be at least 3 characters long.');
            isValid = false;
        }

        // Email
        if (!email) {
            setError('email', 'Please enter your email address.');
            isValid = false;
        } else if (!validateEmail(email)) {
            setError('email', 'Please enter a valid email address.');
            isValid = false;
        }

        // Phone
        if (!phone) {
            setError('phone', 'Please enter your phone number.');
            isValid = false;
        } else if (!validatePhone(phone)) {
            setError('phone', 'Please enter a valid phone number with at least 8 digits.');
            isValid = false;
        }

        // Patient type
        if (!patientType) {
            setError('patientType', 'Please tell us if you are a new or existing patient.');
            isValid = false;
        }

        // Service
        if (!service) {
            setError('service', 'Please choose the service you’re interested in.');
            isValid = false;
        }

        // Date
        if (!date) {
            setError('date', 'Please choose a preferred date.');
            isValid = false;
        } else if (!validateDateNotPast(date)) {
            setError('date', 'Please choose a date that is today or in the future.');
            isValid = false;
        }

        // Time window
        if (!timeWindow) {
            setError('timeWindow', 'Please select a preferred time of day.');
            isValid = false;
        }

        // Consent
        if (!consent) {
            setError('consent', 'We need your consent to contact you about this booking.');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        // Form is valid here
        form.reset();
        if (successBox) {
            successBox.classList.add('show');
            window.scrollTo({
                top: successBox.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
})();
