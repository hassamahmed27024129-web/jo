/**
 * WrapJoy Gift Wrapping Paper Website
 * JavaScript for interactive functionality
 */

// DOM elements
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCountElement = document.querySelector('.cart-count');
const cartModal = document.getElementById('cartModal');
const modalCloseButton = document.querySelector('.modal-close');
const continueShoppingButton = document.querySelector('.continue-shopping');
const viewCartButton = document.querySelector('.view-cart');
const newsletterForm = document.querySelector('.newsletter-form');
const contactForm = document.querySelector('.contact-form');
const currentYearElement = document.getElementById('currentYear');

// Cart state
let cartCount = 0;
let cartItems = [];

// Navigation menu toggle for mobile
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Toggle hamburger to X animation
    const hamburger = document.querySelector('.hamburger');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        const hamburger = document.querySelector('.hamburger');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            const hamburger = document.querySelector('.hamburger');
            hamburger.classList.remove('active');
            
            // Scroll to the target
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add to cart functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Get product details from data attributes
        const productId = this.getAttribute('data-id');
        const productName = this.getAttribute('data-name');
        const productPrice = parseFloat(this.getAttribute('data-price'));
        
        // Get the product image URL
        const productImage = this.closest('.product-card').querySelector('img').src;
        
        // Update cart count
        cartCount++;
        updateCartCount();
        
        // Add item to cart array
        const existingItem = cartItems.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }
        
        // Show confirmation modal
        showCartModal(productName, productPrice, productImage);
        
        // Add animation to the button
        this.classList.add('added');
        setTimeout(() => {
            this.classList.remove('added');
        }, 500);
    });
});

// Update cart count in the UI
function updateCartCount() {
    cartCountElement.textContent = cartCount;
    
    // Add animation to cart icon
    cartCountElement.parentElement.classList.add('pulse');
    setTimeout(() => {
        cartCountElement.parentElement.classList.remove('pulse');
    }, 300);
}

// Show cart confirmation modal
function showCartModal(productName, productPrice, productImage) {
    // Update modal content
    document.getElementById('modal-name').textContent = productName;
    document.getElementById('modal-price').textContent = `$${productPrice.toFixed(2)}`;
    document.getElementById('modal-img').src = productImage;
    document.getElementById('modal-img').alt = productName;
    document.getElementById('modal-cart-count').textContent = cartCount;
    
    // Show modal
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close cart modal
function closeCartModal() {
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Modal event listeners
modalCloseButton.addEventListener('click', closeCartModal);
continueShoppingButton.addEventListener('click', closeCartModal);

viewCartButton.addEventListener('click', () => {
    closeCartModal();
    alert(`Your cart has ${cartCount} item${cartCount !== 1 ? 's' : ''}.\nTotal: $${calculateCartTotal().toFixed(2)}\n\nThis is a demo - in a real store, you would proceed to checkout.`);
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Close modal when clicking outside
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        closeCartModal();
    }
});

// Calculate cart total
function calculateCartTotal() {
    return cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
}

// Newsletter form submission
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    
    // Simple email validation
    if (emailInput.value && emailInput.value.includes('@')) {
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
    } else {
        alert('Please enter a valid email address.');
    }
});

// Contact form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (name && email && message) {
        alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
        this.reset();
    } else {
        alert('Please fill in all fields before submitting.');
    }
});

// Set current year in footer
currentYearElement.textContent = new Date().getFullYear();

// Highlight active nav link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add some fun animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.product-card, .feature, .contact-form');
animateElements.forEach(element => observer.observe(element));

// Initialize with some cart count (optional)
updateCartCount();

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .pulse {
        animation: pulse 0.3s ease-in-out;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .add-to-cart.added {
        background-color: var(--success) !important;
    }
    
    .product-card.animate {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .feature.animate {
        animation: fadeIn 0.8s ease forwards;
    }
    
    .contact-form.animate {
        animation: fadeInRight 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .hamburger.active {
        background-color: transparent;
    }
    
    .hamburger.active::before {
        transform: rotate(45deg);
        top: 0;
    }
    
    .hamburger.active::after {
        transform: rotate(-45deg);
        bottom: 0;
    }
`;

document.head.appendChild(style);

console.log('WrapJoy website loaded successfully!');