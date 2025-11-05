document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const mealName = document.getElementById('meal-name');
    const mealImage = document.getElementById('meal-image');
    const ingredientsList = document.getElementById('ingredients-list');
    const instructions = document.getElementById('instructions');
    const youtubeVideo = document.getElementById('youtube-video');

    generateBtn.addEventListener('click', fetchRandomMeal);

    function fetchRandomMeal() {
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(response => response.json())
            .then(data => {
                const meal = data.meals[0]; // API returns array with one meal

                // Update name
                mealName.textContent = meal.strMeal;

                // Update image
                mealImage.src = meal.strMealThumb;
                mealImage.style.display = 'block';

                // Update ingredients (loop through strIngredient1 to strIngredient20)
                ingredientsList.innerHTML = ''; // Clear previous
                for (let i = 1; i <= 20; i++) {
                    const ingredient = meal[`strIngredient${i}`];
                    const measure = meal[`strMeasure${i}`];
                    if (ingredient && ingredient.trim() !== '') {
                        const li = document.createElement('li');
                        li.textContent = `${measure} ${ingredient}`;
                        ingredientsList.appendChild(li);
                    }
                }

                // Update instructions
                instructions.textContent = meal.strInstructions;

                // Bonus: YouTube video (embed if available)
                if (meal.strYoutube) {
                    const videoId = meal.strYoutube.split('v=')[1]; // Extract ID from URL
                    youtubeVideo.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
                    youtubeVideo.style.display = 'block';
                } else {
                    youtubeVideo.innerHTML = 'No video available.';
                    youtubeVideo.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error fetching meal:', error);
                mealName.textContent = 'Error loading meal. Try again!';
            });
    }
});