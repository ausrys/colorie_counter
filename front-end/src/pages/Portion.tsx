import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MealInfo from "../components/Meal/MealInfo";
import MealProductsList from "../components/Meal/MealProductsList";
import PortionInfo from "../components/Portion/PortionInfo";
import Product from "../components/Product/Product";
import { returnEditedObject, returnMealInfoWithPortion } from "../helper/functions";
import { useFetchData } from "../hooks/axiosHooks";
import { MealType } from "../types/enums";
import { MealInfoType, MealProducts, PortionProducts, ProductType, ProductWithWeightType } from "../types/productTypes";

type Props = {}

const Portion = (props: Props) => {
    const {meal_id} = useParams();
    const {data, isLoading, error  } = useFetchData('mealget', `/meals/meal/${meal_id}`);
    const [selectedMealType, setSelectedMealType] = useState(MealType.Breakfast);
    const mealPortion = useRef<HTMLInputElement>(null);
    const productWeight = useRef<HTMLInputElement>(null);
    const [portionInfo, setPortionInfo] = useState<MealInfoType | undefined>();
    const [portionProds, setPortionProds] = useState<PortionProducts[] | undefined>();
    const [product, setProduct] = useState<ProductWithWeightType | null>(null);
    const [portion, setPortion] = useState(1);
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: (newMeal: any) => {
          return axios.post('http://localhost:5000/meals/meal/create', newMeal)
        },
        onSuccess: (data: any) => {
          navigate(`/meals`)
        },
      })
    useEffect(() => {
        if (data) {
          setPortionInfo({
            calories: data.calories,
            price: data.price,
            protein: data.protein,
            carbs: data.carbs,
            weight: data.weight
          });
          setPortionProds(data.Products);
        }
      }, [data]);
    useEffect(() =>{
        if(portionProds && portionInfo) {
            const newPortionProdsArray = portionProds.map((prod) => {
                return {
                    ...prod,
                    MealProducts: {
                        calories: prod.MealProducts.calories * portion,
                        price: prod.MealProducts.price * portion,
                        protein: prod.MealProducts.protein * portion,
                        carbs: prod.MealProducts.carbs * portion,
                        weight: prod.MealProducts.weight * portion,
                    },
                    
                }
            })
            setPortionProds(newPortionProdsArray)
            setPortionInfo({
                calories: portionInfo.calories * portion,
                price: portionInfo.price * portion,
                protein: portionInfo.protein * portion,
                carbs: portionInfo.carbs * portion,
                weight: portionInfo.weight * portion
            })
        }
        

    }, [portion])
    if(isLoading) return <h1>Loading...</h1>
    if(!data) return <h1>Meal was not found</h1>
    const {createdAt, title,  Products, isPortion, ...rest} = data;
    
    const mealInfo : MealInfoType = {...rest};
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMealType(event.target.value as MealType);
      };
    const updateValuesWithPortion = () =>{
        setPortion(Number(mealPortion.current?.value) / mealInfo.weight);
    }
    
    const handleButtonClick = (product: ProductWithWeightType) => {
        if(portionInfo && portionProds ) {
        const inputValue = productWeight.current?.value;
        const existingObj = portionProds.find(obj => obj.product_id ===product.product_id)
        const newObject = returnEditedObject(product, Number(inputValue));
        if(existingObj) {
            const newMealProcuts = portionProds.filter((prod) => prod.product_id !== product.product_id)
            const addedObject = {
                ...existingObj,
                MealProducts: {
                    calories: existingObj.MealProducts.calories + newObject.calories,
                    price: existingObj.MealProducts.price + newObject.price,
                    carbs: existingObj.MealProducts.carbs + newObject.carbs,
                    protein: existingObj.MealProducts.protein + newObject.protein,
                    weight: existingObj.MealProducts.weight + newObject.weight,
                }
            }
            setPortionProds([...newMealProcuts, addedObject]);
        }
        else setPortionProds([...portionProds, {
            title: newObject.title,
            product_id: newObject.product_id,
            MealProducts: {
                calories:  newObject.calories,
                    price: newObject.price,
                    carbs: newObject.carbs,
                    protein: newObject.protein,
                    weight: newObject.weight,
            }
        }]);
        setPortionInfo({
            calories: portionInfo.calories + newObject.calories,
            price: portionInfo.price + newObject.price,
            protein: portionInfo.protein + newObject.protein,
            carbs: portionInfo.carbs + newObject.carbs,
            weight: portionInfo.weight + newObject.weight,
        })
        setProduct(null);
        }
        
    }
  return (
    <div>
        <h2>Portion the {createdAt} meal</h2>
        <div style={{display: "flex", flexDirection: "row"}}>
            {/* Portion meal */}
            <div style={{width: "40%", margin: 'auto'}}>
                <h2>Portioned Meal:</h2>
                <h2>Portion: {portion}</h2>
                <h2>{selectedMealType}</h2>
                <div style={{textAlign: "left"}}>
                {
                    portionInfo && (
                        Object.entries(portionInfo).map(([key, value], mapkey) => 

                             <h4 style={{margin: 10}} key={mapkey}>{key}: {parseFloat(Number(value).toPrecision(3))}</h4>
                            
                        )
                    )
                }
                
                </div>
                    {
                        portionProds && (
                            <MealProductsList products = {portionProds}/>
                        )
                    }
                <div style={{display: "flex", flexDirection: "column"}}>
                <label style={{width: "25%", margin: 10}} htmlFor="meal-type-select">Select a meal type:</label>
                <select style={{width: "25%", margin: 10}} id="meal-type-select" value={selectedMealType} onChange={handleSelectChange}>
                    {Object.keys(MealType).map((key) => (
                    <option key={key} value={key}>
                    {key}
          </option>
        ))}
                </select>
                {
                    portion === 1 ? (
                        <>
                        <span style={{textAlign: "left"}}>Set value of the portion</span>
                        <input style={{width: "25%", margin: 10}}  ref={mealPortion} type="number" name="" id="" />
                        <button style={{width: "25%", margin: 10}} onClick={() => updateValuesWithPortion()}>Set portion</button>
                        </>
                    )
                    : null
                }
                
                </div>
                
            </div>
            {/* Original Meal */}
            <div style={{width: "40%", margin: 'auto'}}>
                <MealInfo data = {data}/>
            </div>
            
        </div>
        <div>   
        {portion < 1 ? ( 
                    <div>
                    <h2>Add extra food:</h2>
                <Product setProduct = {setProduct}/>
                {product?.title}
                {
                    product ? (
                        <>
                        <input min={1} placeholder="type weight in grams" type="number"  ref = {productWeight}/>
                        <button onClick={() => handleButtonClick(product)}>
                            Add to meal
                         </button>
                         </>
                    ): 
                    null
                }
                
            </div>
                ) : null
                
            }
            </div>
            {portion !==1 ? (
                <div>
                <button onClick={() => mutation.mutate({...portionInfo,  MealProducts: portionProds, title: selectedMealType, isPortion: 1})}>Save the meal</button>
            </div>
            ): 
            null}
            
    </div>
  )
}

export default Portion