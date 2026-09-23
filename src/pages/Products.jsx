import { useState } from 'react';
import { getProductsPageData } from '../services/productService.js';
import { useLoaderData, useNavigation } from "react-router-dom";
import FeatureBanner from "../components/Products/FeatureBanner.jsx";
import HeroBanner from "../components/Products/HeroBanner.jsx";
import ProductsSkeleton from "../components/Products/ProductsSkeleton.jsx";
import ProductGrid from '../components/Products/ProductGrid.jsx';
import ProductToolbar from '../components/Products/ProductToolbar.jsx';
import FilterSidebar from '../components/Products/FilterSidebar.jsx';

const Products = () => {
  const navigation = useNavigation();
  const { products, categories } = useLoaderData();
  const isLoading = navigation.state === 'loading' && navigation.location?.pathname === '/products';

  const [ selectedCategoryIds, setSelectedCategoryIds ] = useState([]);
  const [ appliedCategoryIds, setAppliedCategoryIds ] = useState([]);
  const [ priceRange, setPriceRange ] = useState({
    min: null,
    max: null
  })
  const [ appliedPriceRange, setAppliedPriceRange ] = useState({
    min: null,
    max: null
  })
  const [ sortValue, setSortValue ] = useState('featured');

  const SORT_OPTIONS = [
    { value: 'featured', label: 'Featured', compareFn: null },
    { value: 'price-asc', label: 'Price: Low to High', compareFn: (a, b) => Number(a.price) - Number(b.price) },
    { value: 'price-desc', label: 'Price: High to Low', compareFn: (a, b) => Number(b.price) - Number(a.price) },
  ]

  function toggleCategory(categoryId) {
    setSelectedCategoryIds((prevState) => {
      if (prevState.includes(categoryId)) {
        return prevState.filter((state) => state !== categoryId);
      }
      return [
        ...prevState,
        categoryId
      ]
    })
  }
  function onApplyCategories() {
    setAppliedCategoryIds(selectedCategoryIds);
  }

  function onPriceRangeChange(field, value) {
    if (value === "") {
      value = null;
    }
    setPriceRange((prevState) => ({
      ...prevState,
      [field]: value
    }))
  }
  function onApplyPrice() {
    setAppliedPriceRange(priceRange);
  }

  function onSortChange(value) {
    setSortValue(value);
  }
  function onClearAll() {
    setSelectedCategoryIds([]);
    setAppliedCategoryIds([]);
    setPriceRange({
      min: null,
      max: null
    });
    setAppliedPriceRange({
      min: null,
      max: null
    });
  }
  
  const filteredProducts = products.filter((product) => {
    const matchesCategory = appliedCategoryIds.length === 0 || appliedCategoryIds.includes(product.category_id)
    const matchesPrice = (appliedPriceRange.min === null || Number(product.price) >= Number(appliedPriceRange.min)) 
    && (appliedPriceRange.max === null || Number(product.price) <= Number(appliedPriceRange.max));
    return matchesCategory && matchesPrice;
  })
  const sortOption = SORT_OPTIONS.find(option => option.value === sortValue);
  
  const resultFilteredProducts = sortOption.compareFn ? filteredProducts.sort(sortOption.compareFn) : filteredProducts;


  return (
    <div className="min-h-screen">
      {isLoading ? (
        <ProductsSkeleton />
      ): (
        <>
          <HeroBanner />
          <div className="flex">
            <FilterSidebar 
              categories={categories} 
              selectedCategoryIds={selectedCategoryIds}
              priceRange={priceRange} 
              onToggleCategory={toggleCategory} 
              onPriceRangeChange={onPriceRangeChange} 
              onClearAll={onClearAll} 
              onApplyPrice={onApplyPrice} 
              onApplyCategories={onApplyCategories} 
            />
            <div className="flex-1">
              <ProductToolbar count={resultFilteredProducts.length} sortOptions={SORT_OPTIONS} sortValue={sortValue} onSortChange={onSortChange} />
              <ProductGrid products={resultFilteredProducts} onClearAll={onClearAll}/>
            </div>
            
          </div>
          
          <section className="my-5">
            <div className="max-w-7xl mx-auto">
              <FeatureBanner />
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export default Products

export const loaderProductsPublic = async () => {
  return await getProductsPageData();
}
