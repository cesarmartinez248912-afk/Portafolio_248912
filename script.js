const API_URL = "https://portfolio-api-three-black.vercel.app/api/v1";
const ITSON_ID = "210000";

async function cargarProyectos() {
    const container = document.getElementById('projectsContainer');
    
    try {
        const response = await fetch(`${API_URL}/publicProjects/${ITSON_ID}`);
        
        if (!response.ok) {
            throw new Error('Error al cargar proyectos');
        }

        const proyectos = await response.json();
        
        if (proyectos.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📁</div>
                    <p>Aún no hay proyectos publicados.</p>
                </div>
            `;
            return;
        }

        mostrarProyectos(proyectos);
        
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">⚠️</div>
                <p>No se pudieron cargar los proyectos.</p>
            </div>
        `;
    }
}

function mostrarProyectos(proyectos) {
    const container = document.getElementById('projectsContainer');
    
    const projectsHTML = proyectos.map(proyecto => {
        const techTags = proyecto.technologies && proyecto.technologies.length > 0
            ? `<div class="tech-tags">
                ${proyecto.technologies.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('')}
               </div>`
            : '';

        const repoLink = proyecto.repository
            ? `<a href="${proyecto.repository}" target="_blank" class="project-link">Ver repositorio →</a>`
            : '';

        return `
            <div class="project-card">
                <h3>${proyecto.title}</h3>
                <p>${proyecto.description}</p>
                ${techTags}
                ${repoLink}
            </div>
        `;
    }).join('');

    container.innerHTML = `<div class="projects-grid">${projectsHTML}</div>`;
}


document.addEventListener('DOMContentLoaded', cargarProyectos);
