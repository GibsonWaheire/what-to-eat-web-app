// result.js
// Retrieve and display the suggested meal, reasons, alternatives, and user answers on results.html

// Meal categories for reasons and alternatives

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
  
  // Helper to shuffle an array
    // This function takes an array as input and shuffles its elements in place.
    // It uses the Fisher-Yates shuffle algorithm to ensure a uniform distribution of elements.
    // The function returns the shuffled array.
    // This is a utility function to shuffle an array in place so that we can pick two unique meals from the same category.

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Determine category and reason based on meal
  
  function getCategoryInfo(meal) {
    if (superLightMeals.includes(meal)) {
      return {arr: superLightMeals, reason: 'it is light and detoxifying, helping your body recover'};
    }
    if (lightHealthyMeals.includes(meal)) {
      return {arr: lightHealthyMeals, reason: 'it provides essential vitamins and fiber for overall health'};
    }
    if (balancedMeals.includes(meal)) {
      return {arr: balancedMeals, reason: 'it offers a balanced mix of carbohydrates, protein, and vegetables'};
    }
    return {arr: energyMeals, reason: 'it gives you the energy you need to power through your day'};
  }
  
  // Helper to get two unique random picks
  function getTwoRandom(arr) {
    const copy = [...arr];
    const first = copy.splice(Math.floor(Math.random() * copy.length), 1)[0];
    const second = copy[Math.floor(Math.random() * copy.length)];
    return [first, second];
  }
  
  // On DOM load, update the result page
  document.addEventListener('DOMContentLoaded', () => {
    const suggestionEl = document.getElementById('suggestion');
    const answersList = document.getElementById('answers-list');
  
    // Fetch stored data
    const meal = localStorage.getItem('lastMeal');
    const answers = JSON.parse(localStorage.getItem('lastAnswers'));
  
    if (!meal) {
      suggestionEl.textContent = 'No suggestion found. Please take the quiz.';
      return;
    }
  
    // Get category, reason, and alternatives
    const {arr, reason} = getCategoryInfo(meal);
    const alternatives = getTwoRandom(arr.filter(m => m !== meal));
  
    // Build result message
    suggestionEl.innerHTML = `
      <p>You should eat <strong>${meal}</strong> because ${reason}.</p>
      <p>Two healthy alternatives you could try are <strong>${alternatives[0]}</strong> and <strong>${alternatives[1]}</strong>.</p>
      <p>Don't forget to stay hydrated by drinking plenty of water and include regular exercise in your routine for best results!</p>
      <p>If you'd like an eBook on how to make these meals, <a href="ebook.html">click here to download it</a>.</p>
    `;
  
    // Display user answers
    if (answers) {
      Object.entries(answers).forEach(([key, value]) => {
        const li = document.createElement('li');
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        li.textContent = `${label}: ${value}`;
        answersList.appendChild(li);
      });
    }
  });
  