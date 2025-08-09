# Drew's Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Showcases projects, skills, and blog content with a focus on accessibility and performance.

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Performance**: Optimized for speed with lazy loading and efficient bundling
- **SEO Ready**: Meta tags, Open Graph, sitemap, and structured data
- **Content Management**: JSON-based content for easy updates

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Deployment**: GitHub Pages with GitHub Actions
- **Styling**: Tailwind CSS with custom design system

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ProjectCard.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Projects.tsx
│   ├── ProjectDetails.tsx
│   ├── Blog.tsx
│   ├── About.tsx
│   └── Contact.tsx
├── content/            # JSON content files
│   ├── projects.json
│   └── blog.json
├── App.tsx
├── main.tsx
└── index.css
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/drewrogers10/DrewsWebsite.git
cd DrewsWebsite
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎨 Customization

### Colors

The color scheme is defined in `tailwind.config.ts`:

```typescript
colors: {
  primary: "#1a2a6c",    // Deep blue
  secondary: "#b21f1f",  // Deep red
  accent: "#fdbb2d",     // Golden yellow
}
```

### Content

- **Projects**: Edit `src/content/projects.json`
- **Blog Posts**: Edit `src/content/blog.json`
- **Personal Info**: Update the About page and contact details

### Images

Place images in the `public/images/` directory and reference them in your JSON content files.

## 🚀 Deployment

The site automatically deploys to GitHub Pages when you push to the main branch. The deployment is handled by GitHub Actions.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. The `dist/` folder contains the production build ready for deployment.

## 🔍 SEO & Performance

- Semantic HTML structure
- Meta tags and Open Graph data
- Sitemap and robots.txt
- Lazy loading for images
- Optimized bundle size
- Lighthouse score: 90+ across all categories

## ♿ Accessibility Features

- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios
- Focus indicators
- Alt text for images
- Semantic HTML elements

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- Email: drew@example.com
- LinkedIn: [linkedin.com/in/drewrogers10](https://linkedin.com/in/drewrogers10)
- GitHub: [github.com/drewrogers10](https://github.com/drewrogers10)

---

Built with ❤️ by Drew
