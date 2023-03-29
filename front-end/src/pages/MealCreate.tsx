import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom"
import Product from "../components/Product/Product";
import { returnEditedObject, returnMealInfoWithPortion } from "../helper/functions";
import { useFetchData } from "../hooks/axiosHooks"
import { ProductType, ProductWithWeightType, MealInfoType } from "../types/productTypes";

type Props = {}

const Meal = (props: Props) => {
    const productWeight = useRef<HTMLInputElement>(null);
    const mealPortion = useRef<HTMLInputElement>(null);
    const [portion, setPortion] = useState(1);
    const [isMealPortioned, setIsMealPortioned] = useState<boolean>(false);
    const {meal_id} = useParams();
    const {data, isLoading, error} = useFetchData('meal', `/meals/meal/create/${meal_id}`);
    const [mealProducts, setMealProduct] = useState<ProductWithWeightType[]>([]);
    const [product, setProduct] = useState<ProductType | null>(null);
    const [mealInfo, setMealInfo] = useState<MealInfoType>({
        calories: 0,
        price: 0,
        protein: 0,
        carbs: 0,
        weight: 0
    })
    useEffect(() =>{
        setMealInfo(returnMealInfoWithPortion(mealInfo, portion))
        const newMealProds = mealProducts.map((prod: ProductWithWeightType) => {
            return {
                ...prod,
                calories: prod.calories * portion,
                price: prod.price * portion,
                protein: prod.protein * portion,
                carbs: prod.carbs * portion,
                weight: prod.weight * portion,
            }
        })
        setMealProduct(newMealProds)

    }, [portion])
    const deleteProduct = (product: ProductWithWeightType) => {
        setMealProduct(mealProducts.filter((prod: ProductWithWeightType) => prod.title!== product.title));
        setMealInfo({
            calories: mealInfo.calories - product.calories,
            price: mealInfo.price - product.price,
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
            existingObj.price += newObject.price
            existingObj.protein += newObject.protein
            existingObj.weight += newObject.weight
            setMealProduct([...newMealProcuts, existingObj]);
        }
        else setMealProduct([...mealProducts, newObject]);
        setMealInfo({
            calories: mealInfo.calories + newObject.calories,
            price: mealInfo.price + newObject.price,
            protein: mealInfo.protein + newObject.protein,
            carbs: mealInfo.carbs + newObject.carbs,
            weight: mealInfo.weight + newObject.weight,
        })
        setProduct(null);
    }
        const postMealWithProducts = useMutation({
            mutationFn: (fullMeal: ProductWithWeightType[]) => {
              return axios.post('http://localhost:5000/meals/meal', [fullMeal, meal_id])
            },
          });
        const updateMealValues = useMutation({
            mutationFn: (mealInfo: MealInfoType) => {
              return axios.put('http://localhost:5000/meals/meal', {...mealInfo, meal_id: Number(meal_id)})
            },
        })
        const handleSaveMeal = () => {
            postMealWithProducts.mutate(mealProducts)
            updateMealValues.mutate(mealInfo)
        }
        const updateValuesWithPortion = () =>{
            setPortion(Number(mealPortion.current?.value) / mealInfo.weight);
        }
    if(!data) {
        return (
            <>
                <h1>Meal doesn't exist</h1>
            </>
        )
    }
    return (
        <div>
            <h1>{data.title}</h1>
            <div style={{textAlign: "left", margin: 25}}>
                <h3>Meal info: </h3>
                <h2>Portion eaten: {(portion).toPrecision(3)} </h2>
                {
                    isMealPortioned && mealProducts.length > 0 ? (
                        <>
                            <input ref={mealPortion} type="number" name="" id="" />
                            <button onClick={() => updateValuesWithPortion()}>Set portion</button>
                        </>
                    ) :
                    (
                        <button onClick={() => setIsMealPortioned(true)}>Portion the meal</button>
                    )
                }

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