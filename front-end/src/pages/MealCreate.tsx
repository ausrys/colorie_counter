import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom"
import Product from "../components/Product/Product";
import { returnEditedObject, returnMealInfoWithPortion } from "../helper/functions";
import { useFetchData } from "../hooks/axiosHooks"
import { MealType } from "../types/enums";
import { ProductType, ProductWithWeightType, MealInfoType } from "../types/productTypes";

type Props = {}

const Meal = (props: Props) => {
    const productWeight = useRef<HTMLInputElement>(null);
    let isPortion = 0;
    const [selectedMealType, setSelectedMealType] = useState(MealType.Breakfast);
    const [mealProducts, setMealProduct] = useState<ProductWithWeightType[]>([]);
    const [product, setProduct] = useState<ProductType | null>(null);
    const [mealInfo, setMealInfo] = useState<MealInfoType>({
        calories: 0,
        protein: 0,
        carbs: 0,
        weight: 0
    })
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMealType(event.target.value as MealType);
      };
    const deleteProduct = (product: ProductWithWeightType) => {
        setMealProduct(mealProducts.filter((prod: ProductWithWeightType) => prod.title!== product.title));
        setMealInfo({
            calories: mealInfo.calories - product.calories,
            protein: mealInfo.protein - product.protein,
            carbs: mealInfo.carbs - product.carbs,
            weight: mealInfo.weight - product.weight,
        })
    }
    const handleButtonClick = (product: ProductType) => {
        const inputValue = productWeight.current?.value ?? 0;
        const newObject = returnEditedObject(product, Number(inputValue));
        const existingObj = mealProducts.find(obj => obj.product_id ===newObject.product_id)
        if(existingObj) {
            const newMealProcuts = mealProducts.filter((prod) => prod.product_id !== newObject.product_id)
            existingObj.calories += newObject.calories
            existingObj.carbs += newObject.carbs
            existingObj.protein += newObject.protein
            existingObj.weight += newObject.weight
            setMealProduct([...newMealProcuts, existingObj]);
        }
        else setMealProduct([...mealProducts, newObject]);
        setMealInfo({
            calories: mealInfo.calories + newObject.calories,
            protein: mealInfo.protein + newObject.protein,
            carbs: mealInfo.carbs + newObject.carbs,
            weight: mealInfo.weight + newObject.weight,
        })
        setProduct(null);
    }
        const postMealWithProducts = useMutation({
            mutationFn: (fullMeal: any) => {
              return axios.post('http://localhost:5000/meals/meal/create', fullMeal )
            },
          });
        const handleSaveMeal = () => {
            postMealWithProducts.mutate({...mealInfo,  prods: mealProducts , title: selectedMealType, isPortion: isPortion,})
        }
    return (
        <div>
        <h1>{selectedMealType}</h1>
            <div style={{textAlign: "left", margin: 25}}>
                <label style={{width: "25%", margin: 10}} htmlFor="meal-type-select">Select a meal type:</label>
                <select style={{width: "25%", margin: 10}} id="meal-type-select" value={selectedMealType} onChange={handleSelectChange}>
                {Object.keys(MealType).map((key) => (
                    <option key={key} value={key}>
                    {key}
                    </option>
                ))}
                 </select>
                 <button onClick={() => isPortion = 1}>Full Portion</button>
                <h3>Meal info: </h3>
                <div>
                {Object.entries(mealInfo).map(([key, value], mapkey) => {
                    return <h4 key={mapkey}>{key}: {parseFloat(value.toPrecision(3))}</h4>
                })}
                </div>
                {mealProducts.length > 0 ? (
                    <button onClick={() => handleSaveMeal()}>Save the meal</button>
                ):
                null}
            
            </div>
            <h3>Added Products:</h3>
            <div style={{display: "flex", flexDirection: "row"}}>
                {mealProducts.map((product: ProductWithWeightType, key) => (
                    <div key={key} style={{margin: 5, display: "flex", flexDirection: "column"}}>
                    <span> Title: {product.title}</span>
                    <span> Carbs: {parseFloat(product.carbs.toPrecision(3))}</span>
                    <span> Calories: {parseFloat(product.calories.toPrecision(3))}</span>
                    <span> Protein: {parseFloat(product.protein.toPrecision(3))}</span>
                    <span> Weight: {parseFloat(product.weight.toPrecision(3))}</span>
                    <button style={{margin: "5 10"}} onClick={()=> deleteProduct(product)}>Remove</button>
                    </div>
                ))}
            </div>
            {product ? ( 
                    <div>
                {product?.title}
                <input min={1} placeholder="type weight in grams" type="number"  ref = {productWeight}/>
                <button onClick={() => handleButtonClick(product)}
                >
                    Add to meal
                </button>
            </div>
                ) : null
                
            }
            <h2>Add Product to the meal: </h2>
            <Product prodList = {mealProducts} setProduct = {setProduct}/>
        </div>
    )

}

export default Meal