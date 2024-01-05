import "./meal-list.css";
import { Link } from "react-router-dom";

function MealList({ meals }) {
  if (meals.length === 0) {
    return <div>Nenhuma refeição registrada</div>;
  } else {
    return (
      <div>
        <h2>Refeições</h2>
        <ul className="meals-list">
          {meals.map((item, index) => {
            return (
              <li key={`${index}`} className="meal-shown-li">
                <h3>{item.mealName}</h3>
                <p>Horário: {item.mealTime}</p>
                <p>Data: {item.mealDate}</p>
                <Link to={`/edit/${item.id}`}>Editar</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default MealList;
