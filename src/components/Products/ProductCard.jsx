import { Link } from "react-router-dom";
import { getImageUrl } from "../../services/storageService";
import { formatPrice } from "../../utils/formatPrice.js";

const ProductCard = ({ product }) => {
    const image = product.product_images.find(img => img.display_order === 1);
    const imageUrl = image ? getImageUrl(image.image_path) : null;

    return (
        /* 
          1. transition-all duration-300: Makes the shadow fade in smoothly
          2. border border-neutral-200: Base subtle border
          3. hover:border-neutral-300 hover:shadow-2xl: Full surround shadow & border change on hover
        */
        <div className="flex flex-col h-full bg-white rounded-lg p-5 hover:border-neutral-50 hover:shadow-lg transition-all duration-300">
            <Link to={`/products/${product.slug}`} className="flex flex-col h-full">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="h-56 w-full object-contain"
                    />
                ) : (
                    <div className="flex h-56 w-full items-center justify-center bg-gray-100 text-sm text-gray-400 rounded-md">
                        No Image
                    </div>
                )}
                
                <div className="flex flex-col gap-1 mt-5 grow">
                    <h3 className="font-medium text-neutral-800 line-clamp-2" title={product.name}>
                        {product.name}
                    </h3>
                    <p className="font-medium text-[15px] text-center mt-auto pt-2">
                        {formatPrice(product.price)}
                    </p>
                </div>
            </Link>
        </div>
    );
}

export default ProductCard;
