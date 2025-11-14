document.addEventListener('DOMContentLoaded', async () => {
    const generateBtn = document.getElementById('generate-btn');
    const searchBtn = document.getElementById('search-btn');
    const filterBtn = document.getElementById('filter-btn');
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category-select');
    const mealContainer = document.getElementById('meal-container');
    const mealName = document.getElementById('meal-name');
    const mealImage = document.getElementById('meal-image');
    const ingredientsList = document.getElementById('ingredients-list');
    const instructions = document.getElementById('instructions');
    const youtubeVideo = document.getElementById('youtube-video');
    const favoriteBtn = document.getElementById('favorite-btn');
    const favoritesList = document.getElementById('favorites-list');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');

    let currentMeal = null; // Simpan meal saat ini untuk favorites

    // Load categories on start
    await loadCategories();

    // Load favorites from localStorage
    loadFavorites();

    generateBtn.addEventListener('click', () => fetchMeal('https://www.themealdb.com/api/json/v1/1/random.php'));
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) fetchMeal(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    });
    filterBtn.addEventListener('click', () => {
        const category = categorySelect.value;
        if (category) fetchMeal(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`, true);
    });
    favoriteBtn.addEventListener('click', addToFavorites);

    // Function to load categories
    async function loadCategories() {
        try {
            showLoading();
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
            const data = await response.json();
            data.categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.strCategory;
                option.textContent = cat.strCategory;
                categorySelect.appendChild(option);
            });
        } catch (error) {
            showError('Failed to load categories.');
        } finally {
            hideLoading();
        }
    }

    // Fetch meal (support random, search, filter)
    async function fetchMeal(url, isFilter = false) {
        try {
            showLoading();
            errorMessage.style.display = 'none';
            const response = await fetch(url);
            const data = await response.json();
            if (!data.meals || data.meals.length === 0) {
                showError('No meals found.');
                return;
            }
            // If filter, pick random from list
            const meal = isFilter ? data.meals[Math.floor(Math.random() * data.meals.length)] : data.meals[0];
            // Fetch full details if needed (filter only gives partial)
            if (isFilter) {
                const fullResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
                const fullData = await fullResponse.json();
                currentMeal = fullData.meals[0];
            } else {
                currentMeal = meal;
            }
            displayMeal(currentMeal);
        } catch (error) {
            showError('Error fetching meal.');
        } finally {
            hideLoading();
        }
    }

    // Display meal
    function displayMeal(meal) {
        mealName.textContent = meal.strMeal;
        mealImage.src = meal.strMealThumb;
        ingredientsList.innerHTML = '';
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '') {
                const li = document.createElement('li');
                li.textContent = `${measure} ${ingredient}`;
                ingredientsList.appendChild(li);
            }
        }
        instructions.textContent = meal.strInstructions;
        if (meal.strYoutube) {
            const videoId = meal.strYoutube.split('v=')[1];
            youtubeVideo.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
        } else {
            youtubeVideo.innerHTML = 'No video available.';
        }
        mealContainer.style.display = 'block';
    }

    // Favorites functions
    function addToFavorites() {
        if (!currentMeal) return;
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!favorites.some(fav => fav.idMeal === currentMeal.idMeal)) {
            favorites.push(currentMeal);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            loadFavorites();
        }
    }

    function loadFavorites() {
        favoritesList.innerHTML = '';
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.forEach(meal => {
            const li = document.createElement('li');
            li.textContent = meal.strMeal;
            li.addEventListener('click', () => displayMeal(meal));
            favoritesList.appendChild(li);
        });
    }

    // Helpers
    function showLoading() { loading.style.display = 'block'; mealContainer.style.display = 'none'; }
    function hideLoading() { loading.style.display = 'none'; }
    function showError(msg) { errorMessage.textContent = msg; errorMessage.style.display = 'block'; }
});
