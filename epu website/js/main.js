// News Data
const newsData = [
    {
        id: 1,
        title: "New Academic Year Begins at EPU",
        date: "November 15, 2024",
        excerpt: "Ethiopian Police University welcomes a new cohort of students for the 2024/2025 academic year.",
        image: "images/news1.jpg"
    },
    {
        id: 2,
        title: "EPU Hosts International Law Enforcement Conference",
        date: "November 10, 2024",
        excerpt: "Leading experts from across Africa gather to discuss modern policing strategies and challenges.",
        image: "images/news2.jpg"
    },
    {
        id: 3,
        title: "Graduation Ceremony for Class of 2024",
        date: "November 5, 2024",
        excerpt: "Over 500 graduates receive their degrees in various law enforcement disciplines.",
        image: "images/news3.jpg"
    },
    {
        id: 4,
        title: "New Cybercrime Lab Inaugurated",
        date: "October 28, 2024",
        excerpt: "State-of-the-art facility enhances digital forensics training capabilities.",
        image: "images/news4.jpg"
    },
    {
        id: 5,
        title: "EPU Partners with International Police Organizations",
        date: "October 20, 2024",
        excerpt: "New partnerships aim to enhance training programs and research opportunities.",
        image: "images/news5.jpg"
    },
    {
        id: 6,
        title: "Student Excellence Awards Announced",
        date: "October 15, 2024",
        excerpt: "Outstanding students recognized for academic achievement and leadership.",
        image: "images/news6.jpg"
    }
];

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const sliderDots = document.getElementById('sliderDots');

if (slides.length > 0) {
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function goToSlide(n) {
        showSlide(n);
    }

    // Auto advance slides
    setInterval(nextSlide, 5000);

    // Slider controls
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
}

// Load Latest News on Homepage
const newsGrid = document.getElementById('newsGrid');
if (newsGrid) {
    const latestNews = newsData.slice(0, 3);
    latestNews.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');
        newsCard.innerHTML = `
            <img src="${news.image}" alt="${news.title}" onerror="this.src='images/placeholder.jpg'">
            <div class="news-content">
                <div class="news-date">${news.date}</div>
                <h3>${news.title}</h3>
                <p>${news.excerpt}</p>
                <a href="news.html">Read More →</a>
            </div>
        `;
        newsGrid.appendChild(newsCard);
    });
}

// Load All News on News Page
const allNewsList = document.getElementById('allNewsList');
if (allNewsList) {
    newsData.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        newsItem.innerHTML = `
            <img src="${news.image}" alt="${news.title}" onerror="this.src='images/placeholder.jpg'">
            <div class="news-item-content">
                <h3>${news.title}</h3>
                <div class="news-date">${news.date}</div>
                <p>${news.excerpt}</p>
            </div>
        `;
        allNewsList.appendChild(newsItem);
    });
}

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Sticky Navbar
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    }
    
    lastScroll = currentScroll;
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(error => {
            error.classList.remove('show');
        });
        
        let isValid = true;
        
        // Validate name
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            showError('nameError', 'Name is required');
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate subject
        const subject = document.getElementById('subject');
        if (subject.value === '') {
            showError('subjectError', 'Please select a subject');
            isValid = false;
        }
        
        // Validate message
        const message = document.getElementById('message');
        if (message.value.trim() === '') {
            showError('messageError', 'Message is required');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError('messageError', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.add('show');
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        }
    });
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Add smooth scrolling to all links
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
