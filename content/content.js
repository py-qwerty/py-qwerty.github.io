// content.js - Todas las descripciones y textos del portfolio

const portfolioContent = {
    // Meta información
    meta: {
        title: "Pablo Fernandez — Data Scientist & AI Engineer",
        description: "Data Scientist with expertise in machine learning, AI systems, and scalable software development.",
        ogTitle: "Pablo Fernandez — Data Scientist & AI Engineer",
        ogDescription: "Data Scientist with expertise in machine learning, AI systems, and scalable software development."
    },


    // Header

    header: {
        badge: "AI/ML · Data Science · Cloud · Python · R · Math",
        badgeAriaLabel: "Skills: AI/ML, Data Science, Cloud, Python, R, and Math",
        title: "Pablo Fernandez Lucas",
        subtitle: "Data Scientist & AI Engineer. Specialized in machine learning, data-driven products, and scalable cloud architectures.",

        // Botones
        buttons: {
            viewProjects: "VIEW PROJECTS",
            email: "EMAIL",
            downloadCV: "DOWNLOAD RESUME",
            linkedin: "LINKEDIN"
        },

        // Enlaces y datos
        links: {
            email: "pablofernandelu@gmail.com",
            cvFile: "./pablo_fernandez_lucas_resume.pdf",
            linkedin: "https://www.linkedin.com/in/pablo-fernandez-lucas/"
        }
    },

    // Secciones
    sections: {
        about: {
            title: "About",
            content: "Mathematician & Data Scientist with experience building end-to-end AI and data-driven products for startups serving 13K+ users. Skilled in machine learning, Databricks, cloud architectures (GCP, Azure), and modern app development (Flutter, PostgreSQL). Experienced in LLM/RAG systems for search, classification, and content generation. Passionate about measurable impact, growth metrics (AARRR), and clean, scalable engineering."
        },

        projects: {
            title: "Selected Projects",
            searchPlaceholder: "Search by title or technology...",
            filters: {
                all: "ALL",
                mobile: "MOBILE",
                ai: "AI/ML",
                data: "DATA"
            }
        },

        contact: {
            title: "Contact",
            content: "Open to roles in Data Science, AI/ML engineering, and data-driven product development.",
            email: "pablofernandelu@gmail.com"
        }
    },


    // Footer
    footer: {
        copyright: "© {year} Pablo Fernandez. Built for the future."
    },

    // Lightbox
    lightbox: {
        ariaLabel: "Image viewer",
        previousAriaLabel: "Previous",
        nextAriaLabel: "Next",
        closeAriaLabel: "Close",
        counterFormat: "{current}/{total}"
    }
};

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioContent;
}