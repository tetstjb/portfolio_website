document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate skill bars when scrolled to
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Intersection Observer for skill bars
    const aboutSection = document.getElementById('about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (aboutSection) {
        observer.observe(aboutSection);
    }

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});

// Project Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.querySelector('.modal-body');

    // Project data for modals
    const projectsData = {
        "Automatic Street Light System": {
            description: "An intelligent lighting system that automatically controls street lights based on ambient light conditions, reducing energy consumption.",
            tech: ["LDR Sensor", "Arduino UNO", "Relay Module", "12V Power Supply", "LED Lights"],
            features: [
                "Automatically turns lights on at dusk and off at dawn",
                "Adjustable sensitivity for different lighting conditions",
                "Can handle multiple light fixtures through relay",
                "Low power consumption in monitoring mode",
                "Weather-resistant enclosure for outdoor use"
            ],
            schematic: "images/street-light-circuit.jpg",
            notes: "This project demonstrates practical application of light sensing and power control in embedded systems."
        },
        "Temperature & Humidity Monitoring": {
            description: "A real-time environmental monitoring system that provides accurate temperature and humidity readings with visual display.",
            tech: ["DHT11 Sensor", "Arduino Nano", "16x2 LCD Display", "I2C Module", "Breadboard"],
            features: [
                "Measures temperature range: 0°C to 50°C (±2°C accuracy)",
                "Measures humidity range: 20% to 90% (±5% accuracy)",
                "Serial output for data logging",
                "Low-power mode for battery operation",
                "Customizable display options"
            ],
            schematic: "images/dht11-circuit.jpg",
            notes: "This system can be expanded with wireless modules for IoT applications in home automation."
        },
        "IR-Based Object Detection": {
            description: "A proximity detection system using infrared technology for security or automation applications.",
            tech: ["IR LED", "Photodiode", "LM358 Op-Amp", "Buzzer", "LED Indicator"],
            features: [
                "Detection range up to 30cm (adjustable)",
                "Visual (LED) and audible (buzzer) alerts",
                "Adjustable sensitivity via potentiometer",
                "Can interface with microcontrollers",
                "Low false-positive rate with proper calibration"
            ],
            schematic: "images/ir-circuit.jpg",
            notes: "This circuit forms the basis for many commercial security systems and automatic door openers."
        },
        "Battery Level Indicator": {
            description: "A visual battery charge monitoring system using bar graph LED display for clear status indication.",
            tech: ["LM3914 IC", "10-segment LED Bar", "Voltage Divider", "Precision Potentiometer", "9V Battery"],
            features: [
                "Supports 3V to 15V battery systems",
                "Selectable dot or bar display mode",
                "Precision reference voltage",
                "Low quiescent current (2.5mA typical)",
                "Can drive LEDs of different colors"
            ],
            schematic: "images/battery-circuit.jpg",
            notes: "The LM3914's logarithmic scale makes it ideal for battery applications where remaining capacity is non-linear."
        }
    };

    // Add click event to each project card
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking the button (handled separately)
            if (!e.target.classList.contains('project-details-btn')) return;
            
            const projectTitle = this.querySelector('h3').textContent;
            const projectData = projectsData[projectTitle];
            
            // Populate modal with project data
            modalBody.innerHTML = `
                <div class="modal-image">
                    <img src="${this.querySelector('img').src}" alt="${projectTitle}">
                </div>
                <div class="modal-details">
                    <h3>${projectTitle}</h3>
                    <p>${projectData.description}</p>
                    
                    <div class="modal-tech">
                        ${projectData.tech.map(item => `<span>${item}</span>`).join('')}
                    </div>
                    
                    <div class="modal-features">
                        <h4>Key Features:</h4>
                        <ul>
                            ${projectData.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="modal-schematic">
                        <h4>Circuit Schematic:</h4>
                        <img src="${projectData.schematic}" alt="${projectTitle} Circuit">
                    </div>
                    
                    <p><strong>Note:</strong> ${projectData.notes}</p>
                </div>
            `;
            
            // Show modal
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        });
    });

    // Close modal when clicking X
    closeModal.addEventListener('click', function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });

    // Close modal when clicking outside content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
});