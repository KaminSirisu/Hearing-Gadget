import { useRef } from 'react'
import { toast } from 'react-toastify';
import { ImagePlus, RefreshCw } from 'lucide-react';

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

const CompanySettingForm = ({ values, onChange, logoPreviewUrl, onLogoSelect }) => {
  const ImageInputRef = useRef(null);

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) {
        toast.error('Failed to fetch preview Image');
        return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error('Logo must be a PNG, JPG, JPEG, or WEBP image');
        e.target.value = '';
        return;
    }

    if (file.size > MAX_SIZE_BYTES) {
        toast.error('Logo image must be smaller than 5MB');
        e.target.value = '';
        return;
    }

    onLogoSelect(file);
    e.target.value = '';
  }

  return (
    <div className= "mt-5">
        <div className="flex flex-col gap-2">
            <h1>Logo</h1>
            {logoPreviewUrl &&  (
                <img
                    key={logoPreviewUrl}
                    src={logoPreviewUrl}
                    alt="Logo preview"
                    className="mt-3 h-28 w-28 rounded-lg border border-gray-200 object-cover"
                />
            )}
            <input
                ref={ImageInputRef}
                type="file"
                name="logo"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="hidden"
                onChange={handleImageChange}
            />
            <button
                type="button"
                onClick={() => ImageInputRef.current?.click()}
                className="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
            >
                {logoPreviewUrl ? <RefreshCw size={15} /> : <ImagePlus size={15} />}
                {logoPreviewUrl ? 'Update Logo' : 'Upload Logo'}
            </button>
            <span className="text-xs text-gray-400">Recommended size: 512 x 512px, PNG or JPG</span>
        </div>
        <div className='flex flex-col gap-2'>
            <div className=''>
                <label>Company Name</label>
                <input
                    type="text"
                    name="company_name"
                    className='rounded-md border-gray-300 border p-1 text-sm w-full'
                    value={values.company_name}
                    onChange={(e) => onChange('company_name', e.target.value)}
                    placeholder='Enter company name'
                />
            </div>
            <div className=''>
                <label>Company Description</label>
                <textarea
                    name="company_description"
                    className='rounded-md border-gray-300 border p-1 text-sm w-full'
                    value={values.company_description}
                    onChange={(e) => onChange('company_description', e.target.value)}
                    placeholder='Enter company description'
                />
            </div>
        </div>

    </div>
  )
}

export default CompanySettingForm
