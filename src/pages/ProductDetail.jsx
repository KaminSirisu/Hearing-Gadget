import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { getProductBySlug } from "../services/productService";
import { getImageUrl } from "../services/storageService";
import { formatPrice } from "../utils/formatPrice";
import { shopee, lazada } from "../image.js";

const ProductDetail = () => {
  const { name, price, description, categories, product_images, shopee_url, lazada_url } = useLoaderData();

  const [ selectedDisplayOrder, setSelectedDisplayOrder ] = useState(1);
  const image = product_images.find(img => img.display_order === selectedDisplayOrder);
  const imageUrl = image ? getImageUrl(image.image_path) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-neutral-500">
        <Link to="/" className="hover:underline">หน้าแรก</Link>
        <span> {'>'} </span>
        <Link to="/products" className="hover:underline">สินค้า</Link>
        <span> {'>'} </span>
        <span className="text-neutral-800 font-medium">{name}</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Gallery */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product_images.map((image) => (
              <img
                key={image.image_path}
                src={getImageUrl(image.image_path)}
                onClick={() => setSelectedDisplayOrder(image.display_order)}
                className={`object-cover w-16 h-16 rounded-md cursor-pointer border
                  ${image.display_order === selectedDisplayOrder ? 'border-2 border-blue-500' : 'border-gray-200'}
                `}
              />
            ))}
          </div>
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center p-6">
            <img
              src={imageUrl}
              alt={name}
              className="object-contain w-full h-96"
            />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4">
          {categories?.name && (
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-full">
              {categories.name}
            </span>
          )}
          <h1 className="text-3xl font-bold text-neutral-800">{name}</h1>
          <p className="text-2xl font-bold text-blue-600">{formatPrice(price)}</p>

          <div className="flex flex-col gap-3 pt-4">
            <a
              href={shopee_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              <img src={shopee} alt="Shopee" className="w-6 h-6" /> ซื้อที่ Shopee
            </a>
            <a
              href={lazada_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#283d6c] hover:bg-[#1e2e52] text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              <img src={lazada} alt="Lazada" className="w-6 h-6 rounded-md" /> ซื้อที่ Lazada
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-lg font-bold text-neutral-800 mb-3">รายละเอียด</h2>
        <p className="text-neutral-600 leading-relaxed whitespace-pre-line">{description}</p>
      </div>
    </div>
  )
}

export default ProductDetail

export const loaderProductDetail = async ({ params }) => {
  return await getProductBySlug(params.slug);
}
