document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const searchInput = document.getElementById('movie-search-input');
    const movieCards = document.querySelectorAll('.movie-card');
    const noMoviesMsg = document.getElementById('no-movies-msg');
    const moviesSection = document.getElementById('movies');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            let matches = 0;

            movieCards.forEach(card => {
                const title = (card.getAttribute('data-title') || '').toLowerCase();
                if (title.includes(query)) {
                    card.classList.remove('hidden');
                    matches++;
                } else {
                    card.classList.add('hidden');
                }
            });

            if (noMoviesMsg) {
                noMoviesMsg.style.display = matches === 0 ? 'block' : 'none';
            }

            if (query.length > 0 && moviesSection) {
                moviesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    const moviesRow = document.getElementById('movies-row');
    const slideLeftBtn = document.getElementById('slide-left');
    const slideRightBtn = document.getElementById('slide-right');

    if (slideLeftBtn && moviesRow) {
        slideLeftBtn.addEventListener('click', () => {
            moviesRow.scrollBy({ left: -300, behavior: 'smooth' });
        });
    }

    if (slideRightBtn && moviesRow) {
        slideRightBtn.addEventListener('click', () => {
            moviesRow.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }

    let isDown = false, startX, scrollLeft;
    if (moviesRow) {
        moviesRow.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - moviesRow.offsetLeft;
            scrollLeft = moviesRow.scrollLeft;
        });
        moviesRow.addEventListener('mouseleave', () => isDown = false);
        moviesRow.addEventListener('mouseup', () => isDown = false);
        moviesRow.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - moviesRow.offsetLeft;
            moviesRow.scrollLeft = scrollLeft - (x - startX) * 1.5;
        });
    }

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-btn');
        const ans = item.querySelector('.faq-ans');
        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            faqItems.forEach(other => {
                other.classList.remove('active');
                other.querySelector('.faq-ans').style.maxHeight = null;
            });
            if (!isOpen) {
                item.classList.add('active');
                ans.style.maxHeight = ans.scrollHeight + "px";
            }
        });
    });

    const heroForm = document.getElementById('hero-form');
    const faqForm = document.getElementById('faq-form');
    const signinForm = document.getElementById('signin-form');
    const signinEmail = document.getElementById('signin-email');

    function handleGetStarted(e, inputId) {
        e.preventDefault();
        const email = document.getElementById(inputId).value;
        if (email) {
            signinEmail.value = email;
            document.getElementById('login').scrollIntoView({ behavior: 'smooth' });
        }
    }

    if (heroForm) heroForm.addEventListener('submit', (e) => handleGetStarted(e, 'hero-email'));
    if (faqForm) faqForm.addEventListener('submit', (e) => handleGetStarted(e, 'faq-email'));

    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('signin-password');
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            togglePassword.classList.toggle('fa-eye', isPassword);
            togglePassword.classList.toggle('fa-eye-slash', !isPassword);
        });
    }

    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = signinEmail.value || 'User';
            alert(`Demo Sign In Successful! Welcome back, ${email}`);
            signinForm.reset();
            if (passwordInput && togglePassword) {
                passwordInput.type = 'password';
                togglePassword.classList.remove('fa-eye');
                togglePassword.classList.add('fa-eye-slash');
            }
        });
    }

    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            alert(`Language selected: ${e.target.options[e.target.selectedIndex].text}`);
        });
    }
});
