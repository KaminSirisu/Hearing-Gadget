import { useState, useRef, useEffect } from 'react';
import { useFetcher, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Edit, Trash, Plus, Tag } from 'lucide-react';
import { getCategories, createCategories, updateCategories, deleteCategories } from '../../services/categoryService.js';
import Table from '../../components/Table.jsx';
import CategoryModal from '../../components/admin/CategoryModal.jsx';

const AdminCategoriesPage = () => {
  const { categories } = useLoaderData();
  const fetcher = useFetcher();
  const quickAddFormRef = useRef(null);
  const isQuickAddingRef = useRef(false);

  const [ openModal, setOpenModal ] = useState(false);
  const [ selectedCategory, setSelectedCategory ] = useState(null);

  useEffect(() => {
    if (fetcher.state === 'submitting' && fetcher.formData?.get('intent') === 'create') {
      isQuickAddingRef.current = true;
    } else if (fetcher.state === 'idle' && isQuickAddingRef.current) {
      isQuickAddingRef.current = false;
      quickAddFormRef.current?.reset();
    }
  }, [fetcher.state, fetcher.formData]);

  function handleDelete(category) {
    const productCount = category.products?.[0]?.count ?? 0;
    if (productCount > 0) {
      toast.error(`Cannot delete '${category.name}' — it still has ${productCount} product(s) assigned.`);
      return;
    }

    if (!confirm('Delete this category?')) return;

    const formData = new FormData();
    formData.append('intent', 'delete');
    formData.append('id', category.id);

    fetcher.submit(formData, { method: 'post' });
  }

  const columns = [
    {
      key: 'name',
      header: 'Category Name',
      render: (category) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
            <Tag size={16} className="text-blue-500" />
          </div>
          <span className="text-sm font-semibold text-gray-800">{category.name}</span>
        </div>
      ),
    },
    {
      key: 'description',
      header: 'Description',
      render: (category) => (
        <span className="text-sm text-gray-500">{category.description || '—'}</span>
      ),
    },
    {
      key: 'count',
      header: 'Number of Products',
      align: 'center',
      render: (category) => (
        <span className="text-sm font-medium text-gray-700">
          {category.products?.[0]?.count ?? 0}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'center',
      render: (category) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => {
              setSelectedCategory(category);
              setOpenModal(true);
            }}
            className="flex items-center gap-1.5 rounded-lg border border-blue-500 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <Edit size={13} />
            Edit
          </button>
          <button
            onClick={() => handleDelete(category)}
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
    <div className="flex gap-6">
      {/* Main Content */}
      <div className="min-w-0 flex-1">
        {/* Page Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Categories</h1>
            <p className="mt-1 text-sm text-gray-500">Organize your product categories efficiently.</p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setOpenModal(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            Add New Category
          </button>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          data={categories}
          label="categories"
          emptyMessage="No categories found."
        />
      </div>

      {/* Quick Add Panel */}
      <div className="w-72 shrink-0">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-1 text-lg font-semibold text-gray-800">Quick Add Category</h2>
          <p className="mb-5 text-sm text-gray-500">Add a new category quickly.</p>

          <fetcher.Form ref={quickAddFormRef} method="post" className="space-y-4">
            <input type="hidden" name="intent" value="create" />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Category Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter category name"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter category description"
                rows={4}
                className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={fetcher.state !== 'idle'}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              Add Category
            </button>
          </fetcher.Form>
        </div>
      </div>

      {/* Edit Modal */}
      <CategoryModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        category={selectedCategory}
      />
    </div>
  );
};

export default AdminCategoriesPage;

export const loaderCategories = async () => {
  const categories = await getCategories();
  return { categories };
}

export const actionCategories = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get('intent');

  // Delete Category
  if (intent === 'delete') {
    try {
      await deleteCategories(formData.get('id'));
    } catch (error) {
      toast.error(error.message || 'Failed to delete category');
    }
    return null;
  }

  const category = {
    name: formData.get('name'),
    description: formData.get('description'),
  };

  // Create Category
  if (intent === 'create') {
    await createCategories(category);
    return null;
  }

  // Update Category
  if (intent === 'update') {
    const id = formData.get('id');
    await updateCategories(id, category);
    return null;
  }

  throw new Response('Invalid category action', { status: 400 });
}
