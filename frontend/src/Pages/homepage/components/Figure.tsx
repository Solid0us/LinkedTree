import FigureLink from "./FigureLink";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";

const Figure = () => {
  return (
    <figure>
      <div className=" bg-blue-300 rounded-3xl w-64 h-96 p-2 flex flex-col items-center">
        <AccountCircleSharpIcon className="text-white scale-300 mt-4 mb-5" />
        <FigureLink text="FaceBook" />
        <FigureLink text="X" />
        <FigureLink text="SnapChat" />
      </div>
    </figure>
  );
};

export default Figure;
