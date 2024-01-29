type props = {
  text: string;
  onClick: () => any;
};

const SubmitButton = ({ text, onClick }: props) => {
  return (
    <button
      onClick={onClick}
      className="bg-sky-700 text-white font-semibold text-lg rounded-md p-2 hover:bg-sky-500 transition-color duration-100"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
