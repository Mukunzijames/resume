// Text animation variables for the typing effect
const texts = ['Web Developer', 'Designer', 'Freelancer'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

// Creates a typing animation effect for the hero section text
function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.getElementById('typing-text').textContent = letter;
    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000);
    } else {
        setTimeout(type, 100);
    }
}

// Start typing animation when page loads
window.onload = type;

// Enable smooth scrolling for all navigation links that point to page sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu variables
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

// Toggle mobile menu when hamburger icon is clicked
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
});

// Close mobile menu when a navigation link is clicked and scroll to section
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Close mobile menu when clicking outside of it
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Handle contact form submission and show success message
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Message sent successfully!');
    this.reset();
});

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Load saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');

// Switch between light and dark themes when toggle button is clicked
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('light-mode')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
});

// Update theme icon based on current theme
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'light') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}

// Position technology icons in a circular pattern
document.addEventListener('DOMContentLoaded', function() {
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach((icon, index) => {
        const angle = (index * 45) % 360; // 360/8 = 45 degrees between each icon
        
        icon.style.transform = `
            rotate(${angle}deg) 
            translateX(55px) 
            rotate(-${angle}deg)
        `;
    });
});

// Add animation to timeline cards when they become visible
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.timeline-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        observer.observe(card);
    });
});

// Multi-step form variables
let currentStep = 'name';
const steps = ['name', 'email', 'message'];

// Validate email format using regex
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Display error message for form fields
function showError(stepId, message) {
    const errorElement = document.getElementById(`${stepId}Error`);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Hide error message for form fields
function hideError(stepId) {
    const errorElement = document.getElementById(`${stepId}Error`);
    errorElement.style.display = 'none';
}

// Update progress dots in multi-step form
function updateDots(stepIndex) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === stepIndex);
    });
}

// Move to next step in form after validation
function nextStep(currentStepId) {
    const currentInput = document.getElementById(`${currentStepId}Input`);
    
    if (!currentInput.value.trim()) {
        showError(currentStepId, `Please enter your ${currentStepId}`);
        return;
    }

    if (currentStepId === 'email' && !validateEmail(currentInput.value)) {
        showError('email', 'Please enter a valid email address');
        return;
    }

    hideError(currentStepId);
    
    const currentIndex = steps.indexOf(currentStepId);
    if (currentIndex < steps.length - 1) {
        document.getElementById(`${currentStepId}Step`).classList.remove('active');
        document.getElementById(`${steps[currentIndex + 1]}Step`).classList.add('active');
        currentStep = steps[currentIndex + 1];
        updateDots(currentIndex + 1);
    }
}

// Move to previous step in form
function prevStep(currentStepId) {
    const currentIndex = steps.indexOf(currentStepId);
    if (currentIndex > 0) {
        document.getElementById(`${currentStepId}Step`).classList.remove('active');
        document.getElementById(`${steps[currentIndex - 1]}Step`).classList.add('active');
        currentStep = steps[currentIndex - 1];
        updateDots(currentIndex - 1);
    }
}

// Handle form submission and send email
function submitForm() {
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const message = document.getElementById('messageInput').value;

    if (!message.trim()) {
        showError('message', 'Please enter your message');
        return;
    }

    const mailtoLink = `mailto:jmukunzindahiro@gmail.com?subject=Contact from ${name}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    )}`;

    window.location.href = mailtoLink;

    document.getElementById('contactForm').reset();
    document.getElementById('messageStep').classList.remove('active');
    document.getElementById('nameStep').classList.add('active');
    currentStep = 'name';
    updateDots(0);

    alert('Thank you for your message! Your email client should open to send the email.');
}

// Validate name input in real-time
function handleNameInput() {
    const nameInput = document.getElementById('nameInput');
    const nameNextBtn = document.getElementById('nameNextBtn');
    const nameError = document.getElementById('nameError');
    
    if (nameInput.value.trim().length >= 2) {
        nameNextBtn.disabled = false;
        nameError.style.display = 'none';
    } else {
        nameNextBtn.disabled = true;
        nameError.style.display = 'block';
    }
}

// Validate email input in real-time
function handleEmailInput() {
    const emailInput = document.getElementById('emailInput');
    const emailNextBtn = document.getElementById('emailNextBtn');
    const emailError = document.getElementById('emailError');
    
    if (validateEmail(emailInput.value.trim())) {
        emailNextBtn.disabled = false;
        emailError.style.display = 'none';
    } else {
        emailNextBtn.disabled = true;
        if (emailInput.value.trim() !== '') {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
        } else {
            emailError.textContent = 'Please enter your email';
            emailError.style.display = 'block';
        }
    }
}

// Add email input validation listener
document.getElementById('emailInput').addEventListener('keyup', handleEmailInput);

// Validate message input in real-time
function handleMessageInput() {
    const messageInput = document.getElementById('messageInput');
    const submitBtn = document.getElementById('submitBtn');
    const messageError = document.getElementById('messageError');
    
    if (messageInput.value.trim().length >= 10) {
        submitBtn.disabled = false;
        messageError.style.display = 'none';
    } else {
        submitBtn.disabled = true;
        messageError.style.display = 'block';
        messageError.textContent = 'Please enter a message (minimum 10 characters)';
    }
}

// Add message input validation listener
document.getElementById('messageInput').addEventListener('keyup', handleMessageInput);

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight/3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener to update active navigation link
window.addEventListener('scroll', updateActiveNavLink);

// Add smooth scrolling to navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Set home link as active when page loads
window.addEventListener('load', () => {
    document.querySelector('.nav-links a[href="#home"]').classList.add('active');
});
