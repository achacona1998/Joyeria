// eslint-disable-next-line react/prop-types
export const InputField = ({ label, name, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label className="block dark:text-gray-300">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={(e) =>
        onChange((prev) => ({ ...prev, [name]: e.target.value }))
      }
      placeholder={placeholder}
      className="w-full p-2 mt-1 border rounded-md dark:text-black"
    />
  </div>
);
