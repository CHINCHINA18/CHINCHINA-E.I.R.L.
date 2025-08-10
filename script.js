// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Variables globales para almacenar datos
    let companyData = {
        name: 'Chinchina Ingeniería & Construcción',
        description: 'Especialistas en construcción de edificios completos, arquitectura e ingeniería. Tu proyecto, nuestra experiencia.',
        logo: null,
        projects: [],
        // SECCIÓN ACTUALIZADA
        contact: {
            phone: '+51 925 430 807',
            email: 'chinchina.e.i.r.l.11@gmail.com',
            address: 'Pj. Qolqa Pampa Nro. S/n Asc. Luz de Copacabana, Sicuani, Canchis - Cusco, Perú'
        },
        colors: {
            primary: '#27ae60',
            secondary: '#2980b9',
            accent: '#f1c40f'
        }
    };

    // ... el resto del script se mantiene igual ...

    // Dentro de la función updateContactInfo() y loadSavedData(), he añadido la lógica
    // para actualizar también los enlaces `href` de los `<a>` tags.
    
    function updateContactInfo() {
        // ...
        const phone = document.getElementById('contactPhoneInput').value; // Asegúrate que el ID del input sea único
        const email = document.getElementById('contactEmailInput').value;
        const address = document.getElementById('contactAddressInput').value;

        if (phone) {
            companyData.contact.phone = phone;
            document.getElementById('contactPhone').textContent = phone;
            document.getElementById('contactPhoneLink').href = `tel:${phone.replace(/\s/g, '')}`;
        }
        if (email) {
            companyData.contact.email = email;
            document.getElementById('contactEmail').textContent = email;
            document.getElementById('contactEmailLink').href = `mailto:${email}`;
        }
        // ...
    }

    function loadSavedData() {
        // ...
        if (data.contact) {
            if (data.contact.phone) {
                document.getElementById('contactPhone').textContent = data.contact.phone;
                document.getElementById('contactPhoneLink').href = `tel:${data.contact.phone.replace(/\s/g, '')}`;
                // ...
            }
            if (data.contact.email) {
                document.getElementById('contactEmail').textContent = data.contact.email;
                document.getElementById('contactEmailLink').href = `mailto:${data.contact.email}`;
                // ...
            }
        }
        // ...
    }


});