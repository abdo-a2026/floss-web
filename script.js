

// Render services
function renderServices() {
    const container = document.getElementById('servicesContainer');
    if (!container) return;
    
    container.innerHTML = services.map(service => `
        <div class="service-card">
            <div class="service-icon">
                <i class="fas ${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>
    `).join('');
}

// ========== script.js ===========
document.addEventListener('DOMContentLoaded', function() {
    // Render services
    renderServices();

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle placeholder image for doctor
    const doctorImage = document.getElementById('doctorImage');
    if (doctorImage) {
        doctorImage.onerror = function() {
            this.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600';
        };
    }

    // Booking form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').options[document.getElementById('service').selectedIndex].text,
                date: document.getElementById('date').value,
                time: document.getElementById('time').options[document.getElementById('time').selectedIndex].text,
                notes: document.getElementById('notes').value
            };

            // Create WhatsApp message
            const message = `مرحباً، أود طلب موعد في عيادتكم

📝 الاسم: ${formData.name}
📱 رقم الهاتف: ${formData.phone}
🦷 نوع الخدمة: ${formData.service}
📅 اليوم المفضل: ${formData.date}
🕐 الفترة: ${formData.time}
${formData.notes ? `💬 ملاحظات: ${formData.notes}` : ''}

أتطلع للتواصل معكم لتأكيد الموعد.`;

            // WhatsApp number (replace with actual number)
            const whatsappNumber = '966501234567';
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            
            // Open WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Reset form
            bookingForm.reset();
            
            // Show success message
            alert('شكراً لك! سيتم فتح واتساب الآن لإرسال طلب موعدك.');
        });
    }

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.service-card, .feature-card, .testimonial-card, .credential-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Set minimum date for booking (today)
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});