type props = {
  text: string;
  onClick: () => any;
};

const SubmitButton = ({ text, onClick }: props) => {
  return (
    <button
      onClick={onClick}
      className="bg-purple-700 text-white font-semibold text-lg w-full rounded-full p-2 hover:bg-purple-800 transition-color duration-100"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
