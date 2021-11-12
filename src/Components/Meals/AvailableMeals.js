import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css"
import MealItem from "./MealItems/MealItem";

const AvailableMeals = (props) => {

  const [mealList , setMealsList] =useState([])
  const [isLoading , setIsLoading] = useState(true)
  const [htmlError , setHtmlError] =useState()

  useEffect(()=> {
    
    const FetchMeals = async () => {
      const response = await fetch("https://foodapp-5f315-default-rtdb.firebaseio.com/meals.json");
      console.log(response)
      const responseData = await response.json()

      if(!response.ok){
        throw new Error("Something went wrong")
      }

      let mealsData = []

      for (let  key in responseData){

        mealsData.push({
          id : key,
          name : responseData[key].name,
          description : responseData[key].description,
          price : responseData[key].price
        })
      }

      setMealsList(mealsData)
      setIsLoading(false)
    }
    

    FetchMeals().catch((error) => {
      setIsLoading(false)
      setHtmlError(error.message)
    }
    )
  }, [])

  if(isLoading){
    return(
      <section>
         <p className={classes.loading}>Loading.......</p>
      </section>
    )
  }

  if(htmlError){
    return(<section className={classes.errorText}>
      <p>{htmlError}</p>
    </section>)
  }

    return(
        <section className={classes.meals}>
            <Card>
        <ul>
            {mealList.map((meal) => 
            <MealItem
                id = {meal.id}
                key = {meal.id}
                name = {meal.name}
                description = {meal.description}
                price = {meal.price}
            /> )}
        </ul>
        </Card>
        </section>
    )

}

export default AvailableMeals;