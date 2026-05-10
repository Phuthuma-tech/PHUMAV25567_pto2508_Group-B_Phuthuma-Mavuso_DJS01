import { GenreService, DateFormatter } from './services.js';

export const CardRenderer = {
  skeleton() {
    const el = document.createElement('div');
    el.className = 'skeleton-card';
    el.innerHTML = `<div class="sk-block is-cover"></div><div class="sk-body"><div class="sk-block w-80"></div></div>`;
    return el;
  },
  card(show, index) {
    const genres = GenreService.resolve(show.genres);
    const updated = DateFormatter.relative(show.updated);
    const el = document.createElement('article');
    el.className = 'show-card';
    el.style.animationDelay = `${Math.min(index * 30, 320)}ms`;
    el.innerHTML = `
        <img class="card-cover" src="${show.image}" alt="${show.title}" loading="lazy" />
        <div class="card-body">
          <h2 class="card-title">${show.title}</h2>
          <div class="card-seasons">${show.seasons} season${show.seasons !== 1 ? 's' : ''}</div>
          <div class="card-tags">${genres.slice(0, 3).map(g => `<span class="tag">${g}</span>`).join('')}</div>
          <p class="card-updated">${updated}</p>
        </div>`;
    return el;
  }
};

export const ModalRenderer = {
  loading: () => `<div class="modal-loading"><div class="spinner"></div><p>Loading show details…</p></div>`,
  full(show) {
    const genres = GenreService.resolve(show.genres);
    const seasonRows = (show.seasons || []).map((s, i) => `
      <li class="season-row">
        <div class="season-info"><strong>${s.title || `Season ${i+1}`}</strong></div>
        <div class="season-eps-count">${s.episodes?.length || 0} eps</div>
      </li>`).join('');

    return `
      <div class="modal-header"><h2 class="modal-title">${show.title}</h2><button class="modal-close" id="modal-close-btn">×</button></div>
      <div class="modal-top"><img class="modal-cover" src="${show.image}" />
        <div class="modal-info"><p>${show.description}</p></div>
      </div>
      <section class="modal-seasons"><ul class="seasons-list">${seasonRows}</ul></section>`;
  }
};