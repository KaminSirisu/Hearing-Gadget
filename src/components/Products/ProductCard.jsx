import { Link } from "react-router-dom";
import { getImageUrl } from "../../services/storageService";
import { formatPrice } from "../../utils/formatPrice.js";

const ProductCard = ({ product }) => {
    const image = product.product_images.find(img => img.display_order === 1);
    const imageUrl = image ? getImageUrl(image.image_path) : null;

    return (
        <div className="flex flex-col h-full hover:border hover:border-neutral-200 rounded-lg p-5 space-y-3 bg-white">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="h-56 w-full object-contain"
                />
            ): (
                <div className="flex h-56 w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
                    No Image
                </div>
            )}
            <div className="flex flex-col gap-1">
                <h3 className="font-medium text-neutral-800 line-clamp-2" title={product.name}>
                    {product.name}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 min-h-10">
                    {product.description}
                </p>
                <p className="font-medium text-[15px]">
                    {formatPrice(product.price)}
                </p>
            </div>
            <div className="mt-auto">
                <Link 
                    to={`/products/${product.slug}`} 
                    className="block w-full text-center border border-blue-400 text-blue-500 
                    hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-md p-2 text-xs font-medium"
                >
                    ดูรายละเอียด
                </Link>
            </div>
            
        </div>
    )
}

export default ProductCard;
