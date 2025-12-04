document.addEventListener("DOMContentLoaded", () => {
    
    // SETUP GSAP
    gsap.registerPlugin(ScrollTrigger);

    // PRELOADER
    const preloaderTl = gsap.timeline();
    preloaderTl
        .to(".loader-progress", { width: "100%", duration: 1.5, ease: "power2.inOut" })
        .to(".loader-content", { opacity: 0, duration: 0.5 })
        .to("#preloader", { y: "-100%", duration: 1, ease: "power4.inOut" })
        .fromTo(".gs-reveal", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }, "-=0.5")
        .fromTo(".gs-reveal-img", { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.8");

    // FILTERING
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.filter-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    gsap.to(item, { display: 'block', opacity: 1, scale: 1, duration: 0.3 });
                } else {
                    gsap.to(item, { display: 'none', opacity: 0, scale: 0.9, duration: 0.3 });
                }
            });
        });
    });

    // EMAIL FORM
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitBtn.innerHTML = 'Sending...';
            submitBtn.style.opacity = '0.7';

            const formData = new FormData(contactForm);

            fetch("https://formsubmit.co/ajax/alphonseniccori123@gmail.com", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                submitBtn.innerHTML = 'Message Sent!';
                submitBtn.style.backgroundColor = '#10b981';
                formStatus.innerHTML = "Thanks! I'll get back to you soon.";
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.innerHTML = 'Send Message';
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.opacity = '1';
                    formStatus.innerHTML = "";
                }, 4000);
            })
            .catch(error => {
                console.error('Error:', error);
                submitBtn.innerHTML = 'Failed. Try Again.';
            });
        });
    }

    // SCROLL ANIMATIONS
    gsap.utils.toArray('.gs-reveal').forEach(element => {
        gsap.fromTo(element, 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 85%" } }
        );
    });
    
    // TILT EFFECT
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelector(".hero-image-wrapper"), { max: 5, speed: 400, glare: true, "max-glare": 0.2 });
    }
});