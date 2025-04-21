// Función para cargar servicios desde la API
function loadServices() {
    fetch('../backend/api.php?endpoint=services')
        .then(response => response.json())
        .then(data => {
            console.log('Datos recibidos de la API:', data);

            if (!data.data || !Array.isArray(data.data)) {
                console.error('La API no devolvió datos válidos:', data);
                return;
            }

            const servicesList = document.getElementById('services-list');
            servicesList.innerHTML = '';

            const lowCode = data.data.find(service => service.titulo?.esp === 'Soluciones Low-Code');
            const multiExperiencia = data.data.find(service => service.titulo?.esp === 'Soluciones Multiexperiencia');
            const otherServices = data.data.filter(service =>
                service.titulo?.esp !== 'Soluciones Low-Code' &&
                service.titulo?.esp !== 'Soluciones Multiexperiencia'
            );

            const reorderedServices = [
                ...(multiExperiencia ? [multiExperiencia] : []),
                ...(lowCode ? [lowCode] : []),
                ...otherServices
            ];

            reorderedServices.forEach(service => {
                const col = document.createElement('div');
                col.className = 'col-md-4 mb-4';
                col.innerHTML = `
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">${service.titulo?.esp || 'Título no disponible'}</h5>
                            <p class="card-text">${service.descripcion?.esp || 'Descripción no disponible'}</p>
                        </div>
                    </div>
                `;
                servicesList.appendChild(col);
            });
        })
        .catch(error => console.error('Error al cargar los datos de "services":', error));
}

// Función para cargar información de "Nosotros" desde la API
function loadAboutUs() {
    fetch('../backend/api.php?endpoint=about-us')
        .then(response => response.json())
        .then(data => {
            const aboutUsContainer = document.getElementById('about-us');
            aboutUsContainer.innerHTML = '';
            data.data.forEach(item => {
                const col = document.createElement('div');
                col.className = 'col-md-4 mb-4';
                col.innerHTML = `
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">${item.titulo?.esp || 'Título no disponible'}</h5>
                            <p class="card-text">${item.descripcion?.esp || 'Descripción no disponible'}</p>
                        </div>
                    </div>
                `;
                aboutUsContainer.appendChild(col);
            });
        })
        .catch(error => console.error('Error al cargar los datos de "about-us":', error));
}

// Función para cargar las tarjetas de bienvenida desde la API
function loadWelcomeContent() {
    fetch('../backend/api.php?endpoint=welcome')
        .then(response => response.json())
        .then(data => {
            const welcomeContent = document.getElementById('welcome-content');
            welcomeContent.innerHTML = '';
            data.data.forEach(item => {
                const col = document.createElement('div');
                col.className = 'col-md-4 mb-4';
                col.innerHTML = `
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">${item.titulo || 'Título no disponible'}</h5>
                            <p class="card-text">${item.descripcion || 'Descripción no disponible'}</p>
                        </div>
                    </div>
                `;
                welcomeContent.appendChild(col);
            });
        })
        .catch(error => console.error('Error al cargar las tarjetas de bienvenida:', error));
}

// Función para alternar entre los modos día y noche
function toggleTheme() {
    const body = document.body;
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const themeIcon = document.getElementById('theme-icon');

    body.classList.toggle('night-mode');
    header.classList.toggle('night-mode');
    footer.classList.toggle('night-mode');

    if (body.classList.contains('night-mode')) {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'night');
    } else {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'day');
    }
}

// Función para cargar el tema desde localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const themeIcon = document.getElementById('theme-icon');

    if (savedTheme === 'night') {
        body.classList.add('night-mode');
        if (header) header.classList.add('night-mode');
        if (footer) footer.classList.add('night-mode');
        if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        body.classList.remove('night-mode');
        if (header) header.classList.remove('night-mode');
        if (footer) footer.classList.remove('night-mode');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

// Función para inicializar el menú hamburguesa
function initializeNavbar() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', () => {
            navbarCollapse.classList.toggle('show');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }
}

// Función para manejar el envío del formulario de contacto
function handleContactFormSubmit() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !service || !message) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        console.log('Formulario enviado:');
        console.log('Nombre:', name);
        console.log('Servicio seleccionado:', service);
        console.log('Mensaje:', message);

        alert('Formulario enviado correctamente. Revisa la consola para ver los datos.');
    });
}

// Llama a las funciones cuando la página se cargue
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    initializeNavbar();
    handleContactFormSubmit();

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (document.getElementById('services-list')) {
        loadServices();
    }
    if (document.getElementById('about-us')) {
        loadAboutUs();
    }
    if (document.getElementById('welcome-content')) {
        loadWelcomeContent();
    }
});