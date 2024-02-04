type GenericFormInputProps = {
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

const GenericFormInput = ({
  type,
  placeholder,
  setState,
}: GenericFormInputProps) => {
  return (
    <input
      className="outline outline-2 outline-slate-200 rounded-sm m-3 bg-gray-200
       w-full p-2 hover:outline hover:outline-gray-300 focus:outline focus:outline-black"
      type={type}
      onChange={(e) => setState(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default GenericFormInput;
