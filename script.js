const projects = [
  {
    title: 'Oil Be Back',
    engine: 'Unity',
    description: 'Endless runner that takes place in a water park, where the goal is to survive an enemy that must never come into contact with water: a giant drop of oil.',
    tags: ['Game Mechanics', '3D Art'],
    contributions: ['Built the spawning system', 'Enemy 3D modeling', 'Contributed with project integration'],
    links: [{ text: '✦ Itch.io', url: 'https://krostgames.itch.io/oil-be-back' }],
    media: [
      { type: 'video', src: 'assets/videos/OilBeBack.mp4', caption: 'Gameplay trailer' },
      { type: 'image', src: 'assets/images/OilBeBack.png', caption: 'Main splash art' }
    ],
    challenges: ['Very limited production time (2.5 days).', 'Movement scripts were using different coordinate directions, causing inconsistent object behavior.'],
    solutions: ['We chose a simple game concept and I broke the project down into small, manageable tasks.', 'I coordinated with my teammates to agree on the correct movement directions and updated the scripts accordingly.']
  },
  {
    title: 'Toxic Delicacies',
    engine: 'Unity',
    description: 'A first-person inspection and memory game set in a post-apocalyptic world where mutated food has become the new normal.',
    tags: ['Game Mechanics'],
    contributions: ['Built the spawning system', 'Implemented a click-based selection system', 'Contributed with 2D art'],
    links: [{ text: '✦ Itch.io', url: 'https://mmsiak.itch.io/toxic-delicacies' }],
    media: [
      { type: 'video', src: 'assets/videos/ToxicDelicacies.mp4', caption: 'Gameplay overview' },
      { type: 'image', src: 'assets/images/ToxicDelicacies.png', caption: 'Title screen' }
    ],
    challenges: ['Creating endless gameplay by spawning ingredients without overlapping or appearing in invalid positions.'],
    solutions: ['Instead of spawning new objects every round, I placed all ingredients in predefined locations and kept them disabled. When a new round started, I simply activated the required objects, making them visible on the plate.']
  },
  {
    title: 'Crazed Potato',
    engine: 'Unity',
    description: 'Puzzle-platformer speedrun prototype where players alternate between a normal and a crazed potato.',
    tags: ['Game Design'],
    contributions: ['Built the game mechanics', 'Created 1 puzzle level', 'Designed the art'],
    links: [{ text: '✦ Itch.io', url: 'https://mmsiak.itch.io/crazed-potato' }],
    media: [
      { type: 'video', src: 'assets/videos/CrazedPotato.mp4', caption: 'Mechanics showcase' },
      { type: 'image', src: 'assets/images/SproutedPotato.png', caption: 'Character concept art' }
    ],
    challenges: ['Developing a complete game on my own within a limited timeframe.', 'Combining multiple player abilities.'],
    solutions: ["I kept the game's mechanics and art style intentionally simple to ensure the project was completed on time.", 'I separated player functionality into different components and interfaces, making the code easier to read and maintain.']
  },
  {
    title: 'The Lost Palette',
    engine: 'Unity',
    description: '2D platformer where you embark on an adventure alongside a magical flame companion that shoots fireballs to defeat enemies.',
    tags: ['Game Mechanics', 'UI Logic'],
    contributions: ['Player movement and damage logic', 'Enemy movement and damage logic', 'Programming and integration of the UI elements'],
    links: [{ text: '✦ Itch.io', url: 'https://samurainyak.itch.io/the-lost-palette' }],
    media: [
      { type: 'video', src: 'assets/videos/TheLostPalette.mp4', caption: 'Level gameplay' },
      { type: 'image', src: 'assets/images/TheLostPalette.png', caption: 'Cover art' }
    ],
    challenges: ['The character would get stuck against walls or platforms while jumping.', 'The player could keep jumping indefinitely without touching the ground.'],
    solutions: ['I assigned a frictionless physics material to the player so the character would slide smoothly against surfaces.', 'I implemented a ground detection system (isGrounded) that only allowed jumping while the player was on the ground. I also added a jump counter to prevent unlimited jumps.']
  }
];

const getElement = (id) => document.getElementById(id);
const elements = {
  stars: document.querySelector('.stars'),
  thumbnails: [...document.querySelectorAll('.thumbnail')],
  video: getElement('featuredVideo'),
  image: getElement('featuredImage'),
  title: getElement('featuredTitle'),
  description: getElement('featuredDescription'),
  engine: getElement('featuredEngine'),
  tags: getElement('featuredTags'),
  contributions: getElement('featuredContributions'),
  links: getElement('featuredLinks'),
  caption: getElement('mediaCaption'),
  challenges: getElement('featuredChallenges'),
  solutions: getElement('featuredSolutions'),
  gallery: getElement('featuredGallery'),
  card: getElement('projectCard'),
  backToTop: getElement('backToTop')
};

const cardInner = elements.card?.querySelector('.project-card-inner');
const cardFront = elements.card?.querySelector('.project-card-front');
const cardBack = elements.card?.querySelector('.project-card-back');
let currentProjectIndex = 0;
let currentMediaIndex = 0;

function replaceChildrenWithItems(container, items, tagName, className = '') {
  if (!container) return;

  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    const element = document.createElement(tagName);
    element.textContent = item;
    if (className) element.className = className;
    fragment.append(element);
  });
  container.replaceChildren(fragment);
}

function renderLinks(links) {
  if (!elements.links) return;

  const fragment = document.createDocumentFragment();
  links.forEach(({ text, url }) => {
    const link = document.createElement('a');
    link.className = 'btn btn-level';
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = text;
    fragment.append(link);
  });
  elements.links.replaceChildren(fragment);
}

function renderMedia(project) {
  const media = project.media[currentMediaIndex];
  if (!media || !elements.video || !elements.image) return;

  const isVideo = media.type === 'video';
  elements.video.hidden = !isVideo;
  elements.image.hidden = isVideo;

  if (isVideo) {
    const source = elements.video.querySelector('source');
    if (source && source.src !== new URL(media.src, document.baseURI).href) {
      source.src = media.src;
      elements.video.load();
    }
  } else {
    elements.image.src = media.src;
    elements.image.alt = `${project.title}: ${media.caption}`;
  }

  if (elements.caption) elements.caption.textContent = media.caption;
}

function renderGallery(project) {
  if (!elements.gallery) return;

  const fragment = document.createDocumentFragment();
  project.media.forEach((media) => {
    const item = document.createElement(media.type === 'video' ? 'video' : 'img');
    item.src = media.src;
    item.alt = media.type === 'image' ? `${project.title}: ${media.caption}` : '';
    if (media.type === 'video') {
      item.controls = true;
      item.muted = true;
      item.playsInline = true;
    }
    fragment.append(item);
  });
  elements.gallery.replaceChildren(fragment);
}

function syncProjectCardHeight() {
  if (!elements.card || !cardInner) return;
  const activeSide = elements.card.classList.contains('flipped') ? cardBack : cardFront;
  if (activeSide) cardInner.style.height = `${activeSide.offsetHeight}px`;
}

function updateFeatured(index) {
  const project = projects[index];
  if (!project) return;

  currentProjectIndex = index;
  currentMediaIndex = 0;
  if (elements.title) elements.title.textContent = project.title;
  if (elements.description) elements.description.textContent = project.description;

  replaceChildrenWithItems(elements.engine, project.engine ? [project.engine] : [], 'span');
  replaceChildrenWithItems(elements.tags, project.tags, 'span');
  replaceChildrenWithItems(elements.contributions, project.contributions, 'li');
  replaceChildrenWithItems(elements.challenges, project.challenges, 'li');
  replaceChildrenWithItems(elements.solutions, project.solutions, 'li');
  renderLinks(project.links);
  renderMedia(project);
  renderGallery(project);
  elements.thumbnails.forEach((thumbnail, thumbnailIndex) => {
    thumbnail.classList.toggle('active', thumbnailIndex === index);
  });
  requestAnimationFrame(syncProjectCardHeight);
}

function changeMedia(step) {
  const media = projects[currentProjectIndex]?.media;
  if (!media?.length) return;
  currentMediaIndex = (currentMediaIndex + step + media.length) % media.length;
  renderMedia(projects[currentProjectIndex]);
}

function initializeParallax() {
  if (!elements.stars) return;
  document.addEventListener('mousemove', ({ clientX, clientY }) => {
    const x = (clientX / window.innerWidth) * 10;
    const y = (clientY / window.innerHeight) * 10;
    elements.stars.style.transform = `translate(${x}px, ${y}px)`;
  });
}

function initializeBackToTop() {
  if (!elements.backToTop) return;
  window.addEventListener('scroll', () => {
    elements.backToTop.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  elements.backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initializeFeaturedProject() {
  if (!elements.thumbnails.length) return;

  elements.thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => updateFeatured(index));
  });
  getElement('prevMedia')?.addEventListener('click', () => changeMedia(-1));
  getElement('nextMedia')?.addEventListener('click', () => changeMedia(1));
  getElement('flipCardBtn')?.addEventListener('click', () => {
    elements.card?.classList.add('flipped');
    syncProjectCardHeight();
  });
  getElement('flipCardBackBtn')?.addEventListener('click', () => {
    elements.card?.classList.remove('flipped');
    syncProjectCardHeight();
  });

  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(syncProjectCardHeight);
    if (cardFront) observer.observe(cardFront);
    if (cardBack) observer.observe(cardBack);
  }
  window.addEventListener('resize', syncProjectCardHeight);
  updateFeatured(0);
}

initializeParallax();
initializeBackToTop();
initializeFeaturedProject();
