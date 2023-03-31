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
    const [portionProds, setPortionProds] = useState<ProductWithWeightType[] | undefined>();
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
            protein: data.protein,
            carbs: data.carbs,
            weight: data.weight
          });
          const destructedMealProds = data.Products.map((prod: PortionProducts) =>{
            return {
                ...prod.MealProducts,
                ...prod
            }
          })
          setPortionProds(destructedMealProds);
        }
      }, [data]);
    useEffect(() =>{
        if(portionProds && portionInfo) {
            const newPortionProdsArray = portionProds.map((prod) => {
                return {
                    ...prod,
                    MealProducts: {
                        calories: prod.calories * portion,
                        protein: prod.protein * portion,
                        carbs: prod.carbs * portion,
                        weight: prod.weight * portion,
                    },
                    
                }
            })
            setPortionProds(newPortionProdsArray)
            setPortionInfo({
                calories: portionInfo.calories * portion,
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
                    calories: existingObj.calories + newObject.calories,
                    carbs: existingObj.carbs + newObject.carbs,
                    protein: existingObj.protein + newObject.protein,
                    weight: existingObj.weight + newObject.weight,
                }
            }
            setPortionProds([...newMealProcuts, addedObject]);
        }
        else setPortionProds([...portionProds, {
            title: newObject.title,
            product_id: newObject.product_id,
            calories:  newObject.calories,
            carbs: newObject.carbs,
            protein: newObject.protein,
            weight: newObject.weight,
            }
        ]);
        setPortionInfo({
            calories: portionInfo.calories + newObject.calories,
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
                <button onClick={() => mutation.mutate({...portionInfo,  prods: portionProds , title: selectedMealType, isPortion: 1})}>Save the meal</button>
            </div>
            ): 
            null}
            
    </div>
  )
}

export default Portion