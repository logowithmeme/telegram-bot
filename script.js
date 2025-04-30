// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Three.js background
    initThreeJsBackground();
    
    // Initialize skill bars
    initSkillBars();
    
    // Initialize stat counters
    initStatCounters();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
});

// Three.js background animation
function initThreeJsBackground() {
    const canvas = document.getElementById('hero-canvas');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    // Fill positions and colors arrays
    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Positions - random in a sphere
        posArray[i] = (Math.random() - 0.5) * 10;
        posArray[i + 1] = (Math.random() - 0.5) * 10;
        posArray[i + 2] = (Math.random() - 0.5) * 10;
        
        // Colors - cyan, magenta, yellow
        const colorChoice = Math.random();
        if (colorChoice < 0.33) {
            // Cyan
            colorsArray[i] = 0;
            colorsArray[i + 1] = 1;
            colorsArray[i + 2] = 1;
        } else if (colorChoice < 0.66) {
            // Magenta
            colorsArray[i] = 1;
            colorsArray[i + 1] = 0;
            colorsArray[i + 2] = 1;
        } else {
            // Yellow
            colorsArray[i] = 1;
            colorsArray[i + 1] = 1;
            colorsArray[i + 2] = 0;
        }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    // Material for particles
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    // Create the particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Position camera
    camera.position.z = 5;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate particles based on mouse position
        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.001;
        
        particlesMesh.rotation.x += mouseY * 0.001;
        particlesMesh.rotation.y += mouseX * 0.001;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize skill bars animation
function initSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    // Set up Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.width = `${level}%`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe each skill level element
    skillLevels.forEach(skill => {
        observer.observe(skill);
    });
}

// Initialize stat counters animation
// Fix the stat counters initialization function
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Set up Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                const duration = 1000; // 1 second (faster animation)
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const timer = setInterval(() => {
                    current += increment;
                    entry.target.textContent = Math.floor(current);
                    
                    if (current >= target) {
                        entry.target.textContent = target;
                        clearInterval(timer);
                    }
                }, 16);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Lower threshold to trigger earlier
    
    // Observe each stat number element
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for header height
                behavior: 'smooth'
            });
        });
    });
}

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        // For now, just show a success message
        alert(`Thanks for your message, ${name}! I'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Add parallax effect to sections
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    // Apply parallax effect to different elements
    document.querySelectorAll('.section-title').forEach(title => {
        const speed = 0.2;
        title.style.transform = `translateX(-50%) translateY(${scrollPosition * speed}px)`;
    });
});

// Add this to your existing script.js file

// Initialize animated background
function initAnimatedBackground() {
    // This function will be called when the DOM is loaded
    // The animated background is created using CSS, so no additional JS is needed
    console.log("Animated background initialized");
}

// Make sure to call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Your existing initialization functions
    initStatCounters();
    initSmoothScrolling();
    initTimelineAnimations();
    initExperienceAnimations();
    initCompetitionAnimations();
    initInterestsAnimations();
    initPageTransitions();
    
    // Add animated background initialization
    initAnimatedBackground();
});

// Initialize timeline animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize experience card animations
function initExperienceAnimations() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    experienceCards.forEach(card => {
        observer.observe(card);
    });
}

// Initialize competition item animations
function initCompetitionAnimations() {
    const competitionItems = document.querySelectorAll('.competition-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    competitionItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize language and hobby item animations
function initInterestsAnimations() {
    const languageItems = document.querySelectorAll('.language-item');
    const hobbyItems = document.querySelectorAll('.hobby-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    languageItems.forEach(item => {
        observer.observe(item);
    });
    
    hobbyItems.forEach(item => {
        observer.observe(item);
    });
}

// Add CSS classes for animations
document.head.insertAdjacentHTML('beforeend', `
<style>
.animate-in {
    animation: slideIn 0.5s ease-out forwards;
}

@keyframes slideIn {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
}

.section-visible {
    animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

.experience-card, .competition-item, .language-item, .hobby-item {
    opacity: 0;
}

.timeline-item {
    opacity: 0;
    transition: opacity 0.5s ease-out;
}

/* Add neon pulse animation for interactive elements */
@keyframes neonPulse {
    0%, 100% { box-shadow: 0 0 5px var(--primary-color); }
    50% { box-shadow: 0 0 20px var(--primary-color), 0 0 30px var(--secondary-color); }
}

.project-card:hover, .experience-card:hover, .competition-item:hover, .language-item:hover, .hobby-item:hover {
    animation: neonPulse 2s infinite;
}

/* Add typing animation for hero section */
@keyframes typing {
    from { width: 0 }
    to { width: 100% }
}

.typing-animation {
    overflow: hidden;
    white-space: nowrap;
    animation: typing 3.5s steps(40, end);
}

/* Add floating animation for 3D elements */
@keyframes floating {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
}

.floating {
    animation: floating 6s ease-in-out infinite;
}

/* Add data grid animation */
@keyframes dataGrid {
    0% { background-position: 0% 0%; }
    100% { background-position: 100% 100%; }
}

.data-grid-bg {
    background-image: linear-gradient(45deg, rgba(0, 255, 255, 0.05) 25%, transparent 25%, transparent 75%, rgba(0, 255, 255, 0.05) 75%),
                     linear-gradient(45deg, rgba(0, 255, 255, 0.05) 25%, transparent 25%, transparent 75%, rgba(0, 255, 255, 0.05) 75%);
    background-size: 60px 60px;
    background-position: 0 0, 30px 30px;
    animation: dataGrid 20s linear infinite;
}
</style>
`);

// Add page transition effects
function initPageTransitions() {
    const transitionElement = document.createElement('div');
    transitionElement.className = 'page-transition';
    document.body.appendChild(transitionElement);
    
    // Style for transition element
    document.head.insertAdjacentHTML('beforeend', `
    <style>
    .page-transition {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--background-color);
        z-index: 9999;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    
    .page-transition.active {
        opacity: 1;
    }
    
    .page-transition::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        border: 3px solid transparent;
        border-top-color: var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
    </style>
    `);
    
    // Add transition between sections
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            
            // Show transition
            transitionElement.classList.add('active');
            
            // Navigate after delay
            setTimeout(() => {
                window.location.hash = target;
                
                // Scroll to section
                const targetElement = document.querySelector(target);
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'auto'
                });
                
                // Hide transition
                setTimeout(() => {
                    transitionElement.classList.remove('active');
                }, 300);
            }, 500);
        });
    });
}

// Add 3D tilt effect to cards
function init3DTiltEffect() {
    const cards = document.querySelectorAll('.project-card, .experience-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            const maxRotate = 10; // max rotation in degrees
            const rotateX = (0.5 - yPercent) * maxRotate;
            const rotateY = (xPercent - 0.5) * maxRotate;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            
            // Add highlight effect
            const glareElement = this.querySelector('.card-glare') || document.createElement('div');
            if (!this.querySelector('.card-glare')) {
                glareElement.className = 'card-glare';
                this.appendChild(glareElement);
                
                // Add glare styles
                document.head.insertAdjacentHTML('beforeend', `
                <style>
                .card-glare {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle at ${xPercent * 100}% ${yPercent * 100}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 60%);
                    pointer-events: none;
                    z-index: 10;
                    border-radius: inherit;
                }
                </style>
                `);
            }
            
            glareElement.style.background = `radial-gradient(circle at ${xPercent * 100}% ${yPercent * 100}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 60%)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            const glareElement = this.querySelector('.card-glare');
            if (glareElement) {
                glareElement.remove();
            }
        });
    });
}

// Add these to your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Existing initializations
    initThreeJsBackground();
    initSkillBars();
    initStatCounters();
    initSmoothScrolling();
    
    // New initializations
    initTimelineAnimations();
    initExperienceAnimations();
    initCompetitionAnimations();
    initInterestsAnimations();
    initPageTransitions();
    init3DTiltEffect();
    
    // Add data grid background to sections
    document.querySelectorAll('.education-section, .skills-section').forEach(section => {
        section.classList.add('data-grid-bg');
    });
    
    // Add floating animation to some elements (but not to section titles that should stay in place)
    document.querySelectorAll('.image-container').forEach(element => {
        element.classList.add('floating');
    });
    
    // Add typing animation to subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        subtitle.classList.add('typing-animation');
    }
    
    // Add scroll-triggered animations
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Add a new function to fix section order
function fixSectionOrder() {
    // Fix section order
    const main = document.querySelector('main');
    if (!main) return;
    
    // Get all sections
    const hero = document.getElementById('home');
    const about = document.getElementById('about');
    const education = document.getElementById('education');
    const projects = document.getElementById('projects');
    const experience = document.getElementById('experience');
    const competitions = document.getElementById('competitions');
    const interests = document.getElementById('interests');
    const contact = document.getElementById('contact');
    
    // Clear main content
    main.innerHTML = '';
    
    // Add sections in the correct order
    if (hero) main.appendChild(hero);
    if (about) main.appendChild(about);
    if (education) main.appendChild(education);
    if (projects) main.appendChild(projects);
    if (experience) main.appendChild(experience);
    if (competitions) main.appendChild(competitions);
    if (interests) main.appendChild(interests);
    if (contact) main.appendChild(contact);
    
    // Fix duplicate about sections if any
    const aboutSections = document.querySelectorAll('#about');
    if (aboutSections.length > 1) {
        for (let i = 1; i < aboutSections.length; i++) {
            aboutSections[i].remove();
        }
    }
    
    // Make sure project section has a heading
    if (projects && !projects.querySelector('.section-title')) {
        const projectsContainer = projects.querySelector('.container');
        if (projectsContainer) {
            projectsContainer.insertAdjacentHTML('afterbegin', '<h2 class="section-title">Featured Projects</h2>');
        }
    }
    
    // Make sure languages and interests sections have content
    if (interests) {
        const languagesContainer = interests.querySelector('.languages-container');
        if (languagesContainer && languagesContainer.querySelectorAll('.language-item').length === 0) {
            const languageItems = `
                <div class="language-item">
                    <span class="language-name">Telugu</span>
                    <span class="language-level">Highly Proficient</span>
                </div>
                <div class="language-item">
                    <span class="language-name">Hindi</span>
                    <span class="language-level">Highly Proficient</span>
                </div>
                <div class="language-item">
                    <span class="language-name">English</span>
                    <span class="language-level">Highly Proficient</span>
                </div>
                <div class="language-item">
                    <span class="language-name">Marathi</span>
                    <span class="language-level">Highly Proficient</span>
                </div>
            `;
            const languageItemsContainer = interests.querySelector('.language-items');
            if (languageItemsContainer) {
                languageItemsContainer.innerHTML = languageItems;
            }
        }
        
        const hobbiesContainer = interests.querySelector('.hobbies-container');
        if (hobbiesContainer && hobbiesContainer.querySelectorAll('.hobby-item').length === 0) {
            const hobbyItems = `
                <div class="hobby-item">
                    <i class="fas fa-book"></i>
                    <div class="hobby-content">
                        <h4>Reading & Writing</h4>
                        <p>Passion for hacking books & cybersecurity research</p>
                    </div>
                </div>
                <div class="hobby-item">
                    <i class="fas fa-robot"></i>
                    <div class="hobby-content">
                        <h4>Building & Creating</h4>
                        <p>Love to experiment with robotics, AI, and automation</p>
                    </div>
                </div>
                <div class="hobby-item">
                    <i class="fas fa-code"></i>
                    <div class="hobby-content">
                        <h4>Creative Web Development</h4>
                        <p>Passionate about creating innovative, futuristic web experiences</p>
                    </div>
                </div>
            `;
            const hobbyItemsContainer = interests.querySelector('.hobby-items');
            if (hobbyItemsContainer) {
                hobbyItemsContainer.innerHTML = hobbyItems;
            }
        }
    }
    
    // Update stat counters with correct values
    const projectsCount = document.querySelector('.stat-number[data-count="0"]');
    if (projectsCount) projectsCount.setAttribute('data-count', '3');
    
    const experienceCount = document.querySelector('.stat-number[data-count="0"]:not([data-count="3"])');
    if (experienceCount) experienceCount.setAttribute('data-count', '1');
    
    const languagesCount = document.querySelector('.stat-number:not([data-count="3"]):not([data-count="1"])');
    if (languagesCount) languagesCount.setAttribute('data-count', '4');
}