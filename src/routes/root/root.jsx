import { useEffect, useState } from "react";
import Header from "../../components/header/header.jsx";
import { Link } from "react-router-dom";
import Logo from "../../assets/nutri.dev_logo.png";

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
  return loading ? (
    <p>Carregando</p>
  ) : (
    <div className="main">
      <div>
        <Header />
        <img className="logo" src={Logo} />
      </div>
      <MealList meals={meals} />
      <Link className="addMeal" to={"/createMeal"}>
        Adicionar refeição
      </Link>
    </div>
  );
}

export default Root;
