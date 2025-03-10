function Textarea({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
  placeholder,
}) {
  return (
    <div>
      <label className="text-lg font-medium">
        {label}{' '}
        <span className="text-red-500 text-sm">{errors?.[id]?.message}</span>
      </label>
      <div>
        <textarea
          id={id}
          type={type}
          autoComplete={id}
          placeholder={placeholder}
          disabled={disabled}
          {...register(id, { required: '* This field is required' })}
          className={`p-1 min-h-24 overflow-hidden resize-none rounded-md w-full text-gray-900 outline-none border-2 border-solid focus:border-2 focus:border-solid focus:border-orange-300 block form-input ${
            disabled ? 'bg-blue-100 text-gray-500 cursor-not-allowed' : ''
          }`}
          rows="1"
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />
      </div>
    </div>
  );
}

export default Textarea;
