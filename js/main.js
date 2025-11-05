// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger menu
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bar.style.transform = '';
            bar.style.opacity = '';
        }
    });
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = '';
            bar.style.opacity = '';
        });
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }

    lastScroll = currentScroll;
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth loading for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });

    // Add skip link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// Add skip link styles
const skipLinkStyles = `
<style>
.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary-color);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 3000;
    transition: top 0.3s;
}

.skip-link:focus {
    top: 6px;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', skipLinkStyles);

// Patient Inquiry Form Handler
function initializePatientInquiryForm() {
    const form = document.getElementById('patientInquiryForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const formMessage = document.getElementById('formMessage');

        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        formMessage.style.display = 'none';

        try {
            // Collect form data
            const formData = new FormData(form);
            const inquiryData = {
                parentName: formData.get('parentName'),
                phoneNumber: formData.get('phoneNumber'),
                email: formData.get('email'),
                patientName: formData.get('patientName'),
                dateOfBirth: formData.get('dateOfBirth'),
                californiaResident: formData.get('californiaResident'),
                concerns: formData.get('concerns'),
                afterHours: formData.get('afterHours') === 'yes' ? 'Yes' : 'No',
                questions: formData.get('questions') === 'yes' ? 'Yes' : 'No',
                submittedAt: new Date().toISOString()
            };

            // Validation
            if (!inquiryData.parentName || !inquiryData.phoneNumber || !inquiryData.email ||
                !inquiryData.patientName || !inquiryData.dateOfBirth || !inquiryData.concerns) {
                throw new Error('Please fill in all required fields.');
            }

            if (inquiryData.californiaResident !== 'yes') {
                throw new Error('At this time, we only serve patients located in California. Please check back if our service area expands.');
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(inquiryData.email)) {
                throw new Error('Please enter a valid email address.');
            }

            // Send inquiry
            await sendPatientInquiry(inquiryData);

            // Success message
            formMessage.innerHTML = `
                <strong>🎉 Thank you for your inquiry!</strong><br><br>
                We've received your information and will contact you soon about our Early January 2026 launch.<br>
                You're now on our priority list for HouseCall for Kids virtual pediatric urgent care services.
            `;
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            form.reset();

        } catch (error) {
            // Error message
            formMessage.innerHTML = `<strong>❌ Error:</strong> ${error.message}`;
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
        } finally {
            // Reset loading state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    });
}

async function sendPatientInquiry(data) {
    const response = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send inquiry. Please try again.');
    }

    return response.json();
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializePatientInquiryForm();
});

console.log('HouseCall for Kids website loaded successfully!');