# Angelica Aniñon - Digital Portfolio Website

A clean, modern, and professional personal digital portfolio for **Angelica Aniñon**, Full-Stack Software Developer and BSIT Student based in the Philippines.

Designed specifically for **OJT / Internship applications**, junior developer positions, and academic showcases.

---

## 🌟 Key Features

- **Modern & Human-Centric Design**: Dark navy background (`#090e17`) with crisp white typography and subtle blue accents (`#3b82f6` & `#38bdf8`).
- **Fixed Responsive Navigation**:
  - Smooth blur and background darkening upon scrolling.
  - Active section link highlighting.
  - Full mobile navigation drawer with hamburger toggle.
- **Hero Section**:
  - Two-column desktop layout featuring Angelica's professional portrait with a rounded rectangular frame.
  - "Available for OJT & Internships" indicator.
  - Subtle non-bouncing entrance animations on initial page load.
- **About Me Section**:
  - Concise personal introduction with an expandable **"More About Me"** details drawer.
- **My Skills Grid**:
  - Categorized under **Frontend**, **Backend**, **Database**, **Tools**, and **IoT**.
  - Crisp technology icons without arbitrary percentage progress bars.
  - Subtle interactive hover elevation (+3px) and icon scaling.
- **Featured Projects**:
  - **Speed Detection and Warning System** (IoT, ESP32-CAM, Python, SQLite)
  - **Laundry Pickup and Delivery Management System** (Python, Flask, SQLite, Web)
  - **Ani AI** (English Learning Assistant concept with Gemini API)
  - **Automated Class Scheduling and Faculty Loading System** (Python, Databases)
  - Interactive project detail modal with architecture and capability breakdown.
- **My Development Journey**:
  - Clean 3-stage timeline (`01 Learning`, `02 Building`, `03 Improving`).
  - Horizontal timeline on desktop, vertically stacked on mobile.
- **Interactive Live Background**: Subtle HTML5 canvas constellation network responding smoothly to cursor movement and slow ambient glow orbs.
- **Vacant States for Experience & Projects**: Clean empty-state designs ready for OJT / Internship applications with easy HTML templates to drop in new projects and jobs.
- **Subtle Polish & Micro-Interactions**:
  - Live typing effect cycling through technical focus areas.
  - Section title accent line expansion.
  - Floating back-to-top button.
  - Reading progress line at the top.

---

## 📂 Project Structure

```text
DigitalPortfolio-Aninon/
├── index.html          # Semantic HTML5 markup
├── styles.css          # Clean dark navy styling & responsive breakpoints
├── script.js           # Scroll progress, modal, mobile drawer, & form logic
├── assets/
│   └── profile.jpg     # Professional portrait photo
└── README.md           # Documentation
```

---

## 🚀 How to Run Locally

You can open the website directly in any web browser:

1. Double-click `index.html` to open it in your default browser.
2. Or serve it locally using Python:
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

---

## 🌐 Deployment Options

- **GitHub Pages**: Push this repository to GitHub and enable GitHub Pages under `Settings > Pages > Branch: main / root`.
- **Vercel / Netlify**: Simply drag and drop the project folder or connect the repository for instant static hosting.
