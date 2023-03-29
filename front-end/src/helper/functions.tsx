import { MealInfoType, ProductType, ProductWithWeightType } from "../types/productTypes";
export const returnEditedObject = (object: ProductType, weight: number) => {
    return {...object, 
        calories: (object.calories * (weight/100) ),
        price: (object.price * (weight/100)),  
        protein: (object.protein * (weight/100) ),
        carbs: (object.carbs * (weight/100) ),
        weight: weight 
    }
};
export const returnMealInfoWithPortion = (object: MealInfoType, portion: number) => {
    return {
        calories: object.calories  *portion,
        price: object.price * portion,
        protein: object.protein*portion,
        carbs: object.carbs*portion,
        weight: object.weight*portion,
    }
}