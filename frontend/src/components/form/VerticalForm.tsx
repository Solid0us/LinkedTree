type Props = {
  children: React.ReactNode;
};
const VerticalForm = ({ children }: Props) => {
  return (
    <div className="flex flex-col text-center items-center mr-auto ml-auto mt-10 p-2 max-w-xl">
      {children}
    </div>
  );
};

export default VerticalForm;
