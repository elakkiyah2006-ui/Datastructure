const apiBase = 'http://localhost:3000';
const resultEl = document.getElementById('result');
document.getElementById('btnSample').addEventListener('click', async () => {
  try {
    const r = await fetch(apiBase + '/api/sample');
    const j = await r.json();
    document.getElementById('startLat').value = j.start.lat;
    document.getElementById('startLng').value = j.start.lng;
    const txt = j.orders.map(o => `${o.id},${o.lat},${o.lng}`).join('\n');
    document.getElementById('orders').value = txt;
    resultEl.textContent = 'Loaded sample from backend.';
  } catch (err) {
    resultEl.textContent = 'Failed to load sample: ' + err;
  }
});

document.getElementById('btnOptimize').addEventListener('click', async () => {
  const startLat = parseFloat(document.getElementById('startLat').value);
  const startLng = parseFloat(document.getElementById('startLng').value);
  const ordersText = document.getElementById('orders').value.trim();
  if (!ordersText) { resultEl.textContent = 'No orders provided.'; return; }
  const orders = ordersText.split('\n').map(line => {
    const parts = line.split(',').map(s => s.trim());
    return { id: parts[0] || '', lat: parseFloat(parts[1]), lng: parseFloat(parts[2]) };
  });
  resultEl.textContent = 'Optimizing...';
  try {
    const r = await fetch(apiBase + '/api/optimize', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ start: {lat: startLat, lng: startLng}, orders })
    });
    const j = await r.json();
    resultEl.textContent = JSON.stringify(j, null, 2);
  } catch (err) {
    resultEl.textContent = 'Error: ' + err;
  }
});

document.getElementById('btnClear').addEventListener('click', () => {
  document.getElementById('orders').value = '';
  resultEl.textContent = 'Cleared.';
});
