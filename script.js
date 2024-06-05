document.getElementById('getLocation').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('status').innerText = "Geolocation is not supported by this browser.";
    }
});

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    document.getElementById('status').innerText = "Location retrieved successfully!";
    document.getElementById('latitude').innerText = "Latitude: " + latitude;
    document.getElementById('longitude').innerText = "Longitude: " + longitude;

    // Reverse Geocoding using Nominatim API
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.display_name) {
                document.getElementById('address').innerText = "Address: " + data.display_name;
            } else {
                document.getElementById('address').innerText = "No results found";
            }
        })
        .catch(error => {
            document.getElementById('address').innerText = "Geocoder failed: " + error;
        });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('status').innerText = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('status').innerText = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById('status').innerText = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('status').innerText = "An unknown error occurred.";
            break;
    }
}