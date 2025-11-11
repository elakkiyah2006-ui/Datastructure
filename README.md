# FoodRoute Optimizer - Delivery Route Optimization

A modern, attractive frontend for an online food delivery route optimization system. This mini project demonstrates a beautiful user interface for managing delivery orders and optimizing delivery routes.

## Features

- 🎨 **Modern UI/UX Design** - Beautiful, responsive interface with gradient backgrounds and smooth animations
- 📦 **Order Management** - Add, view, and delete delivery orders with priority levels
- 🗺️ **Route Visualization** - Interactive map showing optimized delivery routes
- 🚀 **Route Optimization** - AI-powered route optimization algorithm simulation
- 📊 **Analytics Dashboard** - Real-time statistics and performance metrics
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- JavaScript (Vanilla JS)
- Font Awesome Icons
- Google Fonts (Poppins)

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start adding orders and optimizing routes!

## Usage

### Adding Orders
- Click the "Add New Order" button
- Fill in the order details (customer name, address, items, priority)
- Submit the form to add the order

### Optimizing Routes
- Click the "Optimize Routes" button
- The system will automatically group orders into efficient routes
- View optimized routes in the Routes section

### Viewing Routes
- Select a route from the routes list to visualize it on the map
- Each route shows estimated distance, time, and time savings

### Analytics
- View real-time statistics including:
  - Total active routes
  - Total deliveries
  - Average delivery time
  - Time saved through optimization

## File Structure

```
data/
├── index.html      # Main HTML file
├── styles.css      # Stylesheet with modern design
├── script.js       # JavaScript functionality
└── README.md       # Project documentation
```

## Customization

You can easily customize:
- Colors: Modify CSS variables in `styles.css`
- Route algorithm: Update the `generateOptimizedRoutes()` function in `script.js`
- Sample data: Modify the initial `orders` array in `script.js`

## Future Enhancements

- Integration with real mapping APIs (Google Maps, Mapbox)
- Backend API integration
- Real-time GPS tracking
- Driver assignment system
- Advanced route optimization algorithms (Dijkstra, A*, etc.)
- Database integration
- User authentication

## License

This is a mini project for educational purposes.

## Author

Mini Project - Online Food Delivery Route Optimization

---

**Note**: This is a frontend-only implementation. For a complete application, you would need to integrate it with a backend API for data persistence and real route optimization algorithms.

