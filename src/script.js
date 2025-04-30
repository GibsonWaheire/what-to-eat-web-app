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
  
  // Utility: pick random meal

  function randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  // MealQuiz constructor
  function MealQuiz(answers) {
    this.answers = answers;
  }
  
  // Calculate score on prototype
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
  MealQuiz.prototype.suggestMeal = function(score) {
    if (score <= -5) return randomPick(superLightMeals);
    if (score <= 2)  return randomPick(lightHealthyMeals);
    if (score <= 6)  return randomPick(balancedMeals);
    return randomPick(energyMeals);
  };
  
  // On DOM load, attach handler
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('meal-quiz');
    if (!form) return;
  
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const answers = {
        yesterday: data.get('yesterday'),
        vegetables: data.get('vegetables'),
        fried:      data.get('fried'),
        activity:   data.get('activity'),
        hungry:     data.get('hungry')
      };
      const quiz = new MealQuiz(answers);
      const score = quiz.calculateScore();
      const meal  = quiz.suggestMeal(score);
      localStorage.setItem('lastAnswers', JSON.stringify(answers));
      localStorage.setItem('lastMeal', meal);
      window.location.href = 'results.html';
    });
  });
  