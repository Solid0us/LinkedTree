import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface LinkElementProps {
  link: { link: string };
  id: number;
}

const LinkElement = ({ link, id }: LinkElementProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = { transition, transform: CSS.Transform.toString(transform) };
  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      key={id}
      className="w-full h-32 bg-white rounded-2xl mt-3 touch-none"
      draggable
    >
      {link.link}
    </div>
  );
};

export default LinkElement;
