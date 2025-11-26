## Museu do Traje Website

This is the official website for Museu do Traje, São Brás de Alportel. It showcases the museum's exhibitions, activities, tours, donation options, and volunteer opportunities. The site is built with React, Vite, and Tailwind CSS, and is deployed via GitHub Pages.

### Features
- Home page with museum highlights and mission
- Exhibitions: Permanent, Temporary, and Archive, with full-screen image galleries
- Activities, Tours, Plans & Volunteers, Contact, and Donate pages
- Admin panel for non-developers to add, edit, and delete exhibitions (supports multiple images and categories)
- Multi-language support (i18n)
- Responsive, modern UI

### Getting Started
1. **Install dependencies:**
	```sh
	npm install
	```
2. **Run locally:**
	```sh
	npm run dev
	```
3. **Admin Panel:**
	Visit `/admin/exhibitions` in your browser to manage exhibitions.

### Deployment (GitHub Pages)
1. Set the `homepage` field in `package.json` to your repo URL (already set).
2. Build and deploy:
	```sh
	npm run deploy
	```
	This will build the site and publish it to GitHub Pages. The `404.html` is auto-generated for SPA routing support.

### Project Structure
- `src/pages/` — Main site pages (Home, Exhibitions, Admin, etc.)
- `src/components/` — Reusable UI components
- `src/assets/` — Images and static assets
- `public/` — Favicon and static files
- `src/i18n/` — Localization files

### Technologies
- React + Vite
- Tailwind CSS
- React Router
- i18next
- GitHub Pages

### Contributing
Pull requests and suggestions are welcome! Please open an issue for major changes.

### License
MIT
