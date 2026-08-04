const DashboardSkeleton = () => {
    return (
        <div className="mt-2">
            <div className="grid grid-cols-4 gap-4">
                {/* 4 stat card placeholders here */}
                <div className="h-45 animate-pulse rounded-lg bg-gray-200"/>
                <div className="h-45 animate-pulse rounded-lg bg-gray-200"/>
                <div className="h-45 animate-pulse rounded-lg bg-gray-200"/>
                <div className="h-45 animate-pulse rounded-lg bg-gray-200"/>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-5">
                {/* 2 placeholders here — one col-span-2, one normal */}
                <div className="col-span-2 h-55 animate-pulse rounded-lg bg-gray-200"/>
                <div className="h-55 animate-pulse rounded-lg bg-gray-200"/>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-5">
                {/* 1 placeholder for recent products */}
                <div className="col-span-2 h-60 animate-pulse rounded-lg bg-gray-200"/>
                <div className="h-60 animate-pulse rounded-lg bg-gray-200"/>
            </div>
        </div>
    )
}

export default DashboardSkeleton;