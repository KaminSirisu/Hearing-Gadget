import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Contact from "./pages/Contact.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminDashboardPage, { loaderDashboard } from "./pages/admin/AdminDashboardPage.jsx";
import AdminProductPage, { actionProducts, loaderProducts } from "./pages/admin/AdminProductPage.jsx";
import AdminCategoriesPage, { actionCategories, loaderCategories } from "./pages/admin/AdminCategoriesPage.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminSettingPage, { actionSettings, loaderSettings } from "./pages/admin/AdminSettingPage.jsx";
import UserLayout from "./layouts/userLayout.jsx";
import Error from "./pages/Error.jsx";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <UserLayout />,
      errorElement: <Error />,
      children: [
        { 
          index: true,
          element: <Home />
        },
        {
          path: 'product',
          element: <Product />
        },
        {
          path: 'about',
          element: <AboutUs />
        },
        {
          path: 'contact',
          element: <Contact />
        },
        {
          path: 'admin/login',
          element: <AdminLogin />
        }
      ]
    },
    {
      path: '/admin',
      element: (
        <ProtectedRoute>
          <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          <AdminLayout />
        </ProtectedRoute>
      ),
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <AdminDashboardPage />,
          loader: loaderDashboard
        },
        {
          path: 'products',
          element: <AdminProductPage />,
          loader: loaderProducts,
          action: actionProducts
        },
        {
          path: 'categories',
          element: <AdminCategoriesPage />,
          loader: loaderCategories,
          action: actionCategories
        },
        {
          path: 'setting',
          element: <AdminSettingPage />,
          loader: loaderSettings,
          action: actionSettings
        },
      ]
    }
  ])
  return (
    // <Router>
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path='/product' element={<Product />} />
    //       <Route path='/about' element={<AboutUs />} />
    //       <Route path='/contact' element={<Contact />} />
    //       <Route path='/admin/login' element={<AdminLogin />} />

    //       <Route 
    //         path="/admin"
    //         element={
    //           <ProtectedRoute>
    //             <AdminLayout />
    //           </ProtectedRoute>
    //         }
    //       >
    //         <Route 
    //           index
    //           element={<AdminDashboardPage />}
    //         />

    //         <Route 
    //           path="products"
    //           element={<AdminProductPage />}
    //         />

    //         <Route 
    //           path="categories"
    //           element={<AdminCategoriesPage />}
    //         />
    //         <Route 
    //           path="setting"
    //           element={<AdminSettingPage />}
    //         />
    //       </Route>
          
    //     </Routes>
        
    // </Router>
    <RouterProvider router={router} />
  )
}

export default App
