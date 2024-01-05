import { useState } from "react";

function AddMealItem({ onItemSubmit }) {
  const foodTypes = ["Leguminosas", "Frutas", "Cereais", "Hortaliças"];

  const [measureUnit, setMeasureUnit] = useState("gramas");
  const [itemType, setItemType] = useState("");
  const [itemName, setItemName] = useState("Feijão");
  const [itemOptions, setItemOptions] = useState([
    "Feijão",
    "Ervilha",
    "Lentilha",
    "Grão de bico",
  ]);
  const [mealQuantity, setMealQuantity] = useState();
  const [error, setError] = useState(false);
  const handleOptionChange = () => {
    if (measureUnit === "gramas") {
      setMeasureUnit("ml's");
    } else {
      setMeasureUnit("gramas");
    }
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
    return [itemName, measureUnit, mealQuantity];
  };
  return (
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
          <label htmlFor="gramas"> Sólido</label>
          <input
            type="radio"
            name="gramas"
            id="gramas"
            value="gramas"
            checked={measureUnit === "gramas"}
            onChange={(event) => {
              setMeasureUnit(event.target.value);
              handleOptionChange();
            }}
          />
          <label htmlFor="liquid">Líquido</label>
          <input
            type="radio"
            name="ml's"
            id="ml's"
            value="ml's"
            checked={measureUnit === "ml's"}
            onChange={(event) => {
              setMeasureUnit(event.target.value);
              handleOptionChange();
            }}
          />
          <label>Digite a quantidade em {measureUnit}: </label>
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
