const ProductToolbar = ({ count, sortOptions, sortValue, onSortChange }) => {
    return (
        <div className="flex justify-between p-5 w-full">
            Showing {count} product{count !== 1 ? 's': ''}
            <div className="flex items-center">
                Sort by:&nbsp;
                <select value={sortValue} onChange={(e) => onSortChange(e.target.value)} className="border border-gray-200 rounded-lg p-1">
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            
        </div>
    )
}

export default ProductToolbar;