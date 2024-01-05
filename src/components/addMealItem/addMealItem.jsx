import { useState, useEffect } from "react";
import "./addMealItem.css";
function AddMealItem({ onItemSubmit }) {
  const apiUrl =
    "http://localhost:4000/graphql?query=query+MyQuery+%7B%0A++getAllCategories+%7B%0A++++name%0A++%7D%0A%7D#";

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data.getAllCategories) {
          const categories = data.data.getAllCategories;
          const categoryNames = categories.map((category) => category.name);
          setFoodTypes(categoryNames);
        } else {
          console.error("Resposta GraphQL mal formatada ou sem dados.");
        }
      })
      .catch((error) => {
        console.error("Erro durante a solicitação GraphQL:", error);
      });
  }, []);
  const [itemType, setItemType] = useState(0);
  const [itemName, setItemName] = useState("Feijão");
  const [foodTypes, setFoodTypes] = useState([]);
  const [itemOptions, setItemOptions] = useState([
    "Feijão",
    "Ervilha",
    "Lentilha",
    "Grão de bico",
  ]);
  const [mealQuantity, setMealQuantity] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    handleTypeChange();
  }, [itemType]);

  const handleTypeChange = (event) => {
    if (!event) {
      return;
    }
    setItemType(event.target.value);
    const type = event.target.value;
    const URL = `http://localhost:4000/graphql?query=query+MyQuery+%7B%0A++getCategoryById%28id%3A+${type}%29+%7B%0A++++name%0A++++foods+%7B%0A++++++name%0A++++%7D%0A++%7D%0A%7D`;

    try {
      fetch(URL, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result && result.data && result.data.getCategoryById) {
            const category = result.data.getCategoryById;
            const foodNames = category.foods.map((food) => food.name);
            setItemOptions(foodNames);
          } else {
            console.error("Resposta GraphQL mal formatada ou sem dados.");
          }
        })
        .catch((error) => {
          console.error("Erro durante a solicitação GraphQL:", error);
        });
    } catch (error) {
      console.error("Erro durante a construção da URL:", error);
    }
  };

  const onSubmit = () => {
    return [itemName, mealQuantity];
  };
  return (
    <div>
      <form>
        <fieldset>
          <label className="form-label  " htmlFor="itemType">
            Selecione o tipo de alimento:
          </label>
          <select
            className="form-control"
            name="itemType"
            id="itemType"
            value={itemType}
            onChange={(event) => {
              handleTypeChange(event);
            }}
          >
            {foodTypes.map((item, index) => {
              return (
                <option key={index} value={index + 1}>
                  {item}
                </option>
              );
            })}
          </select>
        </fieldset>
        <fieldset>
          <label className="form-label" htmlFor="itemName">
            Selecione o nome do alimento:{" "}
          </label>
          <select
            className="form-select"
            name="itemName"
            id="itemName"
            value={itemName}
            onChange={(event) => {
              setItemName(event.target.value);
              setError(false);
            }}
          >
            {itemOptions.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </fieldset>
        <fieldset className="meal-quantity-container">
          <label className="form-label">
            Digite a quantidade de {itemName}:{" "}
          </label>
          <input
            className="form-control"
            type="number"
            name="quantity"
            id="quantity"
            value={mealQuantity}
            onChange={(event) => {
              setMealQuantity(event.target.value);
              {
                mealQuantity <= 0 ? setError(true) : setError(false);
              }
            }}
          />
          {error && (
            <div className="invalid-feedback">Digite um valor válido</div>
          )}
        </fieldset>
        <button
          className="button"
          onClick={(event) => {
            event.preventDefault();
            if (!mealQuantity) {
              setError(true);
              return;
            }
            const newItem = onSubmit();
            onItemSubmit(event, newItem);
          }}
        >
          Cadastrar alimento
        </button>
      </form>
    </div>
  );
}

export default AddMealItem;
