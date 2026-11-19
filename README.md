# 📅 75% Attendance Calculator

A React-based attendance management application that helps students track their semester attendance, manage academic schedules, and calculate the classes required to maintain a minimum attendance percentage.

The application provides an interactive calendar, subject-wise attendance analytics, and future attendance predictions to make attendance management easier and more organized.

## ✨ Features

### 📆 Interactive Attendance Calendar
- Interactive calendar built using React Calendar.
- Mark and manage attended and missed classes.
- Manage semester schedules, holidays, and working days.
- View attendance records date-wise.

### 📊 Attendance Calculator
- Automatically calculate attendance percentages.
- Calculate the minimum number of additional classes required to reach a configurable attendance threshold.
- Determine how many classes can be missed while maintaining the required attendance.
- Predict future attendance scenarios based on upcoming classes.

### 📈 Analytics Dashboard
- Subject-wise attendance statistics.
- Visual attendance progress indicators.
- Monthly attendance trends using Recharts.
- Easy monitoring of attendance performance.

### 💾 Persistent Data Storage
- Integrated Browser LocalStorage API.
- Persist semester configurations and attendance records.
- Save user preferences across browser sessions.
- Access previously recorded data without requiring repeated input.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript | Application logic and calculations |
| React Calendar | Interactive calendar and attendance management |
| Recharts | Data visualization and analytics |
| date-fns | Date manipulation and attendance calculations |
| Browser LocalStorage API | Persistent client-side data storage |

---

## 📸 Application Highlights

- **Calendar Management:** Organize attendance records, holidays, and working days.
- **Smart Calculations:** Determine attendance percentages and required classes using date-based calculations.
- **Visual Analytics:** Understand attendance performance through charts and progress indicators.
- **Data Persistence:** Retain semester information and attendance records across browser sessions.

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd 75-Percent-Attendance-Calculator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the application

Open the local URL displayed in your terminal (usually `http://localhost:5173`).

---

## 🧮 Attendance Calculation

The application uses the standard attendance percentage formula:

\[
\text{Attendance \%} =
\frac{\text{Classes Attended}}{\text{Total Classes Conducted}}
\times 100
\]

It also calculates the additional classes required to reach a target attendance percentage and helps students evaluate future attendance scenarios.

---

## 💡 Motivation

Managing attendance across multiple subjects can become difficult throughout a semester. This project was developed to simplify attendance tracking and help students make informed decisions about their academic schedules.

**Stay consistent, track your progress, and keep your attendance above 75%!** 🎓

---

## 👩‍💻 Author

Developed as a personal project using React.js and JavaScript.
