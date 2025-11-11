# Online Food Delivery Route Optimization
Simple full-stack sample project (Frontend + Backend) for route optimization using a nearest-neighbor heuristic.

## Structure
- frontend/ : Static HTML/CSS/JS UI
- backend/  : Node.js + Express API that computes optimized delivery route
- sample_requests/: Example JSON payloads to test the API

## How to run (Backend)
1. Install Node.js (v14+ recommended).
2. Open terminal and run:
   ```
   cd backend
   npm install
   node index.js
   ```
3. Backend will run on http://localhost:3000

## How to run (Frontend)
- Open `frontend/index.html` in your browser.
- Or serve the `frontend` folder using a static server. The frontend calls the backend at http://localhost:3000 by default.

## API
- `GET /api/sample` - returns sample orders
- `POST /api/optimize` - compute optimized route
  Request body:
  ```json
  {
    "start": {"lat": 12.9716, "lng": 77.5946},
    "orders": [
      {"id":"o1","lat":12.9352,"lng":77.6245},
      {"id":"o2","lat":12.9611,"lng":77.6387}
    ]
  }
  ```
  Response:
  ```json
  {
    "route": [{"id":"o2","lat":...,"lng":...}, ...],
    "distance_km": 8.23
  }
  ```

## Notes
- This uses a simple nearest-neighbor heuristic (fast, not always optimal).
- For production-grade optimization, integrate Google OR-Tools, commercial TSP/VRP solvers, or vehicle routing APIs.
