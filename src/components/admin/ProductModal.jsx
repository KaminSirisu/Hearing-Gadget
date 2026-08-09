import { useEffect, useState, useRef } from 'react';
import { ImagePlus } from 'lucide-react';
import { useFetcher } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal, { useModal } from '../Modal';
import { getImageUrl } from '../../services/storageService';

// Inner form — consumes ModalContext to get onClose without prop drilling
function ProductForm({ product, categories }) {
    const { onClose } = useModal();
    const fetcher = useFetcher();

    const fileInputRef = useRef(null);

    const [ previewImages, setPreviewImages ] = useState([]);
    const [ formData, setFormData ] = useState({
        name: '',
        category_id: '',
        price: 0,
        stock: 0,
        description: '',
        is_active: true
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                category_id: product.category_id || '',
                price: product.price ?? 0,
                stock: product.stock ?? 0,
                description: product.description || '',
                is_active: product.is_active,
            });
            if (product.product_images?.length > 0) {
                setPreviewImages(
                    product.product_images.map(image => getImageUrl(image.image_path))
                );
            } else {
                setPreviewImages([]);
            }
        } else {
            setFormData({ 
                name: '', 
                category_id: '', 
                price: 0, 
                stock: 0, 
                description: '', 
                is_active: true 
            });
            setPreviewImages([]);
        }
        
    }, [product]);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    }

    function handleSubmit() {
        onClose();

        setFormData({
            name: '',
            category_id: '',
            price: 0,
            stock: 0,
            description: '',
            is_active: true
        });
        setPreviewImages([]);
    }

    function handleImageChange(e) {
        const files = Array.from(e.target.files);

        if (files.length === 0) {
            toast.error('Failed to fetch preview Image');
            return;
        };

        setPreviewImages(files.map((file) => URL.createObjectURL(file)));
    }

    const oldImagePaths = product?.product_images?.map((image) => image.image_path) || [];

    return (
        <fetcher.Form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="space-y-4 max-h-[75vh] overflow-y-auto px-1 pr-2"
        >
            <input type="hidden" name="intent" value={product ? 'update' : 'create'} />
            {product && <input type="hidden" name="id" value={product.id} />}
            {oldImagePaths.length > 0 && 
                oldImagePaths.map((imagePath) => (
                    <input 
                        key={imagePath}
                        type="hidden" 
                        name="old_image_paths" 
                        value={imagePath} 
                    />
                ))
            }

            {/* Product Name */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Product Name</label>
                <input
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                />
            </div>

            {/* Category */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                <select
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Price */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Price</label>
                <input
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                />
            </div>

            {/* Stock */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Stock</label>
                <input
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
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
                    placeholder="Enter product description"
                />
            </div>
            
            {/* is_active */}
            <div className='flex items-center gap-3'>
                <input
                    id="is_active"
                    type="checkbox"
                    name="is_active"
                    value="true"
                    checked={formData.is_active}
                    onChange={handleChange}
                />
                <input type="hidden" name="is_active" value="false" />
                <label htmlFor='is_active'>Active Product</label>
            </div>

            {/* Image Upload */}
            <div>
                <input
                    ref={fileInputRef}
                    type="file"
                    name="images"
                    accept="image/*"
                    className="hidden"
                    multiple
                    onChange={handleImageChange}
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
                >
                    <ImagePlus size={15} />
                    Choose Image
                </button>
                {previewImages.length > 0 &&  (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {previewImages.map((src) => (
                            <img
                                key={src}
                                src={src}
                                alt="Product preview"
                                className="mt-3 h-28 w-28 rounded-lg border border-gray-200 object-cover"
                            />
                        ))}
                    </div>
                )}
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

export default function ProductModal({ isOpen, onClose, product, categories }) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={product ? 'Edit Product' : 'Add Product'}
        >
            <ProductForm product={product} categories={categories} />
        </Modal>
    );
}
