
// Pricing data
const pricingData = {
    monthly: {
        starter: 499,
        pro: 999,
        family: 1999
    },
    annual: {
        starter: 4999,  // 499 * 10 (2 months free)
        pro: 9999,      // 999 * 10 (2 months free)
        family: 19999   // 1999 * 10 (2 months free)
    }
};

// Toggle pricing between monthly and annual
function togglePricing() {
    const toggle = document.getElementById('pricingToggle');
    const isAnnual = toggle.checked;
    
    const prices = isAnnual ? pricingData.annual : pricingData.monthly;
    
    // Update prices
    document.getElementById('starterPrice').textContent = prices.starter.toLocaleString('en-IN');
    document.getElementById('proPrice').textContent = prices.pro.toLocaleString('en-IN');
    document.getElementById('familyPrice').textContent = prices.family.toLocaleString('en-IN');
    
    // Update period text
    const periods = document.querySelectorAll('.period');
    periods.forEach(period => {
        period.textContent = isAnnual ? '/year' : '/month';
    });
    
    // Update toggle labels
    const labels = document.querySelectorAll('.toggle-label');
    if (isAnnual) {
        labels[0].style.opacity = '0.6';
        labels[1].style.opacity = '1';
        labels[1].style.fontWeight = '700';
        labels[0].style.fontWeight = '400';
    } else {
        labels[0].style.opacity = '1';
        labels[1].style.opacity = '0.6';
        labels[0].style.fontWeight = '700';
        labels[1].style.fontWeight = '400';
    }
}

// Handle plan selection
function selectPlan(planName) {
    const toggle = document.getElementById('pricingToggle');
    const isAnnual = toggle.checked;
    const prices = isAnnual ? pricingData.annual : pricingData.monthly;
    
    // Store selected plan
    localStorage.setItem('selectedPlan', JSON.stringify({
        name: planName,
        price: prices[planName],
        period: isAnnual ? 'annual' : 'monthly'
    }));
    
    // Redirect to signup/dashboard
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.loggedIn) {
        window.location.href = 'dashboard.html';
    } else {
        window.location.href = 'index.html';
    }
}

// Add click handlers to plan buttons
document.addEventListener('DOMContentLoaded', function() {
    const planButtons = document.querySelectorAll('.plan-btn');
    planButtons.forEach((button, index) => {
        const planNames = ['starter', 'pro', 'family'];
        button.addEventListener('click', () => selectPlan(planNames[index]));
    });
    
    // Set initial pricing
    togglePricing();
});

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
