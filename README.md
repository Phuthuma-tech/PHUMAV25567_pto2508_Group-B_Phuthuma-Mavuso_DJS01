
# 🎙️ PodcastApp

A sleek, modular, single-page application (SPA) built with Vanilla JavaScript. PodcastApp allows users to browse a library of shows, filter by genre, search for specific titles, and view detailed episode information through a responsive and accessible interface.

---

## 🚀 Features

*   **Modular Architecture:** Built using ES6 Modules for clean separation of concerns and maintainability.
*   **Dynamic Data Fetching:** Integrates with a REST API to fetch live podcast data asynchronously.
*   **Intelligent Filtering:** Filter shows by genre or search by title with real-time UI updates.
*   **Advanced Sorting:** Organize podcasts by title (A-Z/Z-A) or by update date (Newest/Oldest).
*   **Modern UI/UX:** Features skeleton loaders for improved perceived performance and staggered CSS animations for smooth transitions.
*   **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewports.
*   **Accessibility (a11y):** Built with semantic HTML5 elements and ARIA roles for screen-reader compatibility.

---

## 🛠️ Tech Stack

*   **Frontend:** Vanilla JavaScript (ES6+)
*   **Styling:** Modern CSS3 utilizing CSS Variables for consistent theming.
*   **Data Source:** Public Podcast REST API.
*   **Icons:** SVG-based icons for high-resolution clarity.

---

## 📂 Project Structure

The codebase is organized into specialized modules to ensure a scalable architecture:

| File | Responsibility |
| :--- | :--- |
| `index.html` | Semantic structure and entry point for the application. |
| `style.css` | Global styling, layout, and animation definitions. |
| `app.js` | **Controller:** Manages global state and orchestrates interactions. |
| `services.js` | **Business Logic:** API communication, date formatting, and data mapping. |
| `ui.js` | **View Logic:** Pure functions responsible for generating DOM elements. |

---

## ⚙️ Installation & Setup

Because this project utilizes **ES Modules**, it must be served via a local web server to comply with browser security policies (CORS).

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/Phuthuma-tech/PHUMAV25567_pto2508_Group-B_Phuthuma-Mavuso_DJS01.git](https://github.com/Phuthuma-tech/PHUMAV25567_pto2508_Group-B_Phuthuma-Mavuso_DJS01.git)
    ```
2.  **Navigate to the Directory:**
    ```bash
    cd podcast-app