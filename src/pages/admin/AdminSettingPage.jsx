import { useEffect, useState } from 'react'
import { useFetcher, useLoaderData, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RotateCcw, Save, Loader2 } from 'lucide-react';
import CompanySettingForm from '../../components/admin/SettingForms/CompanySettingForm.jsx';
import ContactSettingForm from '../../components/admin/SettingForms/ContactSettingForm.jsx';
import SocialSettingForm from '../../components/admin/SettingForms/SocialSettingForm.jsx';
import { getSettings, createDefaultSettings, updateSettings } from '../../services/settingsService.js';
import { getImageUrl, uploadCompanyLogo, deleteCompanyLogoFromStorage } from '../../services/storageService.js';

const EMPTY_VALUES = {
  company_name: '',
  company_description: '',
  phone: '',
  email: '',
  address: '',
  google_maps_url: '',
  facebook_url: '',
  line_url: '',
  instagram_url: '',
};

function toFormValues(settings) {
  return {
    company_name: settings.company_name || '',
    company_description: settings.company_description || '',
    phone: settings.phone || '',
    email: settings.email || '',
    address: settings.address || '',
    google_maps_url: settings.google_maps_url || '',
    facebook_url: settings.facebook_url || '',
    line_url: settings.line_url || '',
    instagram_url: settings.instagram_url || '',
  };
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{6,20}$/;
const OPTIONAL_URL_FIELDS = ['google_maps_url', 'facebook_url', 'line_url', 'instagram_url'];

function validate(values) {
  const errors = {};

  if (!values.company_name.trim()) errors.company_name = 'Company name is required';
  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!PHONE_REGEX.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number';
  }
  if (!values.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  for (const field of OPTIONAL_URL_FIELDS) {
    const value = values[field]?.trim();
    if (!value) continue;
    try {
      new URL(value);
    } catch {
      errors[field] = 'Enter a valid URL';
    }
  }

  return errors;
}

const AdminSettingPage = () => {
  const { settings } = useLoaderData();
  const fetcher = useFetcher();
  const navigation = useNavigation();

  const [values, setValues] = useState(toFormValues(settings));
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState(
    settings.logo_url ? getImageUrl(settings.logo_url, 'setting-assets') : null
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues(toFormValues(settings));
    setLogoFile(null);
    setLogoPreviewUrl(settings.logo_url ? getImageUrl(settings.logo_url, 'setting-assets') : null);
    setErrors({});
  }, [settings.updated_at]);

  const isSaving = fetcher.state !== 'idle';
  const isLoading = navigation.state === 'loading' && navigation.location?.pathname === '/admin/setting';

  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleLogoSelect(file) {
    setLogoFile(file);
    setLogoPreviewUrl(URL.createObjectURL(file));
  }

  function handleReset() {
    setValues(toFormValues(settings));
    setLogoFile(null);
    setLogoPreviewUrl(settings.logo_url ? getImageUrl(settings.logo_url, 'setting-assets') : null);
    setErrors({});
  }

  function handleSave() {
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please fix the highlighted fields before saving');
      return;
    }

    const formData = new FormData();
    formData.append('id', settings.id);
    formData.append('old_logo_url', settings.logo_url || '');
    Object.entries(values).forEach(([key, value]) => formData.append(key, value));
    if (logoFile) formData.append('logo', logoFile);

    fetcher.submit(formData, { method: 'post', encType: 'multipart/form-data' });
  }

  if (isLoading) {
    return (
      <section className="m-3">
        <div className="mb-2 h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-96 animate-pulse rounded bg-gray-200" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="mt-5 h-40 animate-pulse rounded-lg bg-white p-5 shadow-md">
            <div className="h-5 w-56 rounded bg-gray-200" />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="">

      <h1 className='font-bold text-3xl mb-2'>Settings</h1>
      <p className='text-gray-400 text-sm'>Manage your company's information displayed on the public website.</p>

      {/* Company Information */}
      <div className="mt-5 bg-white p-5 rounded-lg shadow-md">
        <h1 className="text-blue-500 text-lg font-medium">1. Company Information</h1>
        <CompanySettingForm
          values={values}
          onChange={handleChange}
          logoPreviewUrl={logoPreviewUrl}
          onLogoSelect={handleLogoSelect}
        />
      </div>
      {/* Contact Information */}
      <div className="mt-5 bg-white p-5 rounded-lg shadow-md">
        <h1 className="text-blue-500 text-lg font-medium">2. Contact Information</h1>
        <ContactSettingForm 
          values={values} 
          onChange={handleChange} 
          errors={errors} 
        />
      </div>
      {/* Social Media */}
      <div className="mt-5 bg-white p-5 rounded-lg shadow-md">
        <h1 className="text-blue-500 text-lg font-medium">3. Social Media</h1>
        <SocialSettingForm
          values={values}
          onChange={handleChange}
          errors={errors}
        />
      </div>

      {/* Footer */}
      <div className="mt-5 flex justify-end gap-3">
        <button
          type="button"
          onClick={handleReset}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RotateCcw size={16} />
          Reset
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

    </section>
  )
}

export const loaderSettings = async () => {
  let settings = await getSettings();

  if (!settings) {
    settings = await createDefaultSettings();
  }

  return { settings };
}

export const actionSettings = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const oldLogoPath = formData.get('old_logo_url');
  const logoFile = formData.get('logo');

  const settingsData = {
    company_name: formData.get('company_name'),
    company_description: formData.get('company_description'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    address: formData.get('address'),
    google_maps_url: formData.get('google_maps_url') || null,
    facebook_url: formData.get('facebook_url') || null,
    line_url: formData.get('line_url') || null,
    instagram_url: formData.get('instagram_url') || null,
  };

  try {
    let newLogoPath = null;

    if (logoFile) {
      newLogoPath = await uploadCompanyLogo(logoFile);
      settingsData.logo_url = newLogoPath;
    }

    await updateSettings(id, settingsData);

    if (newLogoPath && oldLogoPath) {
      await deleteCompanyLogoFromStorage(oldLogoPath);
    }

    toast.success('Settings updated successfully');
  } catch (error) {
    toast.error(error.message || 'Failed to update settings');
  }

  return null;
}

export default AdminSettingPage;
