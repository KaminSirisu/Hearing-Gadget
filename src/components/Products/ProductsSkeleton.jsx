import React from 'react'

const ProductsSkeleton = ({ count=16 }) => {
  return (
    <div className="mt-2">
      {/* Hero banner placeholder */}
      <div className="h-55 w-full animate-pulse bg-gray-200 mb-5" />

      <div className="flex gap-5">
        {/* Filter sidebar placeholder */}
        <div className="h-96 w-64 shrink-0 animate-pulse rounded-lg bg-gray-200" />

        <div className="flex-1">
          {/* Toolbar placeholder */}
          <div className="flex justify-between items-center mb-4">
            <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
            <div className="h-9 w-40 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Product card placeholders */}
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, index) => (
              <div
                key={index}
                className="h-60 animate-pulse rounded-lg bg-gray-200"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Feature banner placeholder */}
      <div className="h-24 w-full animate-pulse rounded-lg bg-gray-200 mt-5" />
    </div>
  )
}

export default ProductsSkeleton