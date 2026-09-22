let appState = {};

async function loadAdminData() {
    const res = await fetch('/api/content');
    appState = await res.json();

    // Populate Base Fields
    document.getElementById('heroHeading').value = appState.heroHeading || '';
    document.getElementById('heroParagraph').value = appState.heroParagraph || '';
    document.getElementById('heroPraise').value = appState.heroPraise || '';
    document.getElementById('whatsappNumber').value = appState.whatsappNumber || '';

    document.getElementById('catalogueTitle').value = appState.catalogueTitle || '';
    document.getElementById('catalogueDesc').value = appState.catalogueDesc || '';
    document.getElementById('catalogueLink').value = appState.catalogueLink || '';

    document.getElementById('collectionTitle').value = appState.collectionTitle || '';
    document.getElementById('collectionDesc').value = appState.collectionDesc || '';

    document.getElementById('reelsTitle').value = appState.reelsTitle || '';
    document.getElementById('reelsDesc').value = appState.reelsDesc || '';

    document.getElementById('shortsTitle').value = appState.shortsTitle || '';
    document.getElementById('shortsDesc').value = appState.shortsDesc || '';

    document.getElementById('staffTitle').value = appState.staffTitle || '';
    document.getElementById('staffDesc').value = appState.staffDesc || '';

    document.getElementById('formTitle').value = appState.formTitle || '';
    document.getElementById('formDesc').value = appState.formDesc || '';

    renderProducts();
    renderReels();
    renderShorts();
    renderStaff();
}

/* --- Products (Edit, Update, Delete) --- */
function renderProducts() {
    const container = document.getElementById('product-admin-list');
    container.innerHTML = appState.products.map((p, idx) => `
    <div class="card-item-box">
      <div class="item-head">
        <strong>Product #${idx + 1}</strong>
        <button type="button" class="btn-delete" onclick="deleteProduct(${idx})">Delete</button>
      </div>
      <label>Title:</label>
      <input type="text" value="${p.title}" oninput="appState.products[${idx}].title = this.value">
      
      <label>Description:</label>
      <textarea rows="2" oninput="appState.products[${idx}].desc = this.value">${p.desc}</textarea>
      
      <label>Image URL:</label>
      <input type="text" value="${p.image}" oninput="appState.products[${idx}].image = this.value">
    </div>
  `).join('');
}

function addProduct() {
    appState.products.push({
        id: Date.now(),
        title: "New Anti-Tarnish Design",
        desc: "18K Gold Plated finish with lifelong anti-rust guarantee.",
        image: "https://via.placeholder.com/600x600?text=Product+Image"
    });
    renderProducts();
}

function deleteProduct(index) {
    if (confirm("Are you sure you want to delete this product?")) {
        appState.products.splice(index, 1);
        renderProducts();
    }
}

/* --- Reels (Edit & Delete) --- */
function renderReels() {
    const container = document.getElementById('reels-admin-list');
    container.innerHTML = appState.reels.map((r, idx) => `
    <div class="card-item-box">
      <div class="item-head">
        <strong>Reel Embed Link #${idx + 1}</strong>
        <button type="button" class="btn-delete" onclick="deleteReel(${idx})">Delete</button>
      </div>
      <input type="text" value="${r.embedUrl}" oninput="appState.reels[${idx}].embedUrl = this.value" placeholder="https://www.instagram.com/reel/.../embed">
    </div>
  `).join('');
}

function addReel() {
    appState.reels.push({ id: Date.now(), embedUrl: "https://www.instagram.com/reel/example/embed" });
    renderReels();
}

function deleteReel(index) {
    appState.reels.splice(index, 1);
    renderReels();
}

/* --- Shorts (Edit & Delete) --- */
function renderShorts() {
    const container = document.getElementById('shorts-admin-list');
    container.innerHTML = appState.shorts.map((s, idx) => `
    <div class="card-item-box">
      <div class="item-head">
        <strong>YouTube Short Embed Link #${idx + 1}</strong>
        <button type="button" class="btn-delete" onclick="deleteShort(${idx})">Delete</button>
      </div>
      <input type="text" value="${s.embedUrl}" oninput="appState.shorts[${idx}].embedUrl = this.value" placeholder="https://www.youtube-nocookie.com/embed/VIDEO_ID">
    </div>
  `).join('');
}

function addShort() {
    appState.shorts.push({ id: Date.now(), embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" });
    renderShorts();
}

function deleteShort(index) {
    appState.shorts.splice(index, 1);
    renderShorts();
}

/* --- Staff (Add, Edit, Delete, Details) --- */
function renderStaff() {
    const container = document.getElementById('staff-admin-list');
    container.innerHTML = appState.staff.map((m, idx) => `
    <div class="card-item-box">
      <div class="item-head">
        <strong>Staff Member #${idx + 1}</strong>
        <button type="button" class="btn-delete" onclick="deleteStaff(${idx})">Delete</button>
      </div>
      <label>Full Name:</label>
      <input type="text" value="${m.name}" oninput="appState.staff[${idx}].name = this.value">
      
      <label>Role / Position:</label>
      <input type="text" value="${m.role}" oninput="appState.staff[${idx}].role = this.value">
      
      <label>Phone / WhatsApp Number:</label>
      <input type="text" value="${m.phone}" oninput="appState.staff[${idx}].phone = this.value">

      <label>Instagram Handle (e.g. @pixiepearls):</label>
      <input type="text" value="${m.instaHandle}" oninput="appState.staff[${idx}].instaHandle = this.value">
    </div>
  `).join('');
}

function addStaff() {
    appState.staff.push({
        id: Date.now(),
        name: "Staff Name",
        role: "Jewellery Stylist",
        phone: "+91 ",
        instaHandle: "@pixiepearls"
    });
    renderStaff();
}

function deleteStaff(index) {
    if (confirm("Delete this staff member?")) {
        appState.staff.splice(index, 1);
        renderStaff();
    }
}

/* --- Save All to Backend --- */
async function saveAllChanges() {
    appState.heroHeading = document.getElementById('heroHeading').value;
    appState.heroParagraph = document.getElementById('heroParagraph').value;
    appState.heroPraise = document.getElementById('heroPraise').value;
    appState.whatsappNumber = document.getElementById('whatsappNumber').value;

    appState.catalogueTitle = document.getElementById('catalogueTitle').value;
    appState.catalogueDesc = document.getElementById('catalogueDesc').value;
    appState.catalogueLink = document.getElementById('catalogueLink').value;

    appState.collectionTitle = document.getElementById('collectionTitle').value;
    appState.collectionDesc = document.getElementById('collectionDesc').value;

    appState.reelsTitle = document.getElementById('reelsTitle').value;
    appState.reelsDesc = document.getElementById('reelsDesc').value;

    appState.shortsTitle = document.getElementById('shortsTitle').value;
    appState.shortsDesc = document.getElementById('shortsDesc').value;

    appState.staffTitle = document.getElementById('staffTitle').value;
    appState.staffDesc = document.getElementById('staffDesc').value;

    appState.formTitle = document.getElementById('formTitle').value;
    appState.formDesc = document.getElementById('formDesc').value;

    const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appState)
    });

    if (res.ok) {
        alert("Success! All changes have been published to your live page.");
    } else {
        alert("Error: Changes could not be saved.");
    }
}

loadAdminData();