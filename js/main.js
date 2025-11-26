const CONTACT_EMAIL = "marias1@hawk.illinoistech.edu";

document.addEventListener('DOMContentLoaded', function () {
  const qBtn = document.getElementById('questionsBtn');
  if (qBtn) {
    qBtn.addEventListener('click', function () {
      alert("If you have questions, contact me at:\n" + CONTACT_EMAIL);
    });
  }
});

window.initMap = function () {

  const mapEl = document.getElementById('map');
  if (!mapEl) return;

  const iit = { lat: 41.8349, lng: -87.6277 };
  const map = new google.maps.Map(mapEl, {
    center: iit,
    zoom: 13
  });

  const locations = [
    { title: 'IIT - Illinois Institute of Technology', pos: iit, content: '<strong>IIT</strong><br>Illinois Institute of Technology' },
    { title: 'Millennium Park', pos: { lat: 41.8826, lng: -87.6226 }, content: '<strong>Millennium Park</strong><br>Popular park in Chicago' },
    { title: 'Navy Pier', pos: { lat: 41.8916, lng: -87.6079 }, content: '<strong>Navy Pier</strong><br>Chicago attraction' }
  ];

  const infoWindow = new google.maps.InfoWindow();

  locations.forEach(loc => {
    const marker = new google.maps.Marker({
      position: loc.pos,
      map,
      title: loc.title
    });

    marker.addListener('click', function () {
      infoWindow.setContent(loc.content);
      infoWindow.open(map, marker);
    });
  });

  const pathCoords = locations.map(l => l.pos);
  const routeLine = new google.maps.Polyline({
    path: pathCoords,
    geodesic: true,
    strokeOpacity: 0.7,
    strokeWeight: 4,
    map: map
  });

  const iitCircle = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.3,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.05,
    map: map,
    center: iit,
    radius: 1200 
  });

  const recenterDiv = document.createElement('div');
  const recenterBtn = document.createElement('button');
  recenterBtn.textContent = 'Center Map';
  recenterBtn.style.padding = '8px';
  recenterBtn.style.border = 'none';
  recenterBtn.style.background = '#fff';
  recenterBtn.style.cursor = 'pointer';
  recenterBtn.style.borderRadius = '4px';
  recenterDiv.appendChild(recenterBtn);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(recenterDiv);

  recenterBtn.addEventListener('click', function () {
    map.panTo(iit);
    map.setZoom(14);
  });
};
