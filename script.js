document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DEL DOM ---
    const getEl = (id) => document.getElementById(id);
    const querySel = (selector) => document.querySelector(selector);

    // --- DATOS INICIALES ---
    let companyData = {
        name: 'Chinchina Ingeniería & Construcción',
        description: 'Especialistas en construcción de edificios completos, arquitectura e ingeniería. Tu proyecto, nuestra experiencia.',
        logo: null,
        projects: [
            { id: 1, title: 'Edificio Residencial Sicuani', description: 'Construcción de edificio residencial de 4 pisos con 16 departamentos. Estructura de concreto armado con acabados de primera calidad.', category: 'construccion', image: 'https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', date: 'Diciembre 2024' },
            { id: 2, title: 'Centro Comercial Canchis', description: 'Diseño arquitectónico y construcción de centro comercial de 3 niveles con 24 locales comerciales y área de estacionamiento.', category: 'arquitectura', image: 'https://images.pexels.com/photos/2227832/pexels-photo-2227832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', date: 'Octubre 2024' },
            { id: 3, title: 'Nave Industrial Textil', description: 'Diseño y construcción de nave industrial para producción textil con especificaciones técnicas especializadas y sistemas de ventilación.', category: 'ingenieria', image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', date: 'Junio 2025' }
        ],
        contact: {
            phone: '+51 925 430 807',
            email: 'chinchina.e.i.r.l.11@gmail.com',
            address: 'Pj. Qolqa Pampa Nro. S/n Asc. Luz de Copacabana, Sicuani, Canchis - Cusco, Perú'
        }
    };

    // --- FUNCIONES ---

    const showNotification = (message, type = 'success') => {
        const container = getEl('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        container.appendChild(notification);
        setTimeout(() => { container.removeChild(notification) }, 4000);
    };

    const typeWriter = (element, text, speed = 70) => {
        let i = 0;
        element.innerHTML = '';
        const type = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        type();
    };

    const updateUI = () => {
        // Info de la empresa
        getEl('headerCompanyName').textContent = companyData.name;
        getEl('heroTitle').textContent = companyData.name.toUpperCase();
        typeWriter(getEl('heroTitle'), companyData.name.toUpperCase());
        getEl('heroDescription').textContent = companyData.description;

        // Logo
        if (companyData.logo) {
            getEl('headerLogo').src = companyData.logo;
            getEl('logoPreview').src = companyData.logo;
            getEl('headerLogo').style.display = 'block';
            getEl('logoPreview').style.display = 'block';
        }

        // Contacto
        const { phone, email, address } = companyData.contact;
        getEl('contactPhoneDisplay').textContent = phone;
        getEl('contactEmailDisplay').textContent = email;
        getEl('contactAddressDisplay').innerHTML = address.replace(/\n/g, '<br>');
        getEl('contactPhoneLink').href = `tel:${phone.replace(/\s/g, '')}`;
        getEl('contactEmailLink').href = `mailto:${email}`;

        renderProjects();
    };

    const renderProjects = (filter = 'all') => {
        const grid = getEl('projectsGrid');
        grid.innerHTML = '';
        const filteredProjects = companyData.projects.filter(p => filter === 'all' || p.category === filter);

        filteredProjects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card fade-in';
            card.innerHTML = `
                <div class="project-image"><img src="${project.image}" alt="Imagen de ${project.title}">
                    <div class="project-overlay"><i class="fas fa-search-plus"></i> Ver Detalles</div>
                </div>
                <div class="project-info">
                    <h4>${project.title}</h4>
                    <p>${project.description.substring(0, 100)}...</p>
                    <div class="project-meta">
                        <span class="project-date"><i class="fas fa-calendar-alt"></i> ${project.date}</span>
                        <span class="project-category">${project.category}</span>
                    </div>
                </div>`;
            card.addEventListener('click', () => openProjectModal(project));
            grid.appendChild(card);
        });
        // For scroll animations
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    };
    
    const openProjectModal = (project) => {
        getEl('modalImage').src = project.image;
        getEl('modalImage').alt = `Imagen de ${project.title}`;
        getEl('modalTitle').textContent = project.title;
        getEl('modalDescription').textContent = project.description;
        getEl('projectModal').style.display = 'block';
    };

    const setupEventListeners = () => {
        // --- Event Listeners Generales ---
        querySel('.admin-toggle').addEventListener('click', () => getEl('adminPanel').classList.toggle('open'));
        querySel('.hamburger').addEventListener('click', () => {
            querySel('.hamburger').classList.toggle('active');
            querySel('.nav-links').classList.toggle('active');
        });
        querySel('.modal-close').addEventListener('click', () => getEl('projectModal').style.display = 'none');
        window.addEventListener('click', (e) => { if (e.target === getEl('projectModal')) getEl('projectModal').style.display = 'none'; });
        window.addEventListener('scroll', () => querySel('header').classList.toggle('scrolled', window.scrollY > 50));

        // --- Event Listeners del Panel de Admin ---
        const adminPanel = getEl('adminPanel');

        adminPanel.querySelector('#logoUpload').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    companyData.logo = event.target.result;
                    localStorage.setItem('companyData', JSON.stringify(companyData));
                    updateUI();
                };
                reader.readAsDataURL(file);
            }
        });

        adminPanel.querySelectorAll('.admin-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.closest('.admin-section');
                const title = section.querySelector('h3').textContent;

                if (title.includes('Información de la Empresa')) {
                    companyData.name = getEl('adminCompanyName').value || companyData.name;
                    companyData.description = getEl('adminCompanyDescription').value || companyData.description;
                } else if (title.includes('Información de Contacto')) {
                    companyData.contact.phone = getEl('adminContactPhone').value || companyData.contact.phone;
                    companyData.contact.email = getEl('adminContactEmail').value || companyData.contact.email;
                    companyData.contact.address = getEl('adminContactAddress').value || companyData.contact.address;
                }
                localStorage.setItem('companyData', JSON.stringify(companyData));
                updateUI();
                populateAdminInputs();
                showNotification('Información actualizada');
            });
        });
        
        getEl('addProjectBtn').addEventListener('click', () => {
             const title = getEl('projectTitle').value;
             const description = getEl('projectDescription').value;
             const category = getEl('projectCategory').value;
             const imageFile = getEl('projectUpload').files[0];

             if(!title || !description || !imageFile) {
                 showNotification('Por favor, completa todos los campos del proyecto.', 'error');
                 return;
             }

             const reader = new FileReader();
             reader.onload = (e) => {
                 const newProject = {
                     id: Date.now(),
                     title,
                     description,
                     category,
                     image: e.target.result,
                     date: new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
                 };
                 companyData.projects.unshift(newProject);
                 localStorage.setItem('companyData', JSON.stringify(companyData));
                 updateUI();
                 getEl('projectTitle').value = '';
                 getEl('projectDescription').value = '';
                 getEl('projectUpload').value = '';
                 showNotification('Proyecto agregado exitosamente.');
             };
             reader.readAsDataURL(imageFile);
        });
    };
    
    const populateAdminInputs = () => {
        getEl('adminCompanyName').value = companyData.name;
        getEl('adminCompanyDescription').value = companyData.description;
        getEl('adminContactPhone').value = companyData.contact.phone;
        getEl('adminContactEmail').value = companyData.contact.email;
        getEl('adminContactAddress').value = companyData.contact.address;
    };

    // --- INICIALIZACIÓN ---
    const savedData = localStorage.getItem('companyData');
    if (savedData) {
        companyData = { ...companyData, ...JSON.parse(savedData) };
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    setupEventListeners();
    updateUI();
    populateAdminInputs();
});