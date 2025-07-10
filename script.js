
// Authentication functionality
function showAuthModal() {
    document.getElementById('authModal').style.display = 'block';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.auth-tab')[0].classList.add('active');
}

function showSignup() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.auth-tab')[1].classList.add('active');
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simulate login
    if (email && password) {
        localStorage.setItem('user', JSON.stringify({
            email: email,
            name: email.split('@')[0],
            loggedIn: true
        }));
        
        alert('Login successful!');
        closeAuthModal();
        window.location.href = 'dashboard.html';
    }
}

function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // Simulate signup
    if (name && email && password) {
        localStorage.setItem('user', JSON.stringify({
            email: email,
            name: name,
            loggedIn: true
        }));
        
        alert('Account created successfully!');
        closeAuthModal();
        window.location.href = 'dashboard.html';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('authModal');
    if (event.target === modal) {
        closeAuthModal();
    }
}

// Smooth scrolling for anchor links
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

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.loggedIn && window.location.pathname === '/index.html') {
        // Update UI for logged in user
        const getStartedBtn = document.querySelector('.get-started-btn');
        if (getStartedBtn) {
            getStartedBtn.textContent = 'Dashboard';
            getStartedBtn.onclick = () => window.location.href = 'dashboard.html';
        }
    }
});
