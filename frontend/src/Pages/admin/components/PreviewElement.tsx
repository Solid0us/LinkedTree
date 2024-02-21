import { HasLinks } from "../Admin";

interface PreviewElementProps {
  linkList: HasLinks[];
}

const PreviewElement = ({ linkList }: PreviewElementProps) => {
  return (
    <div className="flex flex-col bg-black aspect-9/16 min-w-52 w-3/5 rounded-3xl items-center">
      {linkList.map((link) => {
        return (
          <div className="bg-white rounded-full w-full text-center p-3">
            {link.link}
          </div>
        );
      })}
    </div>
  );
};

export default PreviewElement;
