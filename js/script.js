// FINTRA Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initSmoothScroll();
    initScrollAnimations();
    initMobileMenu();
    initParallaxEffect();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class for styling
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll direction (optional)
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Smooth transition for navbar
    navbar.style.transition = 'transform 0.3s ease, background 0.3s ease';
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.feature-card, .step, .testimonial-card, .section-header'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add CSS class for animated state
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Mobile menu functionality
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');
    
    if (!menuBtn) return;

    let isOpen = false;

    menuBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        
        if (isOpen) {
            openMobileMenu();
        } else {
            closeMobileMenu();
        }
    });

    function openMobileMenu() {
        // Create mobile menu overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.innerHTML = `
            <div class="mobile-menu-content">
                <button class="mobile-menu-close">&times;</button>
                <ul class="mobile-nav-links">
                    <li><a href="#fitur">Fitur</a></li>
                    <li><a href="#cara-kerja">Cara Kerja</a></li>
                    <li><a href="#testimoni">Testimoni</a></li>
                </ul>
                <div class="mobile-nav-cta">
                    <button class="btn btn-outline btn-large">Masuk</button>
                    <button class="btn btn-primary btn-large">Mulai Gratis</button>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .mobile-menu-overlay {
                position: fixed;
                inset: 0;
                background: rgba(10, 15, 28, 0.98);
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                animation: fadeIn 0.3s ease forwards;
            }
            
            .mobile-menu-content {
                text-align: center;
                padding: 2rem;
                width: 100%;
                max-width: 400px;
            }
            
            .mobile-menu-close {
                position: absolute;
                top: 1.5rem;
                right: 1.5rem;
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .mobile-nav-links {
                list-style: none;
                margin-bottom: 2rem;
            }
            
            .mobile-nav-links li {
                margin-bottom: 1.5rem;
            }
            
            .mobile-nav-links a {
                color: white;
                font-size: 1.5rem;
                font-weight: 600;
                text-decoration: none;
                transition: color 0.3s ease;
            }
            
            .mobile-nav-links a:hover {
                color: var(--color-primary-light);
            }
            
            .mobile-nav-cta {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            @keyframes fadeIn {
                to { opacity: 1; }
            }
        `;
        
        overlay.appendChild(style);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        // Close button functionality
        overlay.querySelector('.mobile-menu-close').addEventListener('click', closeMobileMenu);
        
        // Close on link click
        overlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Animate hamburger to X
        menuBtn.classList.add('active');
        const spans = menuBtn.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    }

    window.closeMobileMenu = function() {
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (overlay) {
            overlay.style.animation = 'fadeIn 0.3s ease reverse forwards';
            setTimeout(() => {
                overlay.remove();
                document.body.style.overflow = '';
            }, 300);
        }
        
        // Reset hamburger
        menuBtn.classList.remove('active');
        const spans = menuBtn.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
        
        isOpen = false;
    };
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const orbs = document.querySelectorAll('.gradient-orb');
    
    if (window.matchMedia('(pointer: coarse)').matches) return; // Disable on touch devices

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.3;
                
                orbs.forEach((orb, index) => {
                    const speed = (index + 1) * 0.2;
                    orb.style.transform = `translateY(${rate * speed}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });

    // Mouse move parallax for dashboard
    const dashboard = document.querySelector('.dashboard-preview');
    if (dashboard) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth - 0.5) * 10;
            const yPos = (clientY / innerHeight - 0.5) * 10;
            
            dashboard.style.transform = `perspective(1000px) rotateY(${xPos}deg) rotateX(${-yPos}deg)`;
        });

        hero.addEventListener('mouseleave', () => {
            dashboard.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
        });
    }
}

// Button click handlers for demo purposes
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Handle specific button actions
        const btnText = this.textContent.trim();
        if (btnText.includes('Mulai') || btnText.includes('Gratis')) {
            showNotification('Selamat datang! Mengalihkan ke halaman pendaftaran...', 'success');
        } else if (btnText.includes('Demo')) {
            showNotification('Memuat video demo...', 'info');
        } else if (btnText.includes('Masuk')) {
            showNotification('Mengalihkan ke halaman login...', 'info');
        }
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--color-accent)' : 'var(--color-primary)'};
        color: white;
        border-radius: 0.75rem;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 9999;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const isNumber = !isNaN(parseFloat(target));
        
        if (isNumber && target.includes('K')) {
            let current = 0;
            const targetNum = parseInt(target);
            const increment = targetNum / 50;
            const suffix = target.replace(/[0-9]/g, '');
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetNum) {
                    stat.textContent = targetNum + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, 30);
        }
    });
}

// Trigger stats animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) heroObserver.observe(heroSection);

// Performance optimization: Pause animations when tab is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.classList.add('paused');
    } else {
        document.body.classList.remove('paused');
    }
});

// Add paused styles
const pausedStyle = document.createElement('style');
pausedStyle.textContent = `
    .paused * {
        animation-play-state: paused !important;
    }
`;
document.head.appendChild(pausedStyle);

console.log('🚀 FINTRA Landing Page Loaded Successfully');