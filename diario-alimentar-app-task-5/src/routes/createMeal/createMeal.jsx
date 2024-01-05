import { nanoid } from "nanoid";
import AddMealForm from "../../components/add-meal-form/add-meal-form";
import { useNavigate } from "react-router-dom";
function CreateMeal() {
  const navigate = useNavigate();
  return (
    <AddMealForm
      onMealSubmit={(mealData) => {
        let meals = localStorage.getItem("meals");
        if (!meals) {
          localStorage.setItem("meals", "[]");
          meals = [];
        }
        meals = JSON.parse(meals);
        console.log(meals);
        let id = nanoid();
        meals.push({ ...mealData, id });
        localStorage.setItem("meals", JSON.stringify(meals));
        navigate("/");
      }}
    ></AddMealForm>
  );
}

export default CreateMeal;
