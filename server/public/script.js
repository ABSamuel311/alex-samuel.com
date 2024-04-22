const button = document.getElementById("checkout");

button.addEventListener("click", () => {
    var boothQt = document.getElementById("boothQt").value;
    var candidQt = document.getElementById("candidQt").value;
    var printQt = document.getElementById("printQt").value;

    // Initialize an array to hold the items
    const items = [];

    // If boothQt is greater than 0, include it in the items
    if (boothQt > 0) {
        items.push({ id: 1, quantity: boothQt });
    }

    // If candidQt is greater than 0, include it in the items
    if (candidQt > 0) {
        items.push({ id: 2, quantity: candidQt });
    }

    // If printQt is greater than 0, include it in the items
    if (printQt > 0) {
        items.push({ id: 3, quantity: printQt });
    }

    // Proceed with checkout only if there are items
    if (items.length > 0) {
        checkout();
        fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items }),
        })
            .then(res => {
                if (res.ok) return res.json();
                return res.json().then(json => Promise.reject(json));
            })
            .then(({ url }) => {
                window.location = url;
            })
            .catch(e => {
                console.error(e.error);
            });
    } else {
        // Show an alert or message to indicate no items selected
        alert("Please select at least one item.");
    }
});



function checkout() {
    var boothQt = document.getElementById("boothQt").value;
    var candidQt = document.getElementById("candidQt").value;
    var printQt = document.getElementById("printQt").value;

    console.log("Quantity for Item 1: " + boothQt);
    console.log("Quantity for Item 2: " + candidQt);
    console.log("Quantity for Item 3: " + printQt);
}
