// eslint-disable-next-line react/prop-types
export const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 mt-2">
    <input type="checkbox" checked={checked} onChange={onChange} />
    {label}
  </label>
);
