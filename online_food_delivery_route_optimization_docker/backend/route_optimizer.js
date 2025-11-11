// Nearest Neighbor heuristic route optimizer
// Exports computeRoute(start, orders) -> { route: [...], distance_km: number }

function haversine(lat1, lon1, lat2, lon2) {
  const toRad = x => (x * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function computeRoute(start, orders) {
  // Clone orders
  const remaining = orders.map(o => ({...o}));
  const route = [];
  let cur = { lat: start.lat, lng: start.lng };
  let total = 0;

  while (remaining.length > 0) {
    // find nearest
    let bestIdx = 0;
    let bestDist = haversine(cur.lat, cur.lng, remaining[0].lat, remaining[0].lng);
    for (let i = 1; i < remaining.length; i++) {
      const d = haversine(cur.lat, cur.lng, remaining[i].lat, remaining[i].lng);
      if (d < bestDist) {
        bestDist = d; bestIdx = i;
      }
    }
    const next = remaining.splice(bestIdx,1)[0];
    route.push(next);
    total += bestDist;
    cur = { lat: next.lat, lng: next.lng };
  }
  // Optionally return to start; commented out. Uncomment if round-trip needed.
  // total += haversine(cur.lat, cur.lng, start.lat, start.lng);
  return { route, distance_km: Number(total.toFixed(3)) };
}

module.exports = { computeRoute };
