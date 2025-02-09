let trustedContacts = []; 


function showFeature(feature) {
    document.querySelectorAll("section").forEach(sec => sec.style.display = "none");
    document.getElementById(feature).style.display = "block";
    
    const mapSection = document.getElementById("map-section");
    if (mapSection) {
        if (feature === "safety" || feature === "travel") {
            mapSection.style.display = "block";
        } else {
            mapSection.style.display = "none";
        }
    }
}


function shareLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            alert(`Your location: ${position.coords.latitude}, ${position.coords.longitude}`);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function findNearestPoliceStation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
           
            const mapsUrl = `https://www.google.com/maps/search/Police+Station/@${lat},${lng},15z`;
            window.open(mapsUrl, "_blank");
        }, () => {
            alert("Unable to retrieve your location.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showSafeRoute() {
    const destinationInput = document.getElementById("destination");
    if (!destinationInput || destinationInput.value.trim() === "") {
        alert("Please enter a destination!");
        return;
    }

    let destination = destinationInput.value.trim();
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            console.log(`Navigating from: ${lat}, ${lng} to ${destination}`);
            
            const mapsUrl = `https://www.google.com/maps/dir/${lat},${lng}/${encodeURIComponent(destination)}`;
            window.open(mapsUrl, "_blank");
        }, error => {
            console.error("Geolocation error:", error);
            alert("Could not access location. Please allow location access.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

let map;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 20.5937, lng: 78.9629 },
        zoom: 5,
    });
}

function findSafeHotels() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            const mapsUrl = `https://www.google.com/maps/search/Women+Friendly+Hotels/@${lat},${lng},15z`;
            window.open(mapsUrl, "_blank");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function triggerSOS() {
    const sosFeedback = document.getElementById("sos-feedback");
    if (sosFeedback) {
        sosFeedback.style.display = "block";
    }

    alert("Sending SOS alert to your trusted contacts...");

    sendSOSAlertToContacts();
}

function sendSOSAlertToContacts() {
    trustedContacts.forEach(contact => {
        console.log(`SOS alert sent to: ${contact.name}`);
    });
}


function searchContacts() {
    const searchText = document.getElementById('searchContacts').value.toLowerCase();
    const filteredContacts = allUsers.filter(user => user.name.toLowerCase().includes(searchText));
    displaySearchResults(filteredContacts);
}

function displaySearchResults(users) {
    const resultsList = document.getElementById('searchResults');
    resultsList.innerHTML = ''; 
    users.forEach(user => {
        const li = document.createElement('li');
        li.innerText = user.name;

        const addButton = document.createElement('button');
        addButton.innerText = 'Add Contact';
        addButton.onclick = () => addTrustedContact(user.userId);

        li.appendChild(addButton);
        resultsList.appendChild(li);
    });
}

function addTrustedContact(contactId) {
    const contact = allUsers.find(user => user.userId === contactId);
    if (contact && !trustedContacts.includes(contact)) {
        trustedContacts.push(contact);
        console.log('Added to trusted contacts:', contact);
        loadTrustedContacts();
    }
}

function loadTrustedContacts() {
    const contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = '';  
    trustedContacts.forEach(contact => {
        const li = document.createElement('li');
        li.innerText = contact.name;

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.onclick = () => removeTrustedContact(contact.userId);

        li.appendChild(removeButton);
        contactsList.appendChild(li);
    });
}

function removeTrustedContact(contactId) {
    trustedContacts = trustedContacts.filter(contact => contact.userId !== contactId);
    console.log('Removed from trusted contacts:', contactId);
    loadTrustedContacts();
}

const allUsers = [
    { name: 'Alice', userId: 'user1' },
    { name: 'Bob', userId: 'user2' },
    { name: 'Charlie', userId: 'user3' }
];

window.onload = function () {
    if (document.getElementById("map")) {
        initMap();
    }
};

function openBlog() {
    window.location.href = "blog.html";
}
// Add event listener to the SOS button
document.getElementById('sos-button').addEventListener('click', function() {
    // Check if geolocation is supported
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendSOSAlert, handleError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

// Function to handle the location data
function sendSOSAlert(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    // Call your function to send SOS alert with location
    sendSOSMessage(latitude, longitude);
}

// Function to handle errors (e.g., user denies location access)
function handleError(error) {
    alert("Failed to get location: " + error.message);
}
function sendSOSMessage(latitude, longitude) {
    const message = `Emergency! My current location is: Latitude: ${latitude}, Longitude: ${longitude}`;
    
    // Replace with actual code to send SMS via Twilio or any other service
    // For example, using Fetch API to send data to a server-side endpoint:
    fetch('/send-sos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        console.log('SOS message sent:', data);
        alert('SOS alert sent!');
    })
    .catch(error => {
        console.error('Error sending SOS message:', error);
    });
}
