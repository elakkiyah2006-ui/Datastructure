// Sample data
let orders = [
    {
        id: 'ORD-001',
        customerName: 'John Doe',
        address: '123 Main St, City',
        items: 'Pizza, Coke, Garlic Bread',
        priority: 'normal',
        status: 'pending'
    },
    {
        id: 'ORD-002',
        customerName: 'Jane Smith',
        address: '456 Oak Ave, City',
        items: 'Burger, Fries, Shake',
        priority: 'high',
        status: 'pending'
    },
    {
        id: 'ORD-003',
        customerName: 'Mike Johnson',
        address: '789 Pine Rd, City',
        items: 'Pasta, Salad, Wine',
        priority: 'normal',
        status: 'pending'
    }
];

let routes = [];
let orderCounter = 4;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    renderOrders();
    updateAnalytics();
    setupEventListeners();
});

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.toggle('active');
        });
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        
        // Close mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('active');
    }
}

// Order Management
function renderOrders() {
    const ordersGrid = document.getElementById('ordersGrid');
    if (!ordersGrid) return;
    
    ordersGrid.innerHTML = '';
    
    if (orders.length === 0) {
        ordersGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No orders yet. Add your first order!</p>';
        return;
    }
    
    orders.forEach(order => {
        const orderCard = createOrderCard(order);
        ordersGrid.appendChild(orderCard);
    });
}

function createOrderCard(order) {
    const card = document.createElement('div');
    card.className = `order-card ${order.priority}-priority`;
    
    const priorityClass = `priority-${order.priority}`;
    
    card.innerHTML = `
        <div class="order-header">
            <span class="order-id">${order.id}</span>
            <span class="order-priority ${priorityClass}">${order.priority}</span>
        </div>
        <div class="order-details">
            <div class="order-detail-item">
                <i class="fas fa-user"></i>
                <span>${order.customerName}</span>
            </div>
            <div class="order-detail-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>${order.address}</span>
            </div>
            <div class="order-detail-item">
                <i class="fas fa-utensils"></i>
                <span>${order.items}</span>
            </div>
            <div class="order-detail-item">
                <i class="fas fa-info-circle"></i>
                <span>Status: ${order.status}</span>
            </div>
        </div>
        <div class="order-actions">
            <button class="btn btn-small btn-danger" onclick="deleteOrder('${order.id}')">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    
    return card;
}

function addNewOrder() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.style.display = 'block';
        document.getElementById('orderForm').reset();
    }
}

function closeModal() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function handleOrderSubmit(event) {
    event.preventDefault();
    
    const customerName = document.getElementById('customerName').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const orderItems = document.getElementById('orderItems').value;
    const priority = document.getElementById('priority').value;
    
    const newOrder = {
        id: `ORD-${String(orderCounter).padStart(3, '0')}`,
        customerName: customerName,
        address: customerAddress,
        items: orderItems,
        priority: priority,
        status: 'pending'
    };
    
    orders.push(newOrder);
    orderCounter++;
    
    renderOrders();
    updateAnalytics();
    closeModal();
    
    // Show success notification
    showNotification('Order added successfully!', 'success');
}

function deleteOrder(orderId) {
    if (confirm('Are you sure you want to delete this order?')) {
        orders = orders.filter(order => order.id !== orderId);
        renderOrders();
        updateAnalytics();
        showNotification('Order deleted successfully!', 'success');
    }
}

// Route Optimization
function optimizeRoutes() {
    if (orders.length === 0) {
        showNotification('No orders to optimize!', 'error');
        return;
    }
    
    showNotification('Optimizing routes...', 'info');
    
    // Simulate route optimization algorithm
    setTimeout(() => {
        routes = generateOptimizedRoutes(orders);
        renderRoutes();
        updateAnalytics();
        visualizeRoute(routes[0]);
        showNotification('Routes optimized successfully!', 'success');
    }, 1500);
}

function generateOptimizedRoutes(orders) {
    // Simple route optimization simulation
    // In a real app, this would use actual routing algorithms (Dijkstra, A*, etc.)
    const routeCount = Math.ceil(orders.length / 3);
    const optimizedRoutes = [];
    
    for (let i = 0; i < routeCount; i++) {
        const routeOrders = orders.slice(i * 3, (i + 1) * 3);
        if (routeOrders.length === 0) break;
        
        // Calculate estimated distance and time
        const estimatedDistance = (routeOrders.length * 5 + Math.random() * 10).toFixed(1);
        const estimatedTime = (routeOrders.length * 15 + Math.random() * 20).toFixed(0);
        const optimizedTime = (estimatedTime * 0.7).toFixed(0); // 30% time savings
        
        optimizedRoutes.push({
            id: `ROUTE-${String(i + 1).padStart(3, '0')}`,
            orders: routeOrders,
            estimatedDistance: estimatedDistance,
            estimatedTime: estimatedTime,
            optimizedTime: optimizedTime,
            timeSaved: ((estimatedTime - optimizedTime) / estimatedTime * 100).toFixed(1)
        });
    }
    
    return optimizedRoutes;
}

function renderRoutes() {
    const routesList = document.getElementById('routesList');
    if (!routesList) return;
    
    routesList.innerHTML = '';
    
    if (routes.length === 0) {
        routesList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No routes available. Optimize routes first!</p>';
        return;
    }
    
    routes.forEach((route, index) => {
        const routeCard = createRouteCard(route, index === 0);
        routesList.appendChild(routeCard);
    });
}

function createRouteCard(route, isActive = false) {
    const card = document.createElement('div');
    card.className = `route-card ${isActive ? 'active' : ''}`;
    card.onclick = () => {
        // Remove active class from all cards
        document.querySelectorAll('.route-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        visualizeRoute(route);
    };
    
    card.innerHTML = `
        <div class="route-header">
            <span class="route-id">${route.id}</span>
            <i class="fas fa-check-circle" style="color: var(--success-color);"></i>
        </div>
        <div class="order-details">
            <div class="order-detail-item">
                <i class="fas fa-list"></i>
                <span>${route.orders.length} orders</span>
            </div>
            <div class="order-detail-item">
                <i class="fas fa-route"></i>
                <span>${route.estimatedDistance} km</span>
            </div>
        </div>
        <div class="route-stats">
            <div class="route-stat">
                <i class="fas fa-clock"></i>
                <span>${route.optimizedTime} min</span>
            </div>
            <div class="route-stat">
                <i class="fas fa-percentage"></i>
                <span>${route.timeSaved}% saved</span>
            </div>
        </div>
    `;
    
    return card;
}

function visualizeRoute(route) {
    const visualization = document.getElementById('routeVisualization');
    if (!visualization || !route) {
        return;
    }
    
    visualization.innerHTML = '';
    
    // Create restaurant marker
    const restaurant = createMarker('restaurant', 'Restaurant', 20, 30);
    visualization.appendChild(restaurant);
    
    // Create delivery markers and route lines
    route.orders.forEach((order, index) => {
        const x = 30 + (index + 1) * 15 + Math.random() * 10;
        const y = 40 + (index + 1) * 15 + Math.random() * 10;
        
        const marker = createMarker('delivery', order.customerName, y, x);
        visualization.appendChild(marker);
        
        // Create route line
        if (index === 0) {
            const line = createRouteLine(30, 20, x, y);
            visualization.appendChild(line);
        } else {
            const prevX = 30 + index * 15;
            const prevY = 40 + index * 15;
            const line = createRouteLine(prevX, prevY, x, y);
            visualization.appendChild(line);
        }
    });
}

function createMarker(type, label, top, left) {
    const marker = document.createElement('div');
    marker.className = `marker ${type}`;
    marker.style.top = `${top}%`;
    marker.style.left = `${left}%`;
    marker.innerHTML = `
        <i class="fas ${type === 'restaurant' ? 'fa-store' : 'fa-home'}"></i>
        <span class="marker-label">${label}</span>
    `;
    return marker;
}

function createRouteLine(x1, y1, x2, y2) {
    const line = document.createElement('div');
    line.className = 'route-line';
    
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    line.style.width = `${length}%`;
    line.style.left = `${x1}%`;
    line.style.top = `${y1}%`;
    line.style.transform = `rotate(${angle}deg)`;
    
    return line;
}

// Analytics
function updateAnalytics() {
    updateStat('totalRoutes', routes.length);
    updateStat('totalDeliveries', orders.length);
    
    if (routes.length > 0) {
        const avgTime = routes.reduce((sum, route) => sum + parseFloat(route.optimizedTime), 0) / routes.length;
        updateStat('avgTime', `${avgTime.toFixed(0)} min`);
        
        const totalTimeSaved = routes.reduce((sum, route) => sum + parseFloat(route.timeSaved), 0) / routes.length;
        updateStat('optimization', `${totalTimeSaved.toFixed(1)}%`);
    } else {
        updateStat('avgTime', '0 min');
        updateStat('optimization', '0%');
    }
}

function updateStat(statId, value) {
    const statElement = document.getElementById(statId);
    if (statElement) {
        // Animate value change
        const currentValue = statElement.textContent;
        animateValue(statElement, currentValue, value, 1000);
    }
}

function animateValue(element, start, end, duration) {
    const startValue = parseFloat(start) || 0;
    const endValue = parseFloat(end) || 0;
    const isPercentage = end.toString().includes('%');
    const isMin = end.toString().includes('min');
    
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = startValue + (endValue - startValue) * progress;
        
        if (isPercentage) {
            element.textContent = `${current.toFixed(1)}%`;
        } else if (isMin) {
            element.textContent = `${Math.round(current)} min`;
        } else {
            element.textContent = Math.round(current);
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            if (isPercentage) {
                element.textContent = end;
            } else if (isMin) {
                element.textContent = end;
            } else {
                element.textContent = Math.round(endValue);
            }
        }
    };
    window.requestAnimationFrame(step);
}

// Notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--danger-color)' : 'var(--primary-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Event Listeners
function setupEventListeners() {
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('orderModal');
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Initialize with sample route if orders exist
setTimeout(() => {
    if (orders.length > 0) {
        routes = generateOptimizedRoutes(orders);
        renderRoutes();
        if (routes.length > 0) {
            visualizeRoute(routes[0]);
        }
    }
}, 500);

