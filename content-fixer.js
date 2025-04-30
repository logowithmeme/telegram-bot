// Add this to your existing script.js file or create a new file and include it in your HTML

document.addEventListener('DOMContentLoaded', function() {
    // Fix duplicate about sections
    const aboutSections = document.querySelectorAll('.about-section');
    if (aboutSections.length > 1) {
        for (let i = 1; i < aboutSections.length; i++) {
            aboutSections[i].remove();
        }
    }
    
    // Update stats counters with correct values
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        if (stat.textContent === '0') {
            const dataCount = stat.getAttribute('data-count');
            if (!dataCount || dataCount === '0') {
                // Set appropriate values based on the stat label
                const label = stat.nextElementSibling.textContent.toLowerCase();
                if (label.includes('project')) {
                    stat.setAttribute('data-count', '3');
                } else if (label.includes('language')) {
                    stat.setAttribute('data-count', '4');
                } else if (label.includes('experience')) {
                    stat.setAttribute('data-count', '1');
                }
            }
        }
    });
    
    // Ensure hobbies content is present
    const hobbyItems = document.querySelector('.hobby-items');
    if (hobbyItems && hobbyItems.children.length === 0) {
        hobbyItems.innerHTML = `
            <div class="hobby-item" style="--i:0">
                <i class="fas fa-book"></i>
                <div class="hobby-content">
                    <h4>Reading & Writing</h4>
                    <p>Passion for hacking books & cybersecurity research</p>
                </div>
            </div>
            <div class="hobby-item" style="--i:1">
                <i class="fas fa-robot"></i>
                <div class="hobby-content">
                    <h4>Building & Creating</h4>
                    <p>Love to experiment with robotics, AI, and automation</p>
                </div>
            </div>
            <div class="hobby-item" style="--i:2">
                <i class="fas fa-code"></i>
                <div class="hobby-content">
                    <h4>Creative Web Development</h4>
                    <p>Passionate about creating innovative, futuristic web experiences</p>
                </div>
            </div>
        `;
    }
    
    // Ensure languages content is present
    const languageItems = document.querySelector('.language-items');
    if (languageItems && languageItems.children.length === 0) {
        languageItems.innerHTML = `
            <div class="language-item" style="--i:0">
                <span class="language-name">Telugu</span>
                <span class="language-level">Highly Proficient</span>
            </div>
            <div class="language-item" style="--i:1">
                <span class="language-name">Hindi</span>
                <span class="language-level">Highly Proficient</span>
            </div>
            <div class="language-item" style="--i:2">
                <span class="language-name">English</span>
                <span class="language-level">Highly Proficient</span>
            </div>
            <div class="language-item" style="--i:3">
                <span class="language-name">Marathi</span>
                <span class="language-level">Highly Proficient</span>
            </div>
        `;
    }
    
    // Ensure internship experience content is present
    const experienceContainer = document.querySelector('.experience-container');
    if (experienceContainer && experienceContainer.children.length === 0) {
        experienceContainer.innerHTML = `
            <div class="experience-card">
                <div class="experience-header">
                    <h3>USAR Research Intern</h3>
                    <span class="experience-date">June 2024 – July 2024 | Delhi</span>
                </div>
                <div class="experience-content">
                    <ul class="experience-list">
                        <li>Worked on Power Grid Management using Digital Twin Technology under professor guidance</li>
                        <li>Gained expertise in real-time monitoring, simulation, and optimization of power systems</li>
                        <li>Developed AI-driven solutions for energy management and automation</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    // Ensure competitions content is present
    const competitionsContainer = document.querySelector('.competitions-container');
    if (competitionsContainer && competitionsContainer.children.length === 0) {
        competitionsContainer.innerHTML = `
            <div class="competition-item" style="--i:0">
                <i class="fas fa-trophy"></i>
                <div class="competition-content">
                    <p>Regular participant in Indian government tech competitions & hackathons</p>
                </div>
            </div>
            <div class="competition-item" style="--i:1">
                <i class="fas fa-globe-asia"></i>
                <div class="competition-content">
                    <p>Engaged in Japanese technology expos & innovation events in Delhi</p>
                </div>
            </div>
            <div class="competition-item" style="--i:2">
                <i class="fas fa-laptop-code"></i>
                <div class="competition-content">
                    <p>Attend technical workshops and competitions every weekend to stay updated</p>
                </div>
            </div>
        `;
    }
    
    // Make sure all sections have proper titles
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const id = section.id;
        const container = section.querySelector('.container');
        
        if (container && !container.querySelector('.section-title')) {
            let title = '';
            
            switch(id) {
                case 'projects':
                    title = 'Featured Projects';
                    break;
                case 'experience':
                    title = 'Internship Experience';
                    break;
                case 'competitions':
                    title = 'Competitions & Events';
                    break;
                case 'interests':
                    title = 'Languages & Interests';
                    break;
                case 'about':
                    title = 'About Me';
                    break;
                case 'education':
                    title = 'Education';
                    break;
                case 'skills':
                    title = 'Technical Skills';
                    break;
                case 'contact':
                    title = 'Get In Touch';
                    break;
            }
            
            if (title) {
                container.insertAdjacentHTML('afterbegin', `<h2 class="section-title">${title}</h2>`);
            }
        }
    });
    
    // Fix section order
    const main = document.querySelector('main');
    if (main) {
        const sectionOrder = [
            'home',
            'about',
            'education',
            'projects',
            'experience',
            'competitions',
            'interests',
            'skills',
            'contact'
        ];
        
        // Create a document fragment to hold the reordered sections
        const fragment = document.createDocumentFragment();
        
        // Add sections in the correct order
        sectionOrder.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                fragment.appendChild(section);
            }
        });
        
        // Clear main and append the reordered sections
        main.innerHTML = '';
        main.appendChild(fragment);
    }
});