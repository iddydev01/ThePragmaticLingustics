/**
 * ==========================================================================
 * 1. Content Database (Centralized Array)
 * ==========================================================================
 */
const contentData = [
    {
        id: 1,
        category: "linguistics",
        tag: "Phonetics",
        title: "An Introduction to Speech Sounds",
        summary: "Explore the basics of how our vocal apparatus produces speech sounds and how we categorize them.",
        content: "Phonetics is the branch of linguistics that studies how humans produce and perceive speech sounds. Every language uses a specific subset of the vast array of sounds the human vocal tract can produce. In articulatory phonetics, we look at three main parameters: voicing (whether the vocal cords vibrate), place of articulation (where the sound is made, e.g., the lips, teeth, or soft palate), and manner of articulation (how the airflow is shaped, e.g., stopped completely or squeezed through a narrow gap). Understanding these basics helps linguists map languages and aids speech-language pathologists in therapy."
    },
    {
        id: 2,
        category: "linguistics",
        tag: "Sociolinguistics",
        title: "How Dialects Shape Identity",
        summary: "Discover the social factors behind local dialects and why the way we speak influences how others perceive us.",
        content: "Sociolinguistics explores the complex relationship between language and society. A dialect is not a 'broken' or 'incorrect' version of a language; it is a fully rule-governed linguistic system tied to a specific geographic region or social group. Our dialect functions as a social badge, signaling our background, age, socio-economic status, and peer group alignment. Linguists emphasize that standard dialects are simply those historically spoken by people in positions of political and economic power, not because they are structurally superior."
    },
    {
        id: 3,
        category: "linguistics",
        tag: "Semantics",
        title: "The Shift in Word Meanings",
        summary: "Examine how semantic drift alters the vocabulary of languages over decades and centuries.",
        content: "Language is a living entity, and words constantly evolve in meaning—a process known as semantic change. For example, the word 'nice' once meant 'foolish' or 'ignorant' in Middle English, coming from the Latin 'nescius.' Over centuries, it drifted to mean 'fastidious,' then 'refined,' and eventually 'pleasant.' Semantic drift occurs through mechanisms like broadening (generalizing a meaning), narrowing (restricting a meaning), amelioration (a word becoming more positive), and pejoration (a word becoming more negative). This constant shift demonstrates that dictionaries are historical records of usage, not absolute rulebooks."
    },
    {
        id: 4,
        category: "communication",
        tag: "Listening",
        title: "The Power of Active Listening",
        summary: "Simple and actionable steps to make people feel heard and improve understanding in professional settings.",
        content: "Active listening is the cornerstone of effective communication, yet it is rarely practiced. Instead of listening to understand, most people listen to reply. To practice active listening, follow three steps: 1. Maintain an open, supportive posture and eye contact. 2. Paraphrase or mirror the speaker's core message (e.g., 'It sounds like you feel overwhelmed by the deadline'). 3. Ask open-ended clarifying questions. Doing this reduces misunderstandings, builds profound trust, and helps de-escalate conflicts before they start."
    },
    {
        id: 5,
        category: "communication",
        tag: "Writing",
        title: "Writing Concisely in Emails",
        summary: "Learn how to edit your professional correspondence to save time for your recipients and get faster responses.",
        content: "In professional environments, brevity is a sign of respect. Long, rambling emails are often ignored or misunderstood. To write more concisely, practice the 'bottom-line up-front' (BLUF) method: state your main request or point in the very first sentence. Keep paragraphs to a maximum of three sentences. Use bullet points for choices, tasks, or action items. Finally, edit ruthlessly—remove redundant phrases like 'I am writing to let you know' or 'in order to.' Your colleagues will thank you, and your response rates will improve."
    },
    {
        id: 6,
        category: "communication",
        tag: "Speaking",
        title: "Mastering the Pause in Public Speaking",
        summary: "Learn how silence can be used as a powerful tool to engage listeners and emphasize important points.",
        content: "Many public speakers dread silence, filling every micro-second with vocalized pauses like 'um,' 'uh,' or 'like.' However, a deliberate pause is one of the most powerful rhetorical tools available. Use a 'transition pause' when moving from one major point to another to signal the change to your audience. Use an 'emphasis pause' immediately after a critical point to allow the message to settle in their minds. Embracing silence projects natural confidence and gives your listeners breathing room to digest your speech."
    }
];

/**
 * ==========================================================================
 * 2. Reading Time Utility Function
 * ==========================================================================
 * Computes reading time assuming an average speed of 200 words per minute.
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

// Modal handling
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
document.addEventListener('DOMContentLoaded', () => {
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