import "./meal-list.css";
import { Link } from "react-router-dom";

function MealList({ meals }) {
  if (meals.length === 0) {
    return <div>Nenhuma refeição registrada</div>;
  } else {
    return (
      <div>
        <h2>Refeições</h2>
        <ul className="meals-list list-group">
          {meals.map((item, index) => {
            const formatedDate = item.mealDate.split("-").reverse().join("/");
            return (
              <li key={`${index}`} className=" list-group-item">
                <h5 className="mb-1">{item.mealName}</h5>
                <div className="d-flex w-100 justify-content-between">
                  <small>{item.mealTime}</small>
                  <small>{formatedDate}</small>
                </div>
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
