// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.line-card, .pubs-col, .publication-item, .about-text, .about-image');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Form validation (if you add a contact form later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Utility function to format phone numbers
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}

// Add scroll to top functionality
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #0B3D5C 0%, #4FB286 100%);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// Hero map: Colombia, relieve real, sin API key
function initHeroMap() {
    const mapEl = document.getElementById('hero-map');
    if (!mapEl || typeof L === 'undefined') return;

    const colombiaBounds = L.latLngBounds([-4.5, -80], [13, -65]);

    const map = L.map('hero-map', {
        scrollWheelZoom: false,
        zoomControl: false,
        maxBounds: colombiaBounds.pad(0.3),
        minZoom: 5,
        maxZoom: 9
    }).fitBounds(colombiaBounds, { padding: [0, 0] });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
        maxZoom: 9,
        subdomains: 'abc'
    }).addTo(map);

    const layerColors = {
        geoia: '#2F8F6E',
        illicit: '#B8763A',
        restore: '#6E7F4F',
        governance: '#0B3D5C'
    };

    const markersData = [
        {
            line: 'geoia',
            lat: 1.35, lng: -72.95,
            title: 'GeoIA & monitoreo satelital',
            desc: 'Segmentación de bosque y métricas espaciales para monitoreo continuo en la Amazonía colombiana.'
        },
        {
            line: 'geoia',
            lat: 10.391, lng: -75.479,
            title: 'Cartagena — LIDAR urbano',
            desc: 'Modelación de nube de puntos LIDAR para el censo del arbolado del perímetro urbano.'
        },
        {
            line: 'illicit',
            lat: 0.95, lng: -73.35,
            title: 'Economías ilícitas y territorio',
            desc: 'Transiciones entre coca, minería de oro y ganadería en el posacuerdo amazónico.'
        },
        {
            line: 'governance',
            lat: 1.65, lng: -71.75,
            title: 'Transporte intermodal amazónico',
            desc: 'Plan Amazónico de Transporte Intermodal Sostenible (PATIS).'
        },
        {
            line: 'restore',
            lat: 4.65, lng: -74.04,
            title: 'Cerros Orientales de Bogotá',
            desc: 'Restauración ecológica, revegetalización y observaciones LIDAR de captura de carbono.'
        },
        {
            line: 'governance',
            lat: 4.6015, lng: -74.0661,
            title: 'CESED — Universidad de los Andes',
            desc: 'Base institucional de investigación en justicia ambiental y política pública.'
        }
    ];

    markersData.forEach(m => {
        L.circleMarker([m.lat, m.lng], {
            radius: 7,
            color: '#fff',
            weight: 2,
            fillColor: layerColors[m.line],
            fillOpacity: 0.92
        })
            .bindPopup('<strong>' + m.title + '</strong><p>' + m.desc + '</p>')
            .addTo(map);
    });
}

window.addEventListener('load', initHeroMap);
