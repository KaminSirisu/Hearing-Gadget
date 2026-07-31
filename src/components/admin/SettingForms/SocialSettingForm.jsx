import { ThumbsUp, MessageCircle, Camera } from 'lucide-react';

const fields = [
  { key: 'facebook_url', label: 'Facebook', icon: ThumbsUp, placeholder: 'https://www.facebook.com/hearinggadget' },
  { key: 'line_url', label: 'LINE Official', icon: MessageCircle, placeholder: '@hearinggadget' },
  { key: 'instagram_url', label: 'Instagram', icon: Camera, placeholder: 'https://www.instagram.com/?hearinggadget' },
];

const SocialSettingForm = ({ values, onChange, errors = {} }) => {
  return (
    <div className="mt-5 grid grid-cols-3 gap-6">
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
              className={`w-full rounded-md border p-1.5 text-sm ${errors[key] ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          {errors[key] && <span className="text-red-500 text-xs">{errors[key]}</span>}
        </div>
      ))}
    </div>
  )
}

export default SocialSettingForm
