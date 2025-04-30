// This script handles the meal suggestion quiz and stores user responses in local storage.
// It calculates a health score based on user input and suggests a meal accordingly.
// It also includes meal categories based on health scores, including Kenyan and international dishes.
// The meal categories are defined as arrays, and a random meal is picked from the appropriate category based on the calculated score.
// The script uses event listeners to handle form submission and local storage operations.
// Meal suggestion quiz script
// This script calculates a health score based on user input and suggests a meal accordingly.
// It also includes meal categories based on health scores, including Kenyan and international dishes.
// The meal categories are defined as arrays, and a random meal is picked from the appropriate category based on the calculated score.

// Meal categories based on health score, expanded with Kenyan & international dishes
// script.js

// Meal categories based on health score, expanded with Kenyan & international dishes
const superLightMeals = [
    'Uji wa Wimbi', 'Boiled nduma', 'Pumpkin soup', 'Steamed sukuma wiki',
    'Boiled sweet potatoes', 'Managu stew', 'Cassava', 'Green smoothie',
    'Cucumber & mint juice', 'Coconut water', 'Watermelon salad', 'Kale chips',
    'Fruit-infused water', 'Steamed managu', 'Tomato & onion salad', 'Raw carrot sticks',
    'Papaya slices', 'Aloe vera juice', 'Lemon water', 'Herbal tea'
  ];
  
  const lightHealthyMeals = [
    'Ndengu stew + small ugali', 'Githeri (low oil)', 'Vegetable soup',
    'Grilled fish salad', 'Boiled rice & mixed veggies', 'Mashed sweet potatoes',
    'Mango smoothie bowl', 'Fruit salad', 'Vegetable wrap', 'Tofu stir-fry',
    'Boiled cassava', 'Pumpkin leaves stew', 'Avocado & tomato salad',
    'Carrot & lentil soup', 'Brown rice bowl', 'Spinach & feta omelette',
    'Quinoa salad', 'Hummus & pita', 'Greek salad', 'Roasted vegetable platter'
  ];
  
  const balancedMeals = [
    'Chicken stew + brown rice', 'Tilapia + brown ugali', 'Matoke',
    'Coconut beans + chapati', 'Sukuma wiki & minced meat', 'Vegetable biryani',
    'Pasta primavera', 'Sushi (smoked salmon)', 'Avocado toast', 'Tuna sandwich',
    'Veggie wrap', 'Chicken Caesar salad', 'Egg & spinach omelette',
    'Mango & yogurt parfait', 'Falafel wrap', 'Beef tacos (gentle)',
    'Rice & beans (saruchi)', 'Grilled chicken + roasted veggies',
    'Chapati & vegetable curry', 'Lentil dahl & rice'
  ];
  
  const energyMeals = [
    'Nyama Choma + kachumbari', 'Cheeseburger', 'Pizza slice (thin crust)',
    'Shawarma wrap', 'Kebab platter', 'Pasta bolognese', 'Chicken wings + fries',
    'Fish & chips', 'Meat lovers pizza', 'Hotdog + slaw', 'Fried chicken',
    'Steak & fries', 'Beef tacos', 'Lamb curry + rice', 'Nachos with beef', 'Burrito',
    'Mandazi & chai', 'Fat cakes & chai', 'Chapati & beans + beef fry', 'Pilau & beef curry'
  ];
  
  // Utility: pick random meal from an array.  

  function randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  // MealQuiz constructor
    // This constructor initializes the MealQuiz object with user answers.
    // It takes an object with user responses as an argument.
    // It also includes methods to calculate the score and suggest a meal based on the score.
  function MealQuiz(answers) {
    this.answers = answers;
  }
  
  // Calculate score on prototype- we learned that this is a better practice. 
    // This method calculates a health score based on user input.
    // It uses a scoring system where different answers contribute positively or negatively to the score.
    // The method returns the final score.
  // The scoring system is as follows:
  MealQuiz.prototype.calculateScore = function() {
    let score = 0;
    const a = this.answers;
    if (a.yesterday === 'heavy') score -= 2;
    if (a.yesterday === 'light')  score += 3;
    if (a.yesterday === 'skipped')score += 1;
    if (a.vegetables === 'yes')   score += 4;
    if (a.vegetables === 'no')     score -= 4;
    if (a.fried === 'yes')        score -= 3;
    if (a.fried === 'no')          score += 3;
    if (a.activity === 'low')      score -= 1;
    if (a.activity === 'medium')   score += 2;
    if (a.activity === 'high')     score += 3;
    if (a.hungry === 'yes')        score += 1;
    return score;
  };
  
  // Suggest meal on prototype
    // This method suggests a meal based on the calculated score.
    // It uses a scoring system to determine which meal category to suggest.
    // The method returns a random meal from the appropriate category.
  // The meal suggestion is based on the following score ranges:
  // -5 or lower: super light meals
  // -4 to 2: light healthy meals
  // 3 to 6: balanced meals
  // 7 or higher: energy meals
  MealQuiz.prototype.suggestMeal = function(score) {
    if (score <= -5) return randomPick(superLightMeals);
    if (score <= 2)  return randomPick(lightHealthyMeals);
    if (score <= 6)  return randomPick(balancedMeals);
    return randomPick(energyMeals);
  };
  
  // On DOM load, attach handler
    // This function waits for the DOM to load and then attaches an event listener to the form.
    // When the form is submitted, it prevents the default action, collects user input,
    // creates a MealQuiz object, calculates the score, suggests a meal, and stores the data in local storage.
    // Finally, it redirects to the results page.
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('meal-quiz');
    if (!form) return;
    // Attach event listener to form submission
    // This event listener prevents the default form submission behavior,
    // collects user input, creates a MealQuiz object, calculates the score,
  
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const answers = {
        yesterday: data.get('yesterday'),
        vegetables: data.get('vegetables'),
        fried:      data.get('fried'),
        activity:   data.get('activity'),
        hungry:     data.get('hungry')
      }; // Collect user input
      // Create a new MealQuiz object with the collected answers
      // Calculate the score based on user input
      const quiz = new MealQuiz(answers);
      const score = quiz.calculateScore();
      const meal  = quiz.suggestMeal(score);
      localStorage.setItem('lastAnswers', JSON.stringify(answers));
      localStorage.setItem('lastMeal', meal);
      window.location.href = 'results.html';
    });
  });
  // End of DOM load event