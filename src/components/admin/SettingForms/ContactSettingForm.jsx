import { Phone, Mail, MapPin } from 'lucide-react';

const fields = [
  { key: 'phone', label: 'Phone Number', icon: Phone, placeholder: '+66 2 123 4567' },
  { key: 'email', label: 'Email Address', icon: Mail, placeholder: 'info@hearinggadget.com' },
  { key: 'address', label: 'Company Address', icon: MapPin, placeholder: '123 Health Care Road, Bangkok 10110, Thailand' },
  { key: 'google_maps_url', label: 'Google Maps URL', icon: MapPin, placeholder: 'https://maps.google.com/?q=Hearing+Gadget' },
];

const ContactSettingForm = ({ values, onChange, errors }) => {
  return (
    <div className="mt-5 grid grid-cols-2 gap-x-10 gap-y-4">
      {fields.map(({ key, label, icon: Icon, placeholder }) => (
        <div key={key} className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <Icon size={16} />
            </div>
            <input
              type="text"
              name={key}
              value={values[key] || ''}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-md border border-gray-300 p-1.5 text-sm"
            />
          </div>
          {errors?.[key] && <span className="pl-11 text-xs text-red-500">{errors[key]}</span>}
        </div>
      ))}
    </div>
  )
}

export default ContactSettingForm
