import { MealProducts } from "../../types/productTypes";

type Props = {}
const MealProductsList = (props: any) => {
  return (
    <div style={{display: "flex", flexDirection: "row"}}>
            {props.products.map((product: MealProducts, key: any) => (
                        <div key={key} style={{margin: 10, display: "flex", flexDirection: "column", textAlign: 'left'}}>
                        <span> Title: {product.title}</span>
                        <span> Carbs: {product.MealProducts.carbs}</span>
                        <span> Calories: {product.MealProducts.calories}</span>
                        <span> Protein: {product.MealProducts.protein}</span>
                        <span> Weight: {product.MealProducts.weight}</span>
                        </div>
                    ))}
    </div>
  )
}

export default MealProductsList