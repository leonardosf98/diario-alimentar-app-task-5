import { useEffect, useState } from "react";
import Header from "../../components/header/header.jsx";
import { Link } from "react-router-dom";

import "./root.css";
import MealList from "../../components/meal-list/meal-list.jsx";
function Root() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  let mealsLS = localStorage.getItem("meals");
  if (mealsLS) {
    useEffect(() => {
      setLoading(false);
      let parsedMeals = JSON.parse(mealsLS);
      setMeals(parsedMeals);
    }, []);
  } else {
    mealsLS = localStorage.setItem("meals", "[]");
  }
  const addMeal = (mealData) => {
    setMeals((oldstate) => [...oldstate, mealData]);
  };
  return loading ? (
    <p>Carregando</p>
  ) : (
    <div>
      <Header />
      <MealList meals={meals} />
      <Link to={"/createMeal"} onAddMeal={addMeal}>
        Adicionar refeição
      </Link>
    </div>
  );
}

export default Root;
