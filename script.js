document.addEventListener("DOMContentLoaded", function () {
    
    // 1. PRELOADER HANDLING
    // ===========================================
    const preloader = document.getElementById('preloader');
    const progressBar = document.querySelector('.loader-progress');
    
    if (preloader) {
        // Simulate loading
        setTimeout(() => { progressBar.style.width = "50%"; }, 200);
        setTimeout(() => { progressBar.style.width = "100%"; }, 800);
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    initAnimations(); // Start site animations after load
                }, 500);
            }, 1000);
        });
    } else {
        initAnimations();
    }

    // 2. GSAP SCROLL ANIMATIONS
    // ===========================================
    gsap.registerPlugin(ScrollTrigger);

    function initAnimations() {
        // Hero Text Reveal
        gsap.from(".gs-reveal", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Hero Image Reveal
        gsap.from(".gs-reveal-img", {
            x: 50,
            opacity: 0,
            duration: 1.2,
            delay: 0.5,
            ease: "power2.out"
        });

        // Scroll Triggers for Sections
        gsap.utils.toArray('.section-padding').forEach(section => {
            gsap.from(section.querySelectorAll('.gs-reveal'), {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1
            });
        });
    }

    // 3. PROJECT FILTERING LOGIC
    // ===========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.filter-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                // We need to target the parent COL to hide spacing correctly in Bootstrap
                const parentCol = item.closest('.col-md-6') || item; 

                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    // Show
                    gsap.to(parentCol, { 
                        display: "block", 
                        opacity: 1, 
                        scale: 1, 
                        duration: 0.3 
                    });
                } else {
                    // Hide
                    gsap.to(parentCol, { 
                        display: "none", 
                        opacity: 0, 
                        scale: 0.8, 
                        duration: 0.3 
                    });
                }
            });
        });
    });

    // 4. MAGNETIC BUTTON EFFECT
    // ===========================================
    const magnets = document.querySelectorAll('.magnetic');
    
    magnets.forEach((magnet) => {
        magnet.addEventListener('mousemove', (e) => {
            const position = magnet.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;

            magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });

        magnet.addEventListener('mouseout', () => {
            magnet.style.transform = 'translate(0px, 0px)';
        });
    });

    // 5. TILT EFFECT FOR HERO IMAGE
    // ===========================================
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelector(".hero-image-wrapper"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.2
        });
    }

    // 6. CONTACT FORM HANDLING
    // ===========================================
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = document.getElementById('submitBtn');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;

            // Simulate sending (Replace this with actual API call)
            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.backgroundColor = '#10b981'; // Green
                formStatus.innerHTML = '<span class="text-success">Thanks! I will get back to you soon.</span>';
                form.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = ''; 
                    formStatus.innerHTML = '';
                }, 3000);
            }, 1500);
        });
    }

    // 7. NAVBAR SCROLL EFFECT
    // ===========================================
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.glass-nav');
        if (window.scrollY > 50) {
            nav.classList.add('shadow-sm');
            nav.style.padding = '0.5rem 0';
        } else {
            nav.classList.remove('shadow-sm');
            nav.style.padding = '1rem 0';
        }
    });

});