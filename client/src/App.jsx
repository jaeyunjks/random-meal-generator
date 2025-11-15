import { useState } from 'react';
import Landing from './components/Landing.jsx';
import MoodSelection from './components/MoodSelection.jsx';
import MealResult from './components/MealResult.jsx';
import SavedMeals from './components/SavedMeals.jsx';
import Register from './pages/Register.jsx';


function App() {
  const [page, setPage] = useState('landing');
  const [mood, setMood] = useState('');
  const [category, setCategory] = useState('');
  const [diet, setDiet] = useState('');
  const [isDark, setIsDark] = useState(false);

  const toggleDark = () => setIsDark(!isDark);

  const handleStart = () => setPage('mood');
  const handleMoodSelect = (selectedMood, selectedCategory, selectedDiet) => {
    setMood(selectedMood);
    setCategory(selectedCategory);
    setDiet(selectedDiet);
    setPage('result');
  };
  const handleTryAgain = () => setPage('mood');
  const handleViewSaved = () => setPage('saved');
  const handleRegister = () => setPage('register'); // New handler

  return (
    <div className={`min-h-screen bg-cream flex flex-col items-center justify-center p-4 md:p-8 ${isDark ? 'dark bg-[var(--bg)] text-[var(--text)]' : ''}`}>
      {page === 'landing' && (
        <Landing
          onStart={handleStart}
          onViewSaved={handleViewSaved}
          toggleDark={toggleDark}
          isDark={isDark}
          onRegister={handleRegister}
        />
      )}
      {page === 'register' && <Register onBack={() => setPage('landing')} />}
      {page === 'mood' && <MoodSelection onSelect={handleMoodSelect} />}
      {page === 'result' && <MealResult mood={mood} category={category} diet={diet} onTryAgain={handleTryAgain} onViewSaved={handleViewSaved} />}
      {page === 'saved' && <SavedMeals onBack={() => setPage('landing')} />}
    </div>
  );
}

export default App;
