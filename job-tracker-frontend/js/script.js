// Página principal (index.html)
if (document.getElementById('jobForm')) {
    document.getElementById('jobForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const application = {
            company: document.getElementById('company').value,
            position: document.getElementById('position').value,
            status: document.getElementById('status').value,
            date: document.getElementById('date').value || new Date().toISOString().split('T')[0],
        };

        saveApplication(application);
        alert('¡Postulación guardada!');
        this.reset();
    });

    document.getElementById('viewApplications').addEventListener('click', function() {
        window.location.href = 'applications.html';
    });
}

// Página de aplicaciones (applications.html)
if (document.getElementById('jobsTable')) {
    // Renderizar tabla
    function renderTable(applications) {
        const tbody = document.querySelector('#jobsTable tbody');
        tbody.innerHTML = applications.map((app, index) => `
            <tr>
                <td>${app.company}</td>
                <td>${app.position}</td>
                <td class="status-${app.status.toLowerCase()}">${app.status}</td>
                <td>${app.date}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteApplication(${index})">Eliminar</button>
                </td>
            </tr>
        `).join('');
    }

    // Filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const status = this.dataset.status;
            renderTable(filterApplications(status));
        });
    });

    // Botón volver
    document.getElementById('goBack').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Cargar datos iniciales
    renderTable(getApplications());
}

// Función global para eliminar (necesaria para el onclick)
window.deleteApplication = function(index) {
    if (confirm('¿Estás segura de eliminar esta postulación?')) {
        deleteApplication(index);
        renderTable(getApplications()); // Recargar tabla
    }
};
