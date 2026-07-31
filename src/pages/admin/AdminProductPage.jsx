import { useState } from 'react';
import { Edit, Trash, Plus, Search, RotateCcw } from 'lucide-react';
import { useFetcher, useLoaderData } from 'react-router-dom';
import Modal from '../../components/Modal.jsx';
import ProductModal from '../../components/admin/ProductModal.jsx';
import Table from '../../components/Table.jsx';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../../services/productService.js';
import { getCategories } from '../../services/categoryService.js';
import { uploadProductImage, getImageUrl, deleteProductImageFromStorage } from '../../services/storageService.js';
import { createProductImage, updateProductImage, deleteProductImage } from '../../services/productImageService.js';

const AdminProductPage = () => {
  const [ openModal, setOpenModal ] = useState(false);
  const [ openDescription, setOpenDescription ] = useState(false);
  const [ selectedProduct, setSelectedProduct ] = useState(null);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ selectedCategoryId, setSelectedCategoryId ] = useState('');

  const { products, categories } = useLoaderData();
  const fetcher = useFetcher();

  function handleDelete(id) {
    if (!confirm("Delete this product?")) return;

    const formData = new FormData();
    formData.append('intent', 'delete');
    formData.append('id', id);

    fetcher.submit(formData, { method: 'post' });
  }

  // Filter Products
  const filteredProducts = products.filter((product) => {
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !term ||
      product.name?.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term);
    const matchesCategory =
      !selectedCategoryId || product.category_id === selectedCategoryId;
    return matchesSearch && matchesCategory;
  });

  const columns = [
    {
      key: 'image',
      header: 'Image',
      render: (product) =>
        product.product_images?.length > 0 ? (
          <img
            src={getImageUrl(product.product_images[0].image_path)}
            alt={product.name}
            className="h-14 w-14 rounded-lg border border-gray-100 bg-gray-50 object-contain"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
            No Image
          </div>
        ),
    },
    {
      key: 'name',
      header: 'Product Name',
      render: (product) => (
        <span className="text-sm font-medium text-gray-800">{product.name}</span>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      render: (product) => (
        <span className="text-sm font-semibold text-blue-600">
          {Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}฿
        </span>
      ),
    },
    {
      key: 'description',
      header: 'Description',
      render: (product) =>
        product.description?.length > 60 ? (
          <button
            onClick={() => {
              setSelectedProduct(product);
              setOpenDescription(true);
            }}
            className="max-w-50 truncate text-left text-sm text-gray-600 hover:text-blue-600 underline-offset-2 hover:underline"
            title="Click to see full description"
          >
            {product.description.slice(0, 60)}...
          </button>
        ) : (
          <span className="text-sm text-gray-600">{product.description || ''}</span>
        ),
    },
    {
      key: 'stock',
      header: 'Stock',
      render: (product) => (
        <span className="text-sm text-gray-600">{product.stock || 0}</span>
      ),
    },
    {
      key: 'categories',
      header: 'Category',
      render: (product) => (
        
        <span className="text-sm text-gray-600">{product.categories?.name}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'center',
      render: (product) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => {
              console.log(product);
              setSelectedProduct(product);
              setOpenModal(true);
            }}
            className="flex items-center gap-1.5 rounded-lg border border-blue-500 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <Edit size={13} />
            Edit
          </button>
          <button
            onClick={() => handleDelete(product.id)}
            className="flex items-center gap-1.5 rounded-lg border border-red-400 px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash size={13} />
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Manage Products</h1>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setOpenModal(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add New Product
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-50 max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Brands</option>
        </select>

        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Status</option>
          <option>Active</option>
          <option>Hidden</option>
        </select>

        <button
          onClick={() => {
            setSearchTerm('');
            setSelectedCategoryId('');
          }}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={filteredProducts}
        label="products"
        emptyMessage="No products found."
      />

      <ProductModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        categories={categories}
      />

      <Modal
        isOpen={openDescription}
        onClose={() => setOpenDescription(false)}
        title={selectedProduct?.name}
      >
        <p className="text-sm leading-relaxed text-gray-600">{selectedProduct?.description}</p>
      </Modal>
    </>
  );
};

export const loaderProducts = async () => {
  const [ products, categories ] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  return { products, categories };
}

export const actionProducts = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get('intent');

  // Delete Product
  if (intent === 'delete') {
    const productId = formData.get('id');
    const product = await getProduct(productId);

    if (product.product_images?.length > 0) {
      for (const img of product.product_images) {
        await deleteProductImageFromStorage(img.image_path);
      }
      await deleteProductImage(productId);
    }

    await deleteProduct(productId);
    return null;
  }

  const images = formData.getAll('images');
  const product = {
    name: formData.get('name'),
    category_id: formData.get('category_id'),
    price: formData.get('price'),
    stock: formData.get('stock'),
    description: formData.get('description'),
    is_active: formData.getAll('is_active').includes('true'),
  };

  // Create Product
  if (intent === 'create') {
    const createdProduct = await createProduct(product);

    for (const [index, image] of images.entries()) {
      if (image instanceof File && image.size > 0) {
        const imagePath = await uploadProductImage(image);

        await createProductImage({
          product_id: createdProduct.id,
          image_path: imagePath,
          display_order: index + 1,
        });
      }
    }
    

    return null;
  }

  // Update Product
  if (intent === 'update') {
    const id = formData.get('id');
    await updateProduct(id, product);

    const validImages = images.filter(
      (image) => image instanceof File && image.size > 0
    )

    if (validImages.length > 0) {
      const oldImagePaths = formData.getAll('old_image_paths');

      if (oldImagePaths.length > 0) {
        for (const path of oldImagePaths) {
          await deleteProductImageFromStorage(path);
        }
        await deleteProductImage(id);
      }

      for (const [index, image] of validImages.entries()) {
        const imagePath = await uploadProductImage(image);

        await createProductImage({
          product_id: id,
          image_path: imagePath,
          display_order: index + 1,
        });
      }
    }

    return null;
  }

  throw new Response('Invalid product action', { status: 400 });
}

export default AdminProductPage;
