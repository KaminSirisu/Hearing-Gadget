import ProductCard from "./ProductCard.jsx";

const ProductGrid = ({ products, onClearAll }) => {
    return (
        <div>
            
            {products.length === 0 ? (
                <div className="px-5">
                    <h1 className="text-2xl font-semibold">
                        0 Product Result
                    </h1>
                    <button onClick={onClearAll}>Clear All</button>
                </div>
            ): (
                <div className="grid grid-cols-4 gap-5 px-5">
                    {products.map((product) => (
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
                
            )}
        </div>
    )
}

export default ProductGrid;