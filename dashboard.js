
// Sample subscription data
let subscriptions = [
    {
        id: 1,
        name: 'Netflix',
        category: 'Entertainment',
        cost: 799,
        nextBilling: '2024-01-15',
        status: 'active',
        icon: 'N',
        color: '#E50914'
    },
    {
        id: 2,
        name: 'Spotify Premium',
        category: 'Music',
        cost: 499,
        nextBilling: '2024-01-12',
        status: 'active',
        icon: 'S',
        color: '#1DB954'
    },
    {
        id: 3,
        name: 'Adobe Creative Cloud',
        category: 'Software',
        cost: 2299,
        nextBilling: '2024-01-20',
        status: 'canceling',
        icon: 'A',
        color: '#FF0000'
    },
    {
        id: 4,
        name: 'Amazon Prime',
        category: 'Shopping',
        cost: 999,
        nextBilling: '2024-01-08',
        status: 'active',
        icon: 'A',
        color: '#FF9900'
    },
    {
        id: 5,
        name: 'Dropbox Pro',
        category: 'Storage',
        cost: 499,
        nextBilling: '2024-01-25',
        status: 'paused',
        icon: 'D',
        color: '#0061FF'
    }
];

// Check authentication
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.loggedIn) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Logout function
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Tab functionality
function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName + 'Tab').classList.add('active');
    
    // Add active class to clicked tab button
    event.target.classList.add('active');
}

// Calculate totals
function calculateTotals() {
    const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
    const monthlyTotal = activeSubscriptions.reduce((total, sub) => total + sub.cost, 0);
    const yearlyTotal = monthlyTotal * 12;
    
    // Update overview cards
    document.getElementById('activeCount').textContent = activeSubscriptions.length;
    document.getElementById('monthlySpending').textContent = monthlyTotal.toLocaleString('en-IN');
    document.getElementById('yearlyProjection').textContent = yearlyTotal.toLocaleString('en-IN');
    document.getElementById('totalAmount').textContent = monthlyTotal.toLocaleString('en-IN');
}

// Render subscriptions list
function renderSubscriptions() {
    const subscriptionsList = document.getElementById('subscriptionsList');
    
    if (subscriptions.length === 0) {
        subscriptionsList.innerHTML = `
            <div class="subscription-row">
                <p style="text-align: center; color: #666; padding: 40px;">
                    No subscriptions added yet. Click "Add Subscription" to get started.
                </p>
            </div>
        `;
        return;
    }
    
    subscriptionsList.innerHTML = subscriptions.map(sub => {
        const statusClass = sub.status;
        const statusText = {
            'active': 'Active',
            'canceling': 'Canceling',
            'paused': 'Paused'
        }[sub.status];
        
        const nextBillingDate = new Date(sub.nextBilling).toLocaleDateString('en-IN');
        
        return `
            <div class="subscription-row">
                <div class="sub-details">
                    <div class="sub-avatar" style="background-color: ${sub.color}">
                        ${sub.icon}
                    </div>
                    <div class="sub-meta">
                        <h4>${sub.name}</h4>
                        <div class="sub-category">${sub.category}</div>
                    </div>
                </div>
                <div class="sub-actions">
                    <div style="text-align: right;">
                        <div class="sub-cost">₹${sub.cost.toLocaleString('en-IN')}</div>
                        <div class="sub-next-billing">Next: ${nextBillingDate}</div>
                    </div>
                    <div class="sub-status-badge ${statusClass}">${statusText}</div>
                    <button class="delete-btn" onclick="deleteSubscription(${sub.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Show add subscription modal
function showAddSubscriptionModal() {
    document.getElementById('addSubscriptionModal').style.display = 'block';
}

// Close add subscription modal
function closeAddSubscriptionModal() {
    document.getElementById('addSubscriptionModal').style.display = 'none';
    // Reset form
    document.querySelector('#addSubscriptionModal form').reset();
}

// Handle add subscription
function handleAddSubscription(event) {
    event.preventDefault();
    
    const name = document.getElementById('subName').value;
    const category = document.getElementById('subCategory').value;
    const cost = parseFloat(document.getElementById('subCost').value);
    const billingDate = document.getElementById('subBillingDate').value;
    
    // Generate a simple icon from the first letter of the name
    const icon = name.charAt(0).toUpperCase();
    
    // Generate a random color
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Create new subscription
    const newSubscription = {
        id: Date.now(), // Simple ID generation
        name: name,
        category: category,
        cost: cost,
        nextBilling: billingDate,
        status: 'active',
        icon: icon,
        color: color
    };
    
    // Add to subscriptions array
    subscriptions.push(newSubscription);
    
    // Update displays
    renderSubscriptions();
    calculateTotals();
    
    // Close modal
    closeAddSubscriptionModal();
    
    // Show success message
    alert('Subscription added successfully!');
}

// Delete subscription
function deleteSubscription(id) {
    if (confirm('Are you sure you want to delete this subscription?')) {
        subscriptions = subscriptions.filter(sub => sub.id !== id);
        renderSubscriptions();
        calculateTotals();
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const addModal = document.getElementById('addSubscriptionModal');
    if (event.target === addModal) {
        closeAddSubscriptionModal();
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!checkAuth()) return;
    
    // Load saved subscriptions from localStorage
    const savedSubscriptions = localStorage.getItem('subscriptions');
    if (savedSubscriptions) {
        subscriptions = JSON.parse(savedSubscriptions);
    }
    
    // Initial render
    renderSubscriptions();
    calculateTotals();
    
    // Save subscriptions to localStorage whenever they change
    const originalPush = subscriptions.push;
    const originalFilter = Array.prototype.filter;
    
    // Override array methods to auto-save
    setInterval(() => {
        localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    }, 1000);
});
