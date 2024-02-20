import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import NavBarSkeleton from "../../layouts/navbar/components/NavBarSkeleton";
import LinkedTreeLogo from "../../layouts/navbar/components/LinkedTreeLogo";
import AddIcon from "@mui/icons-material/Add";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import linksServices from "../../Services/links.services";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import LinkElement from "./components/LinkElement";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CancelIcon from "@mui/icons-material/Cancel";

interface HasLinks {
  id: number;
  link: string;
  list_order: number;
}

const Admin = () => {
  const auth = useAuth();
  const [addLinkMenu, setAddLinkMenu] = useState(false);
  const [mobileDrawer, setMobileDrawer] = useState(false);

  const [linkForm, setLinkForm] = useState({
    link: "",
  });
  const [linkList, setLinkList] = useState<HasLinks[]>([]);

  const handleAddLink = async () => {
    try {
      await linksServices.createLink(linkForm);
      setLinkForm({ link: "" });
      getAllLinks();
      setAddLinkMenu(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllLinks = async () => {
    try {
      const links = (await linksServices.getLinksById<HasLinks[]>(auth.user.id))
        .data.data;
      setLinkList(links.sort((a, b) => a.list_order - b.list_order));
    } catch (err) {
      console.log(err);
    }
  };

  const renumberOrder = (array: HasLinks[]) => {
    const arrayCopy = array;
    for (let i = 0; i < array.length; i++) {
      arrayCopy[i].list_order = i + 1;
    }
    return arrayCopy;
  };

  const getLinkPos = (id: UniqueIdentifier) => {
    return linkList.findIndex((link) => link.id === id);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    const originalPos = getLinkPos(active.id);
    const newPos = getLinkPos(over.id);
    const newArray = arrayMove(linkList, originalPos, newPos);
    // await linksServices.updateLink(reorderedArray);
    setLinkList(newArray);
  };

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  useEffect(() => {
    getAllLinks();
  }, []);
  console.log(linkList);
  return (
    <>
      <NavBarSkeleton>
        <LinkedTreeLogo />
      </NavBarSkeleton>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="flex flex-col bg-gray-100 w-full md:w-2/3 border-r pb-2 pl-5 pr-5 lg:pl-10 lg:pr-10 pt-28 items-center">
          <div className="w-11/12 lg:w-2/3 max-w-3xl">
            {addLinkMenu ? (
              <div
                className={`w-full h-64 rounded-xl animate-pop-in bg-gray-50`}
              >
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
            <div
              className={`flex flex-col items-center ${
                addLinkMenu && "blur-2xs"
              }`}
            >
              <DndContext
                onDragEnd={handleDragEnd}
                collisionDetection={closestCorners}
                sensors={sensors}
              >
                <SortableContext
                  items={linkList}
                  strategy={verticalListSortingStrategy}
                >
                  {linkList.map((link) => {
                    return (
                      <LinkElement link={link} id={link.id} key={link.id} />
                    );
                  })}
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 hidden md:w-1/3 md:flex md:flex-col md:justify-center md:items-center">
          <div className="flex flex-col bg-black aspect-9/16 min-w-52 w-3/5 rounded-3xl items-center">
            {linkList.map((link) => {
              return (
                <div className="bg-white rounded-full w-full text-center p-3">
                  {link.link}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="fixed z-30 inset-x-0 bottom-0 w-full mb-3 flex visible md:hidden ">
        <button
          onClick={() => setMobileDrawer((prevState) => !prevState)}
          className="bg-slate-200 rounded-full p-3 m-auto flex flex-row gap-x-1"
        >
          {mobileDrawer ? (
            <CancelIcon />
          ) : (
            <>
              <VisibilityIcon />
              Preview
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default Admin;
