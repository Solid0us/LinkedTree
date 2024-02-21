import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import { HasLinks, LinkForm } from "../Admin";

interface AddLinkInputMenuProps {
  setAddLinkMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setLinkForm: React.Dispatch<
    React.SetStateAction<{
      link: string;
    }>
  >;
  linkForm: LinkForm;
  linkList: HasLinks[];
  handleAddLink: () => void;
}

const AddLinkInputMenu = ({
  setAddLinkMenu,
  setLinkForm,
  linkForm,
  linkList,
  handleAddLink,
}: AddLinkInputMenuProps) => {
  return (
    <div className={`w-full h-64 rounded-xl animate-pop-in bg-gray-50`}>
      <div className="flex justify-end p-1">
        <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200">
          <CloseTwoToneIcon
            onClick={() => setAddLinkMenu(false)}
            className="cursor-pointer "
            fontSize="small"
          />
        </div>
      </div>
      <h2 className="font-bold">Enter URL</h2>
      <div className="flex flex-row gap-4 pl-5 pr-5">
        <input
          className="bg-gray-200 rounded-md w-full caret-black p-2"
          placeholder="URL"
          value={linkForm.link}
          onChange={(e) =>
            setLinkForm((prevState) => ({
              ...prevState,
              link: e.target.value,
              list_order: linkList.length + 1,
            }))
          }
        />
        <button
          className=" bg-gray-300 w-20 h-14 rounded-full font-bold"
          onClick={handleAddLink}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddLinkInputMenu;
