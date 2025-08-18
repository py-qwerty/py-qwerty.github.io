// render.js - Script para renderizar el contenido desde content.js

document.addEventListener('DOMContentLoaded', function() {
    // Verificar que portfolioContent existe
    if (typeof portfolioContent === 'undefined') {
        console.error('portfolioContent no está definido. Asegúrate de cargar content.js primero.');
        return;
    }

    // Renderizar meta tags
    document.getElementById('page-title').textContent = portfolioContent.meta.title;
    document.getElementById('meta-description').setAttribute('content', portfolioContent.meta.description);
    document.getElementById('og-title').setAttribute('content', portfolioContent.meta.ogTitle);
    document.getElementById('og-description').setAttribute('content', portfolioContent.meta.ogDescription);

    // Renderizar header
    const badge = document.getElementById('header-badge');
    badge.textContent = portfolioContent.header.badge;
    badge.setAttribute('aria-label', portfolioContent.header.badgeAriaLabel);

    document.getElementById('main-title').textContent = portfolioContent.header.title;
    document.getElementById('header-subtitle').textContent = portfolioContent.header.subtitle;

    // Renderizar botones del header
    const actionsContainer = document.getElementById('header-actions');
    actionsContainer.innerHTML = `
    <a class="btn primary" href="#projects">${portfolioContent.header.buttons.viewProjects}</a>
    <a class="btn" id="email-btn" href="mailto:${portfolioContent.header.links.email}" data-copy="${portfolioContent.header.links.email}">${portfolioContent.header.buttons.email}</a>
    <a class="btn" href="${portfolioContent.header.links.cvFile}" download>${portfolioContent.header.buttons.downloadCV}</a>
    <a class="btn" href="${portfolioContent.header.links.linkedin}" target="_blank" rel="noreferrer">${portfolioContent.header.buttons.linkedin}</a>
  `;

    // Renderizar sección About
    document.getElementById('about-title').textContent = portfolioContent.sections.about.title;
    document.getElementById('about-content').textContent = portfolioContent.sections.about.content;

    // Renderizar sección Projects
    document.getElementById('projects-title').textContent = portfolioContent.sections.projects.title;
    document.getElementById('search').setAttribute('placeholder', portfolioContent.sections.projects.searchPlaceholder);

    // Renderizar filtros
    const filterContainer = document.getElementById('filter-buttons');
    for (const [key, value] of Object.entries(portfolioContent.sections.projects.filters)) {
        const button = document.createElement('button');
        button.className = key === 'all' ? 'chip active' : 'chip';
        button.setAttribute('data-filter', key);
        button.textContent = value;
        filterContainer.appendChild(button);
    }

    // Renderizar sección Contact
    document.getElementById('contact-title').textContent = portfolioContent.sections.contact.title;
    document.getElementById('contact-content').innerHTML = `
    ${portfolioContent.sections.contact.content}
    <br><strong style="color:var(--primary);font-family:monospace;">${portfolioContent.sections.contact.email}</strong>
  `;

    // Renderizar footer
    const currentYear = new Date().getFullYear();
    document.getElementById('footer-content').textContent =
        portfolioContent.footer.copyright.replace('{year}', currentYear);

    // Configurar lightbox
    const lightbox = document.getElementById('lightbox');
    lightbox.setAttribute('aria-label', portfolioContent.lightbox.ariaLabel);
    document.getElementById('lb-prev').setAttribute('aria-label', portfolioContent.lightbox.previousAriaLabel);
    document.getElementById('lb-next').setAttribute('aria-label', portfolioContent.lightbox.nextAriaLabel);
    document.getElementById('lb-close').setAttribute('aria-label', portfolioContent.lightbox.closeAriaLabel);
});