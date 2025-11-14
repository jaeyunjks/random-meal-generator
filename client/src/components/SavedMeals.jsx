import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SavedMeals = ({ onBack }) => {
  const [saved, setSaved] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);  // State untuk detail meal yang diklik

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedMeals')) || [];
    setSaved(stored);
  }, []);

  const closeDetail = () => setSelectedMeal(null);

  // Render full detail modal
  if (selectedMeal) {
    const videoId = selectedMeal.strYoutube ? selectedMeal.strYoutube.split('v=')[1]?.split('&')[0] : null;
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={closeDetail}
      >
        <motion.div 
          initial={{ scale: 0.9 }} 
          animate={{ scale: 1 }} 
          className="bg-white p-6 rounded-xl max-w-lg w-full max-h-screen overflow-y-auto mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-mint mb-4">{selectedMeal.strMeal}</h2>
          <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} className="w-full rounded-lg mb-4" />
          <p className="text-gray-800 mb-4">{selectedMeal.funDesc}</p>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Ingredients:</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-800">
            {Array.from({ length: 20 }).map((_, i) => {
              const ing = selectedMeal[`strIngredient${i + 1}`];
              const meas = selectedMeal[`strMeasure${i + 1}`];
              return ing ? <li key={i}>{meas} {ing}</li> : null;
            })}
          </ul>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Instructions:</h3>
          <p className="mb-4 text-gray-800">{selectedMeal.strInstructions}</p>
          {videoId && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">YouTube Tutorial:</h3>
              <iframe 
                width="100%" 
                height="200" 
                src={`https://www.youtube.com/embed/${videoId}`} 
                title="Tutorial" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          )}
          <button onClick={closeDetail} className="bg-mint text-white px-4 py-2 rounded hover:bg-blush transition">
            Close
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="text-center max-w-4xl w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-mint mb-4">Saved Meals</h2>
      {saved.length === 0 ? (
        <p className="text-gray-800">No favorites yet? Let's find some!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {saved.map(meal => (
            <motion.div 
              key={meal.idMeal} 
              whileHover={{ scale: 1.05 }} 
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
              onClick={() => setSelectedMeal(meal)}  // Klik untuk tampilkan detail
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{meal.strMeal}</h3>
              <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-32 object-cover rounded mb-2" />
              <p className="text-gray-800 text-sm">{meal.funDesc}</p>
            </motion.div>
          ))}
        </div>
      )}
      <button onClick={onBack} className="mt-6 bg-mint text-white px-6 py-3 rounded-lg hover:bg-blush transition">
        Back
      </button>
    </div>
  );
};

export default SavedMeals;