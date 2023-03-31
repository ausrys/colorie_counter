import { MealProducts,ProductWithWeightType
  } from "../../types/productTypes";

type Props = {}
const MealProductsList = (props: any) => {
  return (
    <div style={{display: "flex", flexDirection: "row"}}>
            {props.products.map((product: ProductWithWeightType, key: any) => (
                        <div key={key} style={{margin: 10, display: "flex", flexDirection: "column", textAlign: 'left'}}>
                        <span> Title: {product.title}</span>
                        <span> Carbs: {product?.carbs.toPrecision(3)}</span>
                        <span> Calories: {product?.calories.toPrecision(3)}</span>
                        <span> Protein: {product?.protein.toPrecision(3)}</span>
                        <span> Weight: {product?.weight.toPrecision(3)}</span>
                        </div>
                    ))}
    </div>
  )
}

export default MealProductsList