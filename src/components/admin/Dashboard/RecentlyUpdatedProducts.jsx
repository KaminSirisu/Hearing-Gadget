import { getImageUrl } from '../../../services/storageService.js';
import { formatRelativeTime } from '../../../utils/formatRelativeTime.js';

const RecentlyUpdatedProducts = ({ recentProducts }) => {
    return (
        <div className="p-5 bg-white rounded-lg shadow-md">
            <span className="font-medium text-lg">Recently Updated Products</span>
            {recentProducts.map((product) => (
                <div key={product.id} className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                        {(product.product_images).length === 0 ? (
                            <div className="bg-gray-200 w-12 h-12 flex items-center justify-center">
                                No Image
                            </div>
                        ): (
                            <img 
                                src={getImageUrl(product.product_images[0].image_path)} 
                                alt={product.name} 
                                className="w-12 h-12 object-cover"
                            />
                        )}
                        <div>
                            <span className="font-medium text-sm">{product.name}</span>
                            <p className="text-gray-500 text-xs">
                                {product.categories?.name}
                            </p>
                        </div>
                    </div>
                    
                    <span className="text-gray-500 text-sm">
                        {formatRelativeTime(product.updated_at)}
                    </span>
                    
                </div>
            ))}
        </div>
    )
}

export default RecentlyUpdatedProducts;