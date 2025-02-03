document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const stageName = document.getElementById("stageName").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const country = document.getElementById("country").value;
    
    if (!country) {
        alert("Please select a country.");
        return;
    }

    const candidateID = "MUSR-" + Math.floor(100000 + Math.random() * 900000);
    const amount = country === "NG" ? 10000 * 100 : 500 * 100; // Amount in kobo/cents
    const apiKey = country === "NG" ? "pk_test_f0730205011f0aad9b95ea2b0de58de119e5d92f" : "pk_test_da1eb85457d3558f361ff7790c914896adc832e0";

    let handler = PaystackPop.setup({
        key: apiKey,
        email: email,
        amount: amount,
        currency: country === "NG" ? "NGN" : "ZAR",
        ref: "MUSR-" + Math.floor(Math.random() * 1000000000 + 1),
        callback: function (response) {
            showSuccessModal(name, candidateID, email);
        },
        onClose: function () {
            alert("Payment process was closed.");
        }
    });
    handler.openIframe();
});

function showSuccessModal(name, candidateID, email) {
    const details = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Candidate ID:</strong> ${candidateID}</p>
        <p><strong>Email:</strong> ${email}</p>
        <button onclick="printDetails()" class="primary-button">Print</button>
    `;
    document.getElementById("registrationDetails").innerHTML = details;
    document.getElementById("successModal").style.display = "block";
}

function closeModal() {
    document.getElementById("successModal").style.display = "none";
}

function printDetails() {
    window.print();
}
