function analyzeText() {

    let text = document.getElementById("textInput").value;

    if (text.trim() === "") {

        document.getElementById("status").innerText =
            "⚠️ Please enter some text.";

        return;
    }

    // Email detection
    let emails = text.match(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    ) || [];


    // Date detection
    let dates = text.match(
        /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/g
    ) || [];


    // Organization detection
    let organizationPattern =
        /\b[A-Z][A-Za-z]*(?:\s+[A-Z][A-Za-z]*)*\s+(?:College|University|School|Institute|Company|Corporation|Technologies|Limited)\b/g;

    let organizations =
        text.match(organizationPattern) || [];


    // Place detection
    let placeWords = [
        "Chennai",
        "Bangalore",
        "Bengaluru",
        "Mumbai",
        "Delhi",
        "Hyderabad",
        "Kolkata",
        "Tamil Nadu",
        "India",
        "London",
        "New York"
    ];

    let places = [];

    for (let place of placeWords) {

        if (text.toLowerCase().includes(place.toLowerCase())) {
            places.push(place);
        }
    }


    // Simple person-name detection
    let personPattern =
        /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g;

    let people = text.match(personPattern) || [];


    // Remove organization names from people
    people = people.filter(function(name) {

        return !organizations.some(function(org) {
            return org.includes(name);
        });

    });


    displayResult("people", people);
    displayResult("places", places);
    displayResult("organizations", organizations);
    displayResult("emails", emails);
    displayResult("dates", dates);


    document.getElementById("status").innerText =
        "✅ Entity analysis completed!";
}


function displayResult(id, items) {

    let element = document.getElementById(id);

    if (items.length === 0) {

        element.innerText = "None";

    } else {

        element.innerText =
            [...new Set(items)].join(", ");
    }
}


function clearText() {

    document.getElementById("textInput").value = "";

    document.getElementById("people").innerText = "None";
    document.getElementById("places").innerText = "None";
    document.getElementById("organizations").innerText = "None";
    document.getElementById("emails").innerText = "None";
    document.getElementById("dates").innerText = "None";

    document.getElementById("status").innerText =
        "🟢 Ready to analyze";
}
