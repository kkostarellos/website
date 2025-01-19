// Select all navigation items, sections, and side menus
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('main > section');
const sideMenus = document.querySelectorAll('#side-menu > div');

// Function to show the selected section and side menu
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const target = item.getAttribute('data-target');

    // Hide all sections and side menus
    sections.forEach(section => section.classList.add('hidden'));
    sideMenus.forEach(menu => menu.classList.add('hidden'));

    // Show the selected section and its corresponding side menu
    document.getElementById(target).classList.remove('hidden');
    const sideMenu = document.getElementById(`${target}-menu`);
    if (sideMenu) sideMenu.classList.remove('hidden');

    // Load content dynamically based on the section
    if (target === "exhibitions") loadExhibitions();
    if (target === "paintings") loadPaintings();
    if (target === "links") loadLinks();
  });
});

// Function to fetch and display exhibitions
function loadExhibitions() {
  fetch('/api/exhibitions')
    .then(res => res.json())
    .then(data => {
      const content = document.getElementById('exhibition-content');
      content.innerHTML = data.map(exhibition => `
        <div>
          <h3>${exhibition.title}</h3>
          <p>${exhibition.description}</p>
          <p>Location: ${exhibition.location}</p>
          <p>Date: ${exhibition.date}</p>
        </div>
      `).join('');
    })
    .catch(() => alert("Failed to load exhibitions."));
}

// Function to fetch and display paintings
function loadPaintings() {
  fetch('/api/paintings')
    .then(res => res.json())
    .then(data => {
      const container = document.querySelector('#paintings .paintings-flex');
      container.innerHTML = data.map(painting => `
        <div>
          <img src="${painting.image}" alt="${painting.title}">
          <p>${painting.title}</p>
        </div>
      `).join('');
    })
    .catch(() => alert("Failed to load paintings."));
}

// Function to fetch and display links
function loadLinks() {
  fetch('/api/links')
    .then(res => res.json())
    .then(data => {
      const content = document.getElementById('links');
      content.innerHTML = data.map(category => `
        <h3>${category.category}</h3>
        ${category.links.map(link => `<a href="${link.url}" target="_blank">${link.name}</a>`).join('<br>')}
      `).join('');
    })
    .catch(() => alert("Failed to load links."));
}

// Handle login form submission
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Login successful!');
      } else {
        alert('Invalid credentials.');
      }
    });
}
