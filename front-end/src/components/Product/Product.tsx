import { useFetchData } from "../../hooks/axiosHooks";
import { ProductType } from "../../types/productTypes"


const Product = (props: any) => {
    const { data, isLoading, error } = useFetchData("allProducts", "/products")
    if (isLoading) {
        return <div>Loading...</div>;
    }

  return (
    <div style={{ display: "flex", flexDirection: "row"}}>
            {data.map((product: ProductType, key: number) => (
                <div key={key}>
                <span onClick={() => {
                    props.setProduct(product)
                }} style={{margin: 15, cursor: "pointer"}} key={product.product_id}>
                    {product.title}
                </span>
                </div>
            ))}
    </div>  )
}

export default Product