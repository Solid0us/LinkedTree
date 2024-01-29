type Props = {
  text: string;
};

const FigureLink = ({ text }: Props) => {
  return (
    <div className="bg-violet-300 w-full rounded-full text-center text-black font-semibold mt-1 mb-1 pt-2 pb-2">
      {text}
    </div>
  );
};

export default FigureLink;
