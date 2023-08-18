const fixedInputClass =
  "block w-full px-3 py-2 my-5 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm";

export default function Input({ register, name, placeholder, type, ...rest }) {
  return (
    <div className="my-5">
      <input
        {...register(name, rest)}
        type={type}
        autocomplete="off"
        placeholder={placeholder}
        className={fixedInputClass}
        name={name}
      />
    </div>
  );
}
