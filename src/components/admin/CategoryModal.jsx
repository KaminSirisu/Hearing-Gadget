import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router-dom';
import Modal, { useModal } from '../Modal';

// Inner form — consumes ModalContext to get onClose without prop drilling
function CategoryForm({ category }) {
    const { onClose } = useModal();
    const fetcher = useFetcher();

    const [ formData, setFormData ] = useState({ name: '', description: '' });

    useEffect(() => {
        if (category) {
            setFormData({ name: category.name || '', description: category.description || '' });
        } else {
            setFormData({ name: '', description: '' });
        }
    }, [category]);

    function handleChange(e) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleSubmit() {
        onClose();

        setFormData({ name: '', description: '' });
    }

    return (
        <fetcher.Form method="post" onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="intent" value={category ? 'update' : 'create'} />
            {category && <input type="hidden" name="id" value={category.id} />}

            {/* Category Name */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Category Name</label>
                <input
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter category name"
                />
            </div>

            {/* Description */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter category description"
                />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={fetcher.state !== 'idle'}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                    {fetcher.state === 'idle' ? 'Save' : 'Saving...'}
                </button>
            </div>
        </fetcher.Form>
    );
}

export default function CategoryModal({ isOpen, onClose, category }) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={category ? 'Edit Category' : 'Add Category'}
        >
            <CategoryForm category={category} />
        </Modal>
    );
}
