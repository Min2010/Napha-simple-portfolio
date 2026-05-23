// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');
const mobileIcon = themeToggleMobileBtn ? themeToggleMobileBtn.querySelector('.theme-icon') : null;

// Icons paths
const sunIconPath = '<path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path>';
const moonIconPath = '<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>';

function updateThemeIcons() {
    if (document.documentElement.classList.contains('dark')) {
        darkIcon?.classList.add('hidden');
        lightIcon?.classList.remove('hidden');
        if (mobileIcon) mobileIcon.innerHTML = sunIconPath;
    } else {
        darkIcon?.classList.remove('hidden');
        lightIcon?.classList.add('hidden');
        if (mobileIcon) mobileIcon.innerHTML = moonIconPath;
    }
}

// Initialize theme based on preference or default to dark
if (localStorage.getItem('color-theme') === 'light' || (!('color-theme' in localStorage) && false)) {
    document.documentElement.classList.remove('dark');
} else {
    document.documentElement.classList.add('dark');
}
updateThemeIcons();

function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    }
    updateThemeIcons();
    updateNavbar();
}

themeToggleBtn?.addEventListener('click', toggleTheme);
themeToggleMobileBtn?.addEventListener('click', toggleTheme);

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Navbar Scroll Effect
function updateNavbar() {
    const nav = document.querySelector('nav');
    const isDark = document.documentElement.classList.contains('dark');
    
    if (window.scrollY > 50) {
        nav.classList.add('shadow-sm');
        if (isDark) {
            nav.classList.remove('bg-white/80', 'bg-white/95', 'bg-slate-900/80');
            nav.classList.add('bg-slate-900/95');
        } else {
            nav.classList.remove('bg-slate-900/80', 'bg-slate-900/95', 'bg-white/80');
            nav.classList.add('bg-white/95');
        }
    } else {
        nav.classList.remove('shadow-sm');
        if (isDark) {
            nav.classList.remove('bg-white/80', 'bg-white/95', 'bg-slate-900/95');
            nav.classList.add('bg-slate-900/80');
        } else {
            nav.classList.remove('bg-slate-900/80', 'bg-slate-900/95', 'bg-white/95');
            nav.classList.add('bg-white/80');
        }
    }
}

window.addEventListener('scroll', updateNavbar);
updateNavbar();

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
    observer.observe(section);
});

// Log for confirmation
console.log('Interactivity, animations, and theme toggling initialized.');
