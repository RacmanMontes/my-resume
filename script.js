
        // Simple script to handle scroll animations
        document.addEventListener('DOMContentLoaded', function() {
            // Handle menu toggle for mobile
            const menuToggle = document.querySelector('.menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            const nav = document.querySelector('nav'); // Get the nav element

            menuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
            });

            // Close mobile menu when clicking a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });

            // Scroll animation handler
            const animateElements = document.querySelectorAll('.animate-on-scroll');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, {
                threshold: 0.1
            });

            animateElements.forEach(element => {
                observer.observe(element);
            });

            // Animate skill bars on scroll
            const skillBars = document.querySelectorAll('.skill-progress');
            const skillBarObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.target.style.width === '0px') { // Check if it hasn't animated yet
                        const width = entry.target.getAttribute('data-width');
                        entry.target.style.width = width;
                    }
                });
            }, {
                threshold: 0.5
            });

            skillBars.forEach(bar => {
                bar.style.width = '0px'; // Ensure initial state is 0
                skillBarObserver.observe(bar);
            });

            // Typing effect for hero subtitle
            const subtitle = document.querySelector('.hero .subtitle');
            if (subtitle) { // Check if subtitle exists before animating
                const text = subtitle.textContent;
                subtitle.textContent = '';

                let i = 0;
                const typeWriter = () => {
                    if (i < text.length) {
                        subtitle.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, 50);
                    }
                };
                setTimeout(typeWriter, 1000);
            }

            // Add some interactive particles (simple version)
            const createParticle = () => {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.background = 'rgba(99, 102, 241, 0.6)';
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '999';
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.top = '100vh';

                document.body.appendChild(particle);

                const animation = particle.animate([
                    { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                    { transform: `translateY(-100vh) rotate(360deg)`, opacity: 0 }
                ], {
                    duration: Math.random() * 3000 + 2000,
                    easing: 'linear'
                });

                animation.onfinish = () => particle.remove();
            };

            // Create particles occasionally
            setInterval(createParticle, 2000);

            // Dynamic Active Navigation Link on Scroll
            const sections = document.querySelectorAll('section');
            const navLinksElements = document.querySelectorAll('.nav-links a');

            const highlightNavOnScroll = () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - nav.offsetHeight;
                    const sectionHeight = section.clientHeight;
                    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                        current = section.getAttribute('id');
                    }
                });

                navLinksElements.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(current)) {
                        link.classList.add('active');
                    }
                });
            };

            window.addEventListener('scroll', highlightNavOnScroll);
            highlightNavOnScroll(); // Call on load to set initial active section
        });
    