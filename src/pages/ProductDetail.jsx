import { useParams } from "react-router-dom"

const ProductDetail = () => {
  const { slug } = useParams();
  return (
    <div>
        ProductDetail
        {slug}
    </div>
  )
}

export default ProductDetail
