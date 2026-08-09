import { Filter, RotateCcw, ChevronUp } from "lucide-react";

const FilterSidebar = ({ categories, selectedCategoryIds, onToggleCategory, priceRange, onPriceRangeChange, onClearAll, onApplyPrice, onApplyCategories }) => {
    return (
        <div className="w-72 shrink-0 bg-white rounded-lg border border-gray-100 shadow-sm divide-y divide-gray-100">
            <div className="flex items-center justify-between px-5 py-4">
                <h2 className="font-semibold text-gray-800">Filter Products</h2>
                <Filter size={18} className="text-gray-400" />
            </div>

            <div className="px-5 py-4">
                <button
                    onClick={onClearAll}
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                    <RotateCcw size={14} />
                    Clear All
                </button>
            </div>

            <div className="px-5 py-4 space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Category</h3>
                    <ChevronUp size={16} className="text-gray-400" />
                </div>
                <ul className="space-y-3">
                    {categories.map((category) => (
                        <li key={category.id} className="flex items-center gap-2.5">
                            <input
                                type="checkbox"
                                checked={selectedCategoryIds.includes(category.id)}
                                onChange={() => onToggleCategory(category.id)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label className="text-sm text-gray-600">
                                {category.name} <span className="text-gray-400">({category.products[0]?.count ?? 0})</span>
                            </label>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={onApplyCategories}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
                >
                    Apply Filters
                </button>
            </div>

            <div className="px-5 py-4 space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Price Range</h3>
                    <ChevronUp size={16} className="text-gray-400" />
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        onChange={(e) => onPriceRangeChange('min', e.target.value)}
                        value={priceRange.min ?? ''}
                        className="w-full min-w-0 rounded-md border border-gray-200 px-2.5 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        onChange={(e) => onPriceRangeChange('max', e.target.value)}
                        value={priceRange.max ?? ''}
                        className="w-full min-w-0 rounded-md border border-gray-200 px-2.5 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={onApplyPrice}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
                >
                    Confirm
                </button>
            </div>
        </div>
    )
}

export default FilterSidebar;