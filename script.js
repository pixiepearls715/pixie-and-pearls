
document.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener('keydown', (e) => {
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
        return false;
    }
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        return false;
    }
});


const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyxqJXuMbxXRfvcLkXCDV8KOpMHYlOppe2JfW2u0y4G6iytDUVNFYoanJ1Vn3ytB3oTyg/exec"; 

const WHATSAPP_PHONE = "918097040848";

const form = document.getElementById('leadForm');
const statusText = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const message = document.getElementById('custMsg').value.trim();

    submitBtn.disabled = true;
    submitBtn.innerText = "Sending your inquiry...";
    statusText.style.color = "#9e2a4b";
    statusText.innerText = "Recording your details...";

    if (SCRIPT_URL) {
        fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, phone: phone, message: message })
        }).catch(err => console.log("Sheet Log error"));
    }

    setTimeout(() => {
        statusText.style.color = "#25d366";
        statusText.innerText = "Details saved! Opening WhatsApp...";

        const waText = `*New Inquiry - Pixie & Pearls*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Requirement:* ${message}`;
        const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waText)}`;

        window.open(waUrl, '_blank');

        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit & Connect on WhatsApp";
    }, 1000);
});