// Typing effect
const texts = ['Web Developer', 'Designer', 'Freelancer'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

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

// Start typing effect when page loads
window.onload = type;

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Update aria-expanded attribute
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
});

// Close menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        
        // Smooth scroll to section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Message sent successfully!');
    this.reset();
});

const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('light-mode')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'light') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}

// No JavaScript needed for the rotating animation as it's now handled by CSS

document.addEventListener('DOMContentLoaded', function() {
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach((icon, index) => {
        // Calculate angle for even distribution
        const angle = (index * 45) % 360; // 360/8 = 45 degrees between each icon
        
        // Position each icon - reduced to 55px to overlap with profile
        icon.style.transform = `
            rotate(${angle}deg) 
            translateX(55px) 
            rotate(-${angle}deg)
        `;
    });
});

// Scroll animation for timeline cards
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

let currentStep = 'name';
const steps = ['name', 'email', 'message'];

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showError(stepId, message) {
    const errorElement = document.getElementById(`${stepId}Error`);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(stepId) {
    const errorElement = document.getElementById(`${stepId}Error`);
    errorElement.style.display = 'none';
}

function updateDots(stepIndex) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === stepIndex);
    });
}

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

function prevStep(currentStepId) {
    const currentIndex = steps.indexOf(currentStepId);
    if (currentIndex > 0) {
        document.getElementById(`${currentStepId}Step`).classList.remove('active');
        document.getElementById(`${steps[currentIndex - 1]}Step`).classList.add('active');
        currentStep = steps[currentIndex - 1];
        updateDots(currentIndex - 1);
    }
}

function submitForm() {
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const message = document.getElementById('messageInput').value;

    if (!message.trim()) {
        showError('message', 'Please enter your message');
        return;
    }

    // Create mailto link
    const mailtoLink = `mailto:jmukunzindahiro@gmail.com?subject=Contact from ${name}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    )}`;

    // Open default email client
    window.location.href = mailtoLink;

    // Reset form
    document.getElementById('contactForm').reset();
    document.getElementById('messageStep').classList.remove('active');
    document.getElementById('nameStep').classList.add('active');
    currentStep = 'name';
    updateDots(0);

    // Show success message (you can customize this)
    alert('Thank you for your message! Your email client should open to send the email.');
}

function handleNameInput() {
    const nameInput = document.getElementById('nameInput');
    const nameNextBtn = document.getElementById('nameNextBtn');
    const nameError = document.getElementById('nameError');
    
    // Enable next button if name has at least 2 characters
    if (nameInput.value.trim().length >= 2) {
        nameNextBtn.disabled = false;
        nameError.style.display = 'none';
    } else {
        nameNextBtn.disabled = true;
        nameError.style.display = 'block';
    }
}

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

// Update the email step HTML to include onkeyup
document.getElementById('emailInput').addEventListener('keyup', handleEmailInput);

// Update the message step validation
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

// Add this to your email step HTML
document.getElementById('messageInput').addEventListener('keyup', handleMessageInput);

// Update active nav link based on scroll position
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

// Add scroll event listener
window.addEventListener('scroll', updateActiveNavLink);

// Add smooth scrolling to nav links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Set home as active by default when page loads
window.addEventListener('load', () => {
    document.querySelector('.nav-links a[href="#home"]').classList.add('active');
});
