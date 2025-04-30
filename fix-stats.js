document.addEventListener('DOMContentLoaded', function() {
    // Remove duplicate About section
    const aboutSections = document.querySelectorAll('#about');
    if (aboutSections.length > 1) {
        aboutSections[1].remove();
    }
    
    // Fix stats counters
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const count = parseInt(stat.getAttribute('data-count'));
        stat.textContent = count.toString();
    });
    
    // Add animation to skill levels
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(skill => {
        const level = skill.getAttribute('data-level');
        skill.style.width = level + '%';
    });
});