// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the form data to a server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', formObject);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        this.appendChild(successMessage);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
        
        this.reset();
    });
}

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'var(--nav-bg)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = 'var(--nav-bg)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    if (section.id !== 'home') { // Skip hero section
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    }
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add typing effect to hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    typeWriter();
}

// Add smooth scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to skill items
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        skill.style.transform = 'scale(1.05)';
    });
    
    skill.addEventListener('mouseleave', () => {
        skill.style.transform = 'scale(1)';
    });
});

// Add hover effect to stat items
document.querySelectorAll('.stat-item').forEach(stat => {
    stat.addEventListener('mouseenter', () => {
        stat.style.transform = 'translateY(-5px)';
    });
    
    stat.addEventListener('mouseleave', () => {
        stat.style.transform = 'translateY(0)';
    });
});

// Cube interaction
const cube = document.querySelector('.cube');
const cubeContainer = document.querySelector('.cube-container');

let mouseX = 0;
let mouseY = 0;
let cubeRotationX = 0;
let cubeRotationY = 0;
let isInteracting = false;
let spinSpeed = 0.015;
let currentSpinX = 0;
let currentSpinY = 0;
let targetRotationX = 0;
let targetRotationY = 0;
let smoothFactor = 0.1;

// Mouse move event listener
document.addEventListener('mousemove', (e) => {
    if (!isInteracting) return;
    
    // Calculate mouse position relative to the center of the viewport
    mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
    
    // Set target rotation based on mouse position
    targetRotationX = mouseY * 2;
    targetRotationY = mouseX * 2;
    
    // Add spin effect
    currentSpinX += spinSpeed;
    currentSpinY += spinSpeed;
});

// Mouse enter event
cubeContainer.addEventListener('mouseenter', () => {
    isInteracting = true;
    cube.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
});

// Mouse leave event
cubeContainer.addEventListener('mouseleave', () => {
    isInteracting = false;
    cube.style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Reset spin
    currentSpinX = 0;
    currentSpinY = 0;
    targetRotationX = 0;
    targetRotationY = 0;
});

// Touch events for mobile
cubeContainer.addEventListener('touchstart', () => {
    isInteracting = true;
    cube.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
});

cubeContainer.addEventListener('touchend', () => {
    isInteracting = false;
    cube.style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
    currentSpinX = 0;
    currentSpinY = 0;
    targetRotationX = 0;
    targetRotationY = 0;
});

// Animation loop
function animateCube() {
    if (isInteracting) {
        // Smoothly interpolate current rotation to target rotation
        cubeRotationX += (targetRotationX - cubeRotationX) * smoothFactor;
        cubeRotationY += (targetRotationY - cubeRotationY) * smoothFactor;
        
        // Add continuous spin while interacting
        cubeRotationX += currentSpinX;
        cubeRotationY += currentSpinY;
    } else {
        // Gradually return to original position
        cubeRotationX *= 0.95;
        cubeRotationY *= 0.95;
    }
    
    // Apply rotation to cube
    cube.style.transform = `rotateX(${cubeRotationX}rad) rotateY(${cubeRotationY}rad)`;
    
    // Continue animation
    requestAnimationFrame(animateCube);
}

// Start animation
animateCube();

// Remove theme-related code
document.addEventListener('DOMContentLoaded', () => {
    // Remove any theme-related code
}); 
