# KH Educational Services — Website

A modern, responsive website for **KH Educational Services**, an educational consultancy in Vijayawada, Andhra Pradesh. Built with React, TypeScript, and Tailwind CSS.

---

## ✨ Features

- **Home page** — Hero, stats, featured courses, why-us, admissions process, destinations, testimonials, FAQ
- **About Us** — Company overview, team, mission & vision
- **Courses** — 30+ courses with search, category, and level filters
- **Universities** — 15 universities with search, state, type, and course filters
- **Admission Guidance** — 8 services, step-by-step process, eligibility info
- **Contact Us** — Contact form with validation, quick action buttons, map placeholder
- **Student Enquiry Form** — 5-step multi-step form with full validation, unique ID generation
- **Admin Dashboard** — Protected login, lead management with filters, status updates, notes, CSV export, 4 analytics charts
- **Privacy Policy** — Full policy page

---

## 🗂️ Project Structure

```
kh-educational/
├── public/
│   └── index.html                    # SEO meta, Schema.org, Google Fonts
├── src/
│   ├── index.tsx                     # React entry point
│   ├── App.tsx                       # Router + layout
│   ├── index.css                     # Tailwind + custom components
│   ├── types/
│   │   └── index.ts                  # TypeScript interfaces + constants
│   ├── data/
│   │   └── index.ts                  # Courses, universities, budget options, etc.
│   ├── contexts/
│   │   └── AdminContext.tsx          # Auth + enquiry CRUD + localStorage
│   ├── components/
│   │   └── shared/
│   │       ├── Navbar.tsx            # Responsive navbar, scroll-aware
│   │       ├── Footer.tsx            # Full footer with CTA
│   │       └── FloatingWhatsApp.tsx  # Fixed WhatsApp button
│   └── pages/
│       ├── Home.tsx
│       ├── About.tsx
│       ├── Courses.tsx
│       ├── Universities.tsx
│       ├── AdmissionGuidance.tsx
│       ├── Contact.tsx
│       ├── EnquiryForm.tsx
│       ├── PrivacyPolicy.tsx
│       └── admin/
│           ├── AdminLogin.tsx
│           └── AdminDashboard.tsx
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

### Steps

```bash
# 1. Navigate to the project folder
cd kh-educational

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app will open at **http://localhost:3000**

### Production Build

```bash
npm run build
```

The optimised build will be in the `build/` folder.

---

## 🔐 Admin Credentials

| Field    | Value       |
|----------|-------------|
| Username | `admin`     |
| Password | `khedu2024` |

Admin login URL: **http://localhost:3000/admin**

---

## 📄 Pages & Routes

| Route                | Page                   |
|----------------------|------------------------|
| `/`                  | Home                   |
| `/about`             | About Us               |
| `/courses`           | Courses                |
| `/universities`      | Universities           |
| `/admission-guidance`| Admission Guidance     |
| `/contact`           | Contact Us             |
| `/enquiry`           | Student Enquiry Form   |
| `/privacy-policy`    | Privacy Policy         |
| `/admin`             | Admin Login            |
| `/admin/dashboard`   | Admin Dashboard        |

---

## 📊 Admin Dashboard Features

- **Overview tab** — Stat cards (total, new, contacted, confirmed, this month), monthly trend line chart, status pie chart, recent enquiries table
- **Leads tab** — Full paginated table of all enquiries, search by name/phone/ID, filter by status/course/year, view details modal, delete with confirmation, CSV export
- **Analytics tab** — Top courses bar chart, budget distribution bar chart, status pie chart, monthly trend chart, status summary cards

All data is persisted in **localStorage**. 5 demo enquiries are pre-loaded on first visit.

---

## 📝 Enquiry Form

The 5-step form collects:
1. **Student Details** — Name, parent name, mobile, WhatsApp, email, city, state, DOB
2. **Academic Background** — Qualification, board, stream, percentage, year of passing, entrance exam
3. **Course Preferences** — Course, level, specialisation, university type, preferred states & cities
4. **Budget & Logistics** — Budget range, payment method, hostel, scholarship
5. **Additional Info** — Admission year, urgency, message, privacy consent

On submission a unique reference ID (`KH######`) is generated and displayed.

---

## ⚠️ Limitations

- **Data storage**: All enquiries are stored in `localStorage` (browser). Data is cleared when browser storage is cleared. No actual backend/database.
- **Email/notifications**: The contact form and enquiry form do not send real emails — they simulate submission.
- **University data**: All university information is sample/demo data for display purposes only.
- **Testimonials**: All testimonials are sample data and not from real clients.
- **WhatsApp**: The floating WhatsApp button opens a real WhatsApp conversation with `+91 7093794711`.

---

## 📞 Business Contact

**KH Educational Services**  
Opposite JSN Grand, MZ Road, Near Ben Circle  
Vijayawada, Andhra Pradesh  
📱 7093794711

---

## 🛠️ Tech Stack

| Technology   | Version  | Purpose              |
|--------------|----------|----------------------|
| React        | 18       | UI framework         |
| TypeScript   | 5        | Type safety          |
| Tailwind CSS | 3        | Styling              |
| React Router | 6        | Client-side routing  |
| Recharts     | 2        | Analytics charts     |
| Lucide React | latest   | Icons                |
