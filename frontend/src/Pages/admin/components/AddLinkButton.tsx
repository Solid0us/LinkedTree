import AddIcon from "@mui/icons-material/Add";

interface AddLinkButtonProps {
  addLinkMenu: boolean;
  setAddLinkMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddLinkButton = ({ addLinkMenu, setAddLinkMenu }: AddLinkButtonProps) => {
  return (
    <button
      className={`bg-purple-700 rounded-full w-full  text-white hover:bg-purple-800 ${
        addLinkMenu ? "invisible h-0" : "visible h-12"
      }`}
      onClick={() => setAddLinkMenu(true)}
    >
      <AddIcon type="" />
      Add link
    </button>
  );
};

export default AddLinkButton;
