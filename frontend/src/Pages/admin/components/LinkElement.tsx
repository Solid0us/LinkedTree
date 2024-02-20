import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect } from "react";

interface LinkElementProps {
  link: { link: string; id: number; list_order: number };
  id: number;
}

const LinkElement = ({ link, id }: LinkElementProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.list_order, data: link });
  const style = { transition, transform: CSS.Transform.toString(transform) };
  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="w-full h-32 bg-white rounded-2xl mt-3 touch-none"
      draggable
    >
      {link.link}
    </div>
  );
};

export default LinkElement;
