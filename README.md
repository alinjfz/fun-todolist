# Fun To-Do List

A lightweight, fully client-side to-do list app built with vanilla JavaScript and Bootstrap 5. Tasks are saved to `localStorage` so they survive page refreshes without any backend.

![screenshot](assets/img/bg.jpg)

## Features

- Add, complete, and delete tasks
- Tasks persist in the browser via `localStorage`
- Live counter showing how many items are left
- One-click "Clear completed" to remove finished tasks
- Responsive layout — works on mobile and desktop
- Zero runtime dependencies (no jQuery, no frameworks)

## Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Markup     | HTML5 (semantic)        |
| Styling    | CSS3 + Bootstrap 5      |
| Logic      | Vanilla JavaScript (ES6+)|
| Storage    | Web Storage API (`localStorage`) |

## Project Structure

```
fun-todolist/
├── index.html          # App entry point
└── assets/
    ├── css/
    │   ├── bootstrap.min.css
    │   └── style.css   # Custom styles
    ├── js/
    │   ├── bootstrap.bundle.min.js
    │   └── main.js     # App logic
    └── img/
        └── bg.jpg      # Background image
```

## Getting Started

No build step required — just open the file in a browser.

```bash
# Clone the repository
git clone https://github.com/alinjfz/fun-todolist.git
cd fun-todolist

# Open directly
open index.html
```

Or drag `index.html` into any browser.

## How It Works

1. The app keeps an in-memory array of todo objects `{ id, text, completed }`.
2. On every change (add / toggle / delete) the array is serialised to `localStorage`.
3. On page load the array is restored from `localStorage` and the UI is re-rendered.
4. Event delegation on the `<ul>` handles checkbox and delete clicks for all items, including newly added ones — no need to re-attach listeners.

## Author

**Ali Najafzadeh** — [GitHub](https://github.com/alinjfz)

## License

[MIT](https://opensource.org/licenses/MIT)
