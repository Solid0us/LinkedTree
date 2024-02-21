import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import NavBarSkeleton from "../../layouts/navbar/components/NavBarSkeleton";
import LinkedTreeLogo from "../../layouts/navbar/components/LinkedTreeLogo";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import linksServices from "../../Services/links.services";
import {
  DndContext,
  DragEndEvent,
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
} from "@dnd-kit/sortable";
import LinkElement from "./components/LinkElement";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CancelIcon from "@mui/icons-material/Cancel";
import AddLinkButton from "./components/AddLinkButton";
import AddLinkInputMenu from "./components/AddLinkInputMenu";
import PreviewElement from "./components/PreviewElement";

export interface HasLinks {
  id: number;
  link: string;
  list_order: number;
}

export interface LinkForm {
  link: string;
  list_order: number;
}

const Admin = () => {
  const auth = useAuth();
  const [addLinkMenu, setAddLinkMenu] = useState(false);
  const [mobileDrawer, setMobileDrawer] = useState(false);

  const [linkForm, setLinkForm] = useState<LinkForm>({
    link: "",
    list_order: 0,
  });
  const [linkList, setLinkList] = useState<HasLinks[]>([]);

  const handleAddLink = async () => {
    try {
      await linksServices.createLink(linkForm);
      setLinkForm({ link: "", list_order: 0 });
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
  return (
    <>
      <NavBarSkeleton>
        <LinkedTreeLogo />
      </NavBarSkeleton>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="flex flex-col bg-gray-100 w-full md:w-2/3 border-r pb-2 pl-5 pr-5 lg:pl-10 lg:pr-10 pt-28 items-center">
          <div className="w-11/12 lg:w-2/3 max-w-3xl">
            {addLinkMenu ? (
              <AddLinkInputMenu
                handleAddLink={handleAddLink}
                linkForm={linkForm}
                linkList={linkList}
                setAddLinkMenu={setAddLinkMenu}
                setLinkForm={setLinkForm}
              />
            ) : (
              <AddLinkButton
                addLinkMenu={addLinkMenu}
                setAddLinkMenu={setAddLinkMenu}
              />
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
          <PreviewElement linkList={linkList} />
        </div>
      </div>

      <div
        className={`fixed flex items-center justify-center bg-slate-300 md:hidden ${
          mobileDrawer
            ? "animate-drawer-up top-0 left-0 w-screen h-screen"
            : "animate-drawer-down top-0 left-0 w-screen h-screen"
        } `}
      >
        <PreviewElement linkList={linkList} />
      </div>

      <div className="fixed z-30 inset-x-0 bottom-0 w-full mb-3 visible md:hidden fill-mode items-center">
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
