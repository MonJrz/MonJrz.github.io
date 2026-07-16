
// =============================================
// 1. PARALLAX EN ESTRELLAS
// =============================================
document.addEventListener('mousemove', (e) => {
    const stars = document.querySelector('.stars');
    if (stars) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        stars.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    }
});

// =============================================
// 2. ANIMACIÓN Y EFECTO 3D EN TARJETAS (level-cards)
// =============================================
const cards = document.querySelectorAll('.level-card');
if (cards.length) {
    // Animación de entrada con IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 120);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition =
            `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Efecto de inclinación 3D al pasar el mouse
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (x - centerX) / 20;
            card.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// =============================================
// 3. BOTÓN "VOLVER ARRIBA"
// =============================================
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// =============================================
// 4. CARRUSEL DE PROYECTOS DESTACADOS
// =============================================
// Datos de los proyectos (¡edita con tus juegos!)
const descriptionEl = document.getElementById('featuredDescription');
const projects = [
        {
        title: "Oil Be Back",
        description: "Endless runner that takes place in a water park, where the goal is to survive an enemy that must never come into contact with water: a giant drop of oil.",
        tags: ["Unity", "C#", "Game Mechanics", "3D Art"],
        contributions: [
            "Built the spawning system",
            "Enemy 3D modeling",
            "Contributed with project integration"
        ],
        links: [
            { text: "✦ Itch.io", url: "https://krostgames.itch.io/oil-be-back" }
        ],
        video: "assets/videos/OilBeBack.mp4"
    },
    
    {
        title: "Toxic Delicacies",
        description: "A first-person inspection and memory game set in a post-apocalyptic world where mutated food has become the new normal. Identify distorted ingredients, verify each ration against the official catalog, and avoid approving dangerous combinations. Every mistake forces you to consume the meal—and in this world, toxicity comes from the combination, not the ingredients themselves.",
        tags: ["Unity", "C#", "Game Mechanics"],
        contributions: [
            "Built the spawning system",
            "Implemented a clic-based selection system",
            "Contributed with 2D art"
        ],
        links: [
            { text: "✦ Itch.io", url: "https://mmsiak.itch.io/toxic-delicacies" }
        ],
        video: "assets/videos/ToxicDelicacies.mp4"
    },
    {
        title: "Crazed Potato",
        description: "Crazed Potato is a puzzle-platformer speedrun prototype where players alternate between a normal and a crazed potato. Dig through terrain in your normal form, then climb walls after being sprayed with pesticide to discover the fastest route through each level.",
        tags: ["Unity", "C#", "Game Design"],
        contributions: [
            "Built the game mechanics",
            "Created 1 puzzle level",
            "Designed the art"
        ],
        links: [
            { text: "✦ Itch.io", url: "https://mmsiak.itch.io/crazed-potato" },
        ],
        video: "assets/videos/CrazedPotato.mp4"
    },
    {
        title: "The Lost Palette",
        description: "The Lost Palette is a 2D platformer where you embark on an adventure alongside a magical flame companion that shoots fireballs to defeat enemies. At the beginning of each level, a target number of enemies is set, and your goal is to eliminate them all while navigating the environment",
        tags: ["Game Mechanics", "UI Logic"],
        contributions: [
            "Player movement and damage logic",
            "Enemy movement and damage logic",
            "Programming and integration of the UI elements"
        ],
        links: [
            { text: "✦ Itch.io", url: "https://samurainyak.itch.io/the-lost-palette" }
        ],
        video: "assets/videos/TheLostPalette.mp4" 
    }
];

// Referencias a los elementos del DOM
const thumbnails = document.querySelectorAll('.thumbnail');
const videoElement = document.getElementById('featuredVideo');
const titleEl = document.getElementById('featuredTitle');
const tagsContainer = document.getElementById('featuredTags');
const contributionsList = document.getElementById('featuredContributions');
const linksContainer = document.getElementById('featuredLinks');

// Función para actualizar el carrusel
function updateFeatured(index) {
    const project = projects[index];
    if (!project) return;

    // Actualizar video (MP4 local)
    if (videoElement) {
        const source = videoElement.querySelector('source');
        if (source) {
            source.src = project.video;
            videoElement.load(); // recarga el video
        }
    }

    // Actualizar título
    if (titleEl) titleEl.textContent = project.title;

    // Actualizar descripción
if (descriptionEl) {
    descriptionEl.textContent = project.description || '';
}

    // Actualizar etiquetas
    if (tagsContainer) {
        tagsContainer.innerHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');
    }

    // Actualizar contribuciones
    if (contributionsList) {
        contributionsList.innerHTML = project.contributions.map(item => `<li>${item}</li>`).join('');
    }

    // Actualizar enlaces
    if (linksContainer) {
        linksContainer.innerHTML = project.links.map(link =>
            `<a href="${link.url}" target="_blank" class="btn btn-level">${link.text}</a>`
        ).join('');
    }

    // Marcar miniatura activa
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Asignar evento a cada miniatura
thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        updateFeatured(index);
    });
});

// Inicializar con el primer proyecto
if (thumbnails.length > 0) {
    updateFeatured(0);
}

// =============================================
// 5. PLACEHOLDER PARA VIDEOS (muestra si no carga)
// =============================================
const videoPlaceholder = document.getElementById('videoPlaceholder');

if (videoElement && videoPlaceholder) {
    // Cuando el video se carga correctamente, ocultar placeholder
    videoElement.addEventListener('loadeddata', () => {
        videoPlaceholder.classList.add('hidden');
    });

    // Si hay error al cargar, mostrar placeholder
    videoElement.addEventListener('error', () => {
        videoPlaceholder.classList.remove('hidden');
    });

    // También lo ocultamos cuando el usuario hace clic en play
    videoElement.addEventListener('play', () => {
        videoPlaceholder.classList.add('hidden');
    });

    // Verificar si el video ya está cargado al inicio
    if (videoElement.readyState >= 3) {
        videoPlaceholder.classList.add('hidden');
    }
}
