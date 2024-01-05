import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./add-meal-form.css";
import AddMealItem from "../addMealItem/addMealItem";
import Header from "../header/header";

function AddMealForm({ onMealSubmit }) {
  const todayDate = {
    day: new Date().toLocaleString("pt-br").slice(0, 2),
    month: new Date().toLocaleString("pt-br").slice(3, 5),
    year: new Date().toLocaleString("pt-br").slice(6, 10),
  };

  const todayTime = new Date().toLocaleString("pt-br").slice(12, 17);
  const [mealName, setMealName] = useState("Café da manhã");
  const [mealDate, setMealDate] = useState(
    `${todayDate.year}-${todayDate.month}-${todayDate.day}`
  );
  const [mealTime, setMealTime] = useState(todayTime);
  const [mealItem, setMealItem] = useState([]);
  const [error, setError] = useState(false);

  const handleItemSubmit = (event, mealItemData) => {
    event.preventDefault();
    const newItem = {
      itemName: mealItemData[0],
      measureUnit: mealItemData[1],
      quantity: mealItemData[2],
    };
    setMealItem((oldState) => [...oldState, newItem]);
  };
  useEffect(() => {
    setError(mealItem.length === 0);
  }, [mealItem]);
  return (
    <div>
      <Header />
      <Link to="/">Voltar</Link>
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          if (mealItem.length === 0) {
            setError(true);
            return;
          } else {
            onMealSubmit({ mealName, mealDate, mealTime, mealItem });
            console.log(mealItem);
          }
        }}
      >
        <fieldset>
          <label htmlFor="meal-name">Selecione o nome da refeição: </label>
          <select
            type="text"
            name="meal-name"
            id="meal-name"
            value={mealName}
            onChange={(event) => {
              setMealName(event.target.value);
            }}
          >
            <option value="Café da manhã">Café da manhã</option>
            <option value="Lanche">Lanche</option>
            <option value="Almoço">Almoço</option>
            <option value="Jantar">Jantar</option>
            <option value="Ceia">Ceia</option>
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="date">Selecione a data da refeição: </label>
          <input
            type="date"
            name="date"
            id="date"
            value={mealDate}
            onChange={(event) => {
              setMealDate(event.target.value);
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="date">Selecione o horário da refeição: </label>
          <input
            type="time"
            name="time"
            id="time"
            value={mealTime}
            onChange={(event) => {
              setMealTime(event.target.value);
            }}
          />
        </fieldset>
        <div className="meal-item-container">
          {mealItem.map((item) => {
            return (
              <div className="meal-item">{`${item.itemName}: ${item.quantity} ${item.measureUnit}`}</div>
            );
          })}
        </div>
        {error && (
          <p className="error-msg">
            Você deve registrar pelo menos um alimento
          </p>
        )}
        <AddMealItem onItemSubmit={handleItemSubmit}></AddMealItem>
        <button type="submit">Cadastrar Refeição</button>
      </form>
    </div>
  );
}

export default AddMealForm;
