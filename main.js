// Global state
let bookState = 'closed'; // closed, opening, pages-turning, final-page, zoomed
let currentTab = 'book'; // book, content
let isPlaying = false;
let currentPage = 0;
let isMobile = false;

// DOM elements
const book3d = document.getElementById('book3d');
const bookTab = document.getElementById('bookTab');
const contentTab = document.getElementById('contentTab');
const bookBtn = document.getElementById('bookBtn');
const homeBtn = document.getElementById('homeBtn');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const progressFill = document.getElementById('progressFill');
const backToBookBtn = document.getElementById('backToBookBtn');

// Check if mobile
function checkMobile() {
    isMobile = window.innerWidth < 768;
}

// Initialize
function init() {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Event listeners
    book3d.addEventListener('click', handleBookClick);
    bookBtn.addEventListener('click', () => setCurrentTab('book'));
    homeBtn.addEventListener('click', resetExperience);
    playBtn.addEventListener('click', togglePlayPause);
    backToBookBtn.addEventListener('click', () => setCurrentTab('book'));
}

// Handle book click
function handleBookClick() {
    if (bookState === 'closed') {
        bookState = 'opening';
        book3d.classList.add('opening');
        
        // Show navigation buttons
        setTimeout(() => {
            homeBtn.classList.remove('hidden');
        }, 1000);
        
        // Sequence of animations
        setTimeout(() => {
            bookState = 'pages-turning';
            book3d.classList.remove('opening');
            book3d.classList.add('pages-turning');
            
            // Turn pages one by one
            const pageInterval = setInterval(() => {
                const currentPageElement = document.querySelector(`.page-${currentPage}`);
                if (currentPageElement) {
                    currentPageElement.classList.add('turned');
                }
                
                currentPage++;
                
                if (currentPage >= 9) {
                    clearInterval(pageInterval);
                    bookState = 'final-page';
                    book3d.classList.remove('pages-turning');
                    book3d.classList.add('final-page');
                    
                    // Zoom effect
                    setTimeout(() => {
                        bookState = 'zoomed';
                        book3d.classList.remove('final-page');
                        book3d.classList.add('zoomed');
                        
                        setTimeout(() => {
                            setCurrentTab('content');
                        }, 1500);
                    }, 2000);
                }
            }, 800);
            
        }, 2000);
    }
}

// Toggle play/pause
function togglePlayPause() {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        startProgress();
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        stopProgress();
    }
}

// Start progress animation
function startProgress() {
    progressFill.style.width = '65%';
}

// Stop progress animation
function stopProgress() {
    progressFill.style.width = '0%';
}

// Set current tab
function setCurrentTab(tab) {
    currentTab = tab;
    
    if (tab === 'book') {
        bookTab.classList.add('active');
        contentTab.classList.remove('active');
        bookBtn.classList.add('hidden');
    } else if (tab === 'content') {
        bookTab.classList.remove('active');
        contentTab.classList.add('active');
        bookBtn.classList.remove('hidden');
    }
}

// Reset experience
function resetExperience() {
    bookState = 'closed';
    currentTab = 'book';
    currentPage = 0;
    isPlaying = false;
    
    // Reset book classes
    book3d.className = 'book-3d';
    
    // Reset pages
    const pages = document.querySelectorAll('.book-page');
    pages.forEach(page => {
        page.classList.remove('turned');
    });
    
    // Reset tabs
    setCurrentTab('book');
    
    // Hide navigation buttons
    bookBtn.classList.add('hidden');
    homeBtn.classList.add('hidden');
    
    // Reset player
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    progressFill.style.width = '0%';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);