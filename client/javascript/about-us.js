document.addEventListener("DOMContentLoaded", () => {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Toggle visibility of additional information
    const infoButtons = document.querySelectorAll('.info-toggle');
    infoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            targetElement.classList.toggle('hidden');
            button.textContent = targetElement.classList.contains('hidden') ? 'Show More' : 'Show Less';
        });
    });

    // Add a simple form validation for the contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Add a simple animation to the team member cards
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.style.transform = 'scale(1.05)';
            member.style.transition = 'transform 0.3s ease-in-out';
        });
        member.addEventListener('mouseleave', () => {
            member.style.transform = 'scale(1)';
        });
    });
});
