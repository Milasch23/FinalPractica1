// Guardar una nueva aplicación
function saveApplication(application) {
    const applications = getApplications();
    applications.push(application);
    localStorage.setItem('jobApplications', JSON.stringify(applications));
}

// Obtener todas las aplicaciones
function getApplications() {
    const applications = localStorage.getItem('jobApplications');
    return applications ? JSON.parse(applications) : [];
}

// Filtrar aplicaciones por estado
function filterApplications(status) {
    const applications = getApplications();
    if (status === 'all') return applications;
    return applications.filter(app => app.status === status);
}

// Eliminar una aplicación
function deleteApplication(index) {
    const applications = getApplications();
    applications.splice(index, 1);
    localStorage.setItem('jobApplications', JSON.stringify(applications));
}