# What Should I Eat web App?
#### A functional web application that helps users choose a healthy Kenyan meal based on their recent eating habits., April 30, 2025
#### By **Gibson Waheire**

## Description
This web application guides users through a quick quiz to assess their recent eating habits and activity levels, then generates personalized meal suggestions. It scores responses based on healthy eating principles, provides a primary recommendation, two healthy alternatives, and offers actionable tips like staying hydrated and exercising. An optional eBook link helps users learn how to prepare these meals.

### Key Features
- **Interactive Quiz**: Questions on recent meals, vegetable intake, fried food consumption, activity level, and hunger.
- **Health Score Calculation**: Algorithm evaluates user habits and assigns a healthiness score.
- **Personalized Recommendations**: Suggests a main meal plus two alternatives with reasons.
- **Healthy Lifestyle Tips**: Encourages water intake and regular exercise.
- **eBook Call-to-Action**: Optional download link for meal preparation guidance.
- **Persistence**: Stores user responses and results in `localStorage`.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.

## Setup / Installation Requirements
* Clone the repository: `git clone https://github.com/GibsonWaheire/what-to-eat-web-app.git`
* Navigate into the project directory: `cd what-to-eat-web-app`
* No dependencies—this is a static site. Simply open `index.html` in your browser.
* Ensure your browser allows JavaScript and localStorage.

## Known Bugs
- No known bugs at this time. If you encounter any issues, please report them on GitHub.

## Project Structure
```
├── index.html         # Landing page with image slider & start quiz button
├── quiz.html          # Quiz page with form inputs
├── result.html        # Results page displaying suggestion & answers
├── css/
│   ├── styles.css     # Global styles (header, footer, slider)
│   └── quiz.css       # Page-specific styles for the quiz layout
├── js/
│   ├── script.js      # Quiz logic, scoring, and result persistence (uses objects & prototypes)
│   └── result.js      # Results rendering and user feedback
├── assets/
│   └── images/        # Images for slider and intro
└── README.md          # Project overview and setup instructions
```

## Technologies Used
- **HTML5** & semantic tags for accessibility
- **CSS3** (Flexbox, Grid, animations, media queries)
- **JavaScript (ES6+)** for DOM manipulation and logic
- **LocalStorage** for data persistence
- **Google Fonts** for typography

## Support and Contact Details
If you run into any issues, have suggestions, or want to contribute, please reach out:
- GitHub: [GibsonWaheire](https://github.com/GibsonWaheire)
- Email: g.waheir00@gmail.com
- Tel: +254 726 899 113

### License
*MIT License*

Copyright (c) 2025 **Gibson Waheire**
