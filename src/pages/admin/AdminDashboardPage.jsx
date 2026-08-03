import React from 'react'
import { useLoaderData, useNavigation } from 'react-router-dom';
import { getDashboardData } from '../../services/dashboardService.js';
import StatCards from '../../components/admin/Dashboard/StatCards.jsx';
import WebsiteChecklist from '../../components/admin/Dashboard/WebsiteChecklist.jsx';
import SetupProgressCard from '../../components/admin/Dashboard/SetupProgressCard.jsx';
import RecentlyUpdatedProducts from '../../components/admin/Dashboard/RecentlyUpdatedProducts.jsx';
import VisitorTrendChart from '../../components/admin/Dashboard/VisitorTrendChart.jsx';
import DashboardSkeleton from '../../components/admin/Dashboard/DashboardSkeleton.jsx';

const AdminDashboardPage = () => {
  const {
    stats,
    analytics,
    visitorTrend,
    checklist,
    websiteStatus,
    recentProducts
  } = useLoaderData();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading' && navigation.location?.pathname === '/admin';

  return (
    <>
        <h1 className='text-3xl font-bold'>
            Dashboard
        </h1>
        <p className='mt-2 text-gray-600'>
            Welcome back.
        </p>
        
        {isLoading ? ( 
          <DashboardSkeleton />
        ) : (
          <div>
            <div className="grid grid-cols-4 gap-4 mt-5">
              <StatCards data={{ stats, analytics }} />
              <SetupProgressCard websiteStatus={websiteStatus} />
              
            </div>
            <div className="grid grid-cols-3 gap-4 mt-5">
              <div className="col-span-2">
                <VisitorTrendChart visitorTrend={visitorTrend} />
              </div>
              <WebsiteChecklist checklist={checklist} />
            </div>
            <RecentlyUpdatedProducts recentProducts={recentProducts} />
          </div>
          
        )}
        
        
    </>
  )
}

export default AdminDashboardPage;

export const loaderDashboard = async () => {
  return await getDashboardData();
};