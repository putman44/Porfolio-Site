# Portfolio Website - Taylor Putman

A modern, responsive portfolio website showcasing projects, skills, and contact information. Built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion** for animations.

---

## Features

- **Dark/Light Mode Toggle** with smooth transitions
- **Hero Section** with parallax scrolling effects
- **About Section** with animated info cards
- **Skills Section** with categorized animated skill grid
- **Projects Section** showcasing featured projects with demo and GitHub links
- **Contact Form** integrated with **EmailJS**
- **Star and Meteor Background Animations**
- **Responsive Navbar** with mobile menu and theme toggle
- **Footer** with smooth scroll to top
- Fully **TypeScript** typed for better developer experience

---

## Technologies Used

- React & TypeScript
- Tailwind CSS
- Framer Motion (animations)
- React Intersection Observer
- EmailJS (for contact form)
- Lucide Icons

---

## Environment Variables

For EmailJS integration, create a `.env` file at the project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> Replace `your_service_id`, `your_template_id`, and `your_public_key` with your actual EmailJS credentials.

**Usage in Contact Section:**

```ts
await emailjs.sendForm(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  form.current,
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);
```

**Important:** Add `.env` to `.gitignore` to avoid exposing your keys.

---

## Project Structure

```
src/
├─ components/
│  ├─ Navbar.tsx
│  ├─ HeroSection.tsx
│  ├─ AboutSection.tsx
│  ├─ SkillsSection.tsx
│  ├─ ProjectsSection.tsx
│  ├─ ProjectsCard.tsx
│  ├─ ContactSection.tsx
│  ├─ Footer.tsx
│  ├─ StarBackground.tsx
│  └─ ScrollingWaves.tsx
├─ context/
│  ├─ IsDarkModeContext.ts
│  └─ useTheme.ts
├─ pages/
│  ├─ Home.tsx
│  └─ NotFound.tsx
├─ App.tsx
├─ main.tsx
└─ styles/
   └─ tailwind.css
```

---

## Installation

```bash
# Clone the repository
git clone https://github.com/putman44/portfolio-website.git
cd portfolio-website

# Install dependencies
npm install

# Start development server
npm run dev
```

---



