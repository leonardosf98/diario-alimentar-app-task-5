import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./edit.css";

function Edit() {
  const navigate = useNavigate();
  const id = useParams();
  let fullObject = JSON.parse(localStorage.getItem("meals"));
  const idFinder = (item) => {
    return item.id === id.id;
  };
  const index = fullObject.findIndex(idFinder) * 1;
  const [mealName, setMealName] = useState(fullObject[index].mealName);
  const [mealDate, setMealDate] = useState(fullObject[index].mealDate);
  const [mealTime, setMealTime] = useState(fullObject[index].mealTime);
  const [mealItem, setMealItem] = useState(fullObject[index].mealItem);
  const [error, setError] = useState(false);
  const foodTypes = ["Leguminosas", "Frutas", "Cereais", "Hortaliças"];
  const [itemType, setItemType] = useState("");
  const [itemName, setItemName] = useState("Feijão");
  const [itemOptions, setItemOptions] = useState([
    "Feijão",
    "Ervilha",
    "Lentilha",
    "Grão de bico",
  ]);
  const [mealQuantity, setMealQuantity] = useState();

  const handleSubmit = () => {
    fullObject[index] = {
      id: id.id,
      mealName: mealName,
      mealDate: mealDate,
      mealTime: mealTime,
      mealItem: mealItem,
    };
    localStorage.setItem("meals", JSON.stringify(fullObject));
  };
  useEffect(() => {
    setError(mealItem.length === 0);
  }, [mealItem]);

  const deleteMeal = () => {
    if (fullObject.length === 1) {
      fullObject.splice(0, 1);
    } else {
      fullObject.splice(index, 1);
    }
    localStorage.setItem("meals", JSON.stringify(fullObject));
    navigate("/");
  };
  const deleteItem = (key) => {
    setMealItem(mealItem.splice(key + 1, 1));
  };

  const handleTypeChange = (event) => {
    const type = event.target.value * 1;
    setItemType(type);
    switch (type) {
      case 1:
        setItemOptions(["Feijão", "Ervilha", "Lentilha", "Grão de bico"]);
        setItemName("Feijão");
        break;
      case 3:
        setItemOptions(["Arroz", "Aveia", "Milho", "Brócolis"]);
        setItemName("Arroz");
        break;
      case 2:
        setItemOptions(["Maçã", "Banana", "Mamão", "Uva"]);
        setItemName("Maçã");
        break;
      case 4:
        setItemOptions(["Alface", "Tomate", "Cenoura", "Brócolis"]);
        setItemName("Alface");
        break;
    }
  };
  const onSubmit = () => {
    return {
      itemName: itemName,
      quantity: mealQuantity * 1,
    };
  };
  return (
    <div>
      <Link to="/">Voltar</Link>
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
          navigate("/");
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

        <h3>Lista de alimentos</h3>
        <ul className="meal-item-container">
          {mealItem.map((item, index) => {
            return (
              <li className="meal-item-li">
                <div className="meal-item">{`${item.itemName}: ${item.quantity} `}</div>
                <button
                  key={index}
                  className="delete-btn btn-close"
                  onClick={(event) => {
                    event.preventDefault();
                    deleteItem(index);
                  }}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
        {error && (
          <p className="error-msg">
            Você deve registrar pelo menos um alimento
          </p>
        )}
        <div>
          <form>
            <fieldset>
              <label htmlFor="itemType">Selecione o tipo de alimento: </label>
              <select
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
              <label htmlFor="itemName">Selecione o nome do alimento: </label>
              <select
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
              <label>Digite a quantidade de {itemName}: </label>
              <input
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
              {error && <div>Digite um valor válido</div>}
            </fieldset>
            <button
              onClick={(event) => {
                event.preventDefault();
                if (!mealQuantity) {
                  setError(true);
                  return;
                }
                const newItem = onSubmit();
                setMealItem([...mealItem, newItem]);
              }}
            >
              Cadastrar alimento
            </button>
          </form>
        </div>
        <button onClick={deleteMeal}> Excluir Refeição</button>
        <button type="submit">Editar Refeição</button>
      </form>
    </div>
  );
}

export default Edit;
