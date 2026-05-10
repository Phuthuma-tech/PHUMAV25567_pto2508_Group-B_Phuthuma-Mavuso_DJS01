/* Genre Logic */
export const GenreService = {
  MAP: {
    1: 'Personal Growth', 2: 'Investigative Journalism', 3: 'History',
    4: 'Comedy', 5: 'Entertainment', 6: 'Business',
    7: 'Fiction', 8: 'News', 9: 'Kids & Family',
  },
  resolve(ids = []) {
    return ids.map(id => this.MAP[id] ?? `Genre ${id}`);
  },
  all() {
    return Object.entries(this.MAP)
      .map(([id, name]) => ({ id: Number(id), name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }
};

/* Date Logic */
export const DateFormatter = {
  relative(iso) {
    try {
      const days = Math.floor((Date.now() - new Date(iso)) / 86_400_000);
      if (days === 0) return 'Updated today';
      if (days < 7)  return `Updated ${days} days ago`;
      if (days < 30) return `Updated ${Math.floor(days / 7)} weeks ago`;
      return `Updated ${Math.floor(days / 30)} months ago`;
    } catch { return 'Unknown date'; }
  },
  full(iso) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    }).format(new Date(iso));
  }
};

/* API Logic */
export const PodcastAPI = {
  BASE: 'https://podcast-api.netlify.app',
  async fetchShows() {
    const r = await fetch(`${this.BASE}/shows`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  },
  async fetchShow(id) {
    const r = await fetch(`${this.BASE}/id/${id}`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  }
};