import { PodcastAPI, GenreService } from './services.js';
import { CardRenderer, ModalRenderer } from './ui.js';

/* --- Application State --- */
const State = {
  shows: [],
  genre: '',
  query: '',
  sort: 'newest',

  applyFilters() {
    let result = [...this.shows];
    if (this.genre) result = result.filter(s => s.genres.includes(Number(this.genre)));
    if (this.query) result = result.filter(s => s.title.toLowerCase().includes(this.query.toLowerCase()));
    
    result.sort((a, b) => {
      if (this.sort === 'az') return a.title.localeCompare(b.title);
      if (this.sort === 'za') return b.title.localeCompare(a.title);
      if (this.sort === 'oldest') return new Date(a.updated) - new Date(b.updated);
      return new Date(b.updated) - new Date(a.updated);
    });
    return result;
  }
};

/* --- DOM Elements --- */
const grid = document.getElementById('shows-grid');
const genreSelect = document.getElementById('genre-select');
const searchInput = document.getElementById('search-input');

/* --- Render Function --- */
function render() {
  const filtered = State.applyFilters();
  grid.innerHTML = '';
  if (filtered.length === 0) {
    grid.innerHTML = '<p>No shows found.</p>';
    return;
  }
  filtered.forEach((show, i) => {
    const card = CardRenderer.card(show, i);
    card.onclick = () => openModal(show.id);
    grid.appendChild(card);
  });
}

/* --- Modal Logic --- */
async function openModal(id) {
  const backdrop = document.getElementById('modal-backdrop');
  const inner = document.getElementById('modal-inner');
  backdrop.classList.add('open');
  inner.innerHTML = ModalRenderer.loading();
  
  try {
    const data = await PodcastAPI.fetchShow(id);
    inner.innerHTML = ModalRenderer.full(data);
    document.getElementById('modal-close-btn').onclick = () => backdrop.classList.remove('open');
  } catch (err) {
    inner.innerHTML = '<p>Error loading details.</p>';
  }
}

/* --- Initialization --- */
async function init() {
  // Populate Genres
  const genres = GenreService.all();
  genreSelect.innerHTML = '<option value="">All Genres</option>' + 
    genres.map(g => `<option value="${g.id}">${g.name}</option>`).join('');

  // Initial Data Fetch
  grid.innerHTML = '';
  for(let i=0; i<8; i++) grid.appendChild(CardRenderer.skeleton());

  try {
    State.shows = await PodcastAPI.fetchShows();
    render();
  } catch (err) {
    grid.innerHTML = '<p>Failed to load podcasts.</p>';
  }

  // Event Listeners
  genreSelect.onchange = (e) => { State.genre = e.target.value; render(); };
  searchInput.oninput = (e) => { State.query = e.target.value; render(); };
  document.getElementById('sort-select').onchange = (e) => { State.sort = e.target.value; render(); };
  
  // UI Toggles
  document.getElementById('search-toggle-btn').onclick = () => document.getElementById('search-overlay').classList.add('open');
  document.getElementById('search-close-btn').onclick = () => document.getElementById('search-overlay').classList.remove('open');
}

init();