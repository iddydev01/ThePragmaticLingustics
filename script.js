/**
 * ==========================================================================
 * 1. Content Database Manager
 * ==========================================================================
 * Loads data from our JSON database file asynchronously.
 */
let contentData = [];

async function loadContentDatabase() {
    try {
        const response = await fetch('data/content.json');
        const data = await response.json();
        contentData = data.posts || [];
    } catch (error) {
        console.error('Error loading content database:', error);
    }
}

/**
 * ==========================================================================
 * 2. Reading Time Utility Function
 * ==========================================================================
 */
function calculateReadingTime(text) {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
}

/**
 * ==========================================================================
 * 3. Card Creation & Modal View
 * ==========================================================================
 */
function createCardElement(item) {
    const article = document.createElement('article');
    article.className = 'card';
    
    const readTime = calculateReadingTime(item.content);
    
    article.innerHTML = `
        <div class="card-meta">
            <span class="category-badge">${item.tag}</span>
            <span class="read-time">${readTime}</span>
        </div>
        <h3>${item.title}</h3>
        <p class="summary">${item.summary}</p>
        <button class="read-button" data-id="${item.id}">Read Article &rarr;</button>
    `;

    article.querySelector('.read-button').addEventListener('click', () => {
        openModal(item);
    });
    
    return article;
}

function openModal(item) {
    const modal = document.getElementById('reading-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalTag = document.getElementById('modal-tag');
    const modalTime = document.getElementById('modal-time');
    const modalContent = document.getElementById('modal-content');

    if (modal && modalTitle && modalTag && modalContent) {
        modalTitle.textContent = item.title;
        modalTag.textContent = item.tag;
        
        if (modalTime) {
            modalTime.textContent = calculateReadingTime(item.content);
        }
        
        modalContent.textContent = item.content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }
}

function closeModal() {
    const modal = document.getElementById('reading-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; 
    }
}

/**
 * ==========================================================================
 * 4. Page Render Controllers
 * ==========================================================================
 */
function renderHomepage() {
    const linguisticsGrid = document.getElementById('linguistics-grid');
    const communicationGrid = document.getElementById('communication-grid');

    if (linguisticsGrid) {
        linguisticsGrid.innerHTML = '';
        contentData.filter(item => item.category === 'linguistics').slice(0, 2).forEach(item => {
            linguisticsGrid.appendChild(createCardElement(item));
        });
    }

    if (communicationGrid) {
        communicationGrid.innerHTML = '';
        contentData.filter(item => item.category === 'communication').slice(0, 2).forEach(item => {
            communicationGrid.appendChild(createCardElement(item));
        });
    }
}

function renderCategoryPage(category) {
    const gridId = `${category}-page-grid`;
    const grid = document.getElementById(gridId);
    if (!grid) return;

    const items = contentData.filter(item => item.category === category);
    
    const displayItems = (filteredItems) => {
        grid.innerHTML = '';
        filteredItems.forEach(item => {
            grid.appendChild(createCardElement(item));
        });
    };

    displayItems(items);

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            const selectedTag = e.target.getAttribute('data-tag');
            if (selectedTag === 'all') {
                displayItems(items);
            } else {
                const filtered = items.filter(item => item.tag.toLowerCase() === selectedTag.toLowerCase());
                displayItems(filtered);
            }
        });
    });
}

/**
 * ==========================================================================
 * 5. Initialization
 * ==========================================================================
 */
document.addEventListener('DOMContentLoaded', async () => {
    // Await database fetch before performing page rendering
    await loadContentDatabase();

    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('reading-modal');

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    if (document.getElementById('linguistics-grid') || document.getElementById('communication-grid')) {
        renderHomepage();
    }
    if (document.getElementById('linguistics-page-grid')) {
        renderCategoryPage('linguistics');
    }
    if (document.getElementById('communication-page-grid')) {
        renderCategoryPage('communication');
    }
});