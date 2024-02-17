import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import NavBarSkeleton from "../../layouts/navbar/components/NavBarSkeleton";
import LinkedTreeLogo from "../../layouts/navbar/components/LinkedTreeLogo";
import AddIcon from "@mui/icons-material/Add";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import linksServices from "../../Services/links.services";

interface HasLinks {
  link: string;
}

const Admin = () => {
  const auth = useAuth();
  const [addLinkMenu, setAddLinkMenu] = useState(false);
  const [linkForm, setLinkForm] = useState({
    link: "",
  });
  const [linkList, setLinkList] = useState<HasLinks[]>([]);
  const handleAddLink = async () => {
    try {
      await linksServices.createLink(linkForm);
      setLinkForm({ link: "" });
      alert("success!");
      getAllLinks();
    } catch (err) {
      console.log(err);
    }
  };

  const getAllLinks = async () => {
    try {
      const links = (await linksServices.getLinksById<HasLinks[]>(auth.user.id))
        .data.data;
      setLinkList(links);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllLinks();
  }, []);

  return (
    <>
      <NavBarSkeleton>
        <LinkedTreeLogo />
      </NavBarSkeleton>
      <div className="flex flex-row h-screen">
        <div className="bg-gray-100 w-2/3 border-r pl-10 pr-10 pt-28">
          {addLinkMenu ? (
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
              <div className="flex flex-row gap-4 pl-10 pr-10">
                <input
                  className="bg-gray-200 rounded-md w-full caret-black p-2"
                  placeholder="URL"
                  value={linkForm.link}
                  onChange={(e) =>
                    setLinkForm((prevState) => ({
                      ...prevState,
                      link: e.target.value,
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
          ) : (
            <button
              className={`bg-purple-700 rounded-full w-full  text-white hover:bg-purple-800 ${
                addLinkMenu ? "invisible h-0" : "visible h-12"
              }`}
              onClick={() => setAddLinkMenu(true)}
            >
              <AddIcon type="" />
              Add link
            </button>
          )}
          <div className="flex flex-col items-center">
            {linkList.map((link) => {
              return (
                <div
                  className="w-full h-32 bg-white rounded-xl mt-3"
                  draggable={true}
                >
                  {link.link}
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-gray-100 w-1/3"></div>
      </div>
    </>
  );
};

export default Admin;
