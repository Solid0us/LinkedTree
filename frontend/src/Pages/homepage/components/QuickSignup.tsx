import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const QuickSignup = () => {
  const [focus, setFocus] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleFocus = () => {
    setFocus((prevState) => !prevState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = () => {
    navigate(`/signup?username=${username}`);
  };
  return (
    <form className="text-neutral-950">
      <div className="flex flex-wrap space-x-3">
        <div
          className={`bg-white rounded-lg max-w-64 h-14 flex relative items-center mt-2 mb-2  ${
            focus &&
            "outline outline-offset-4 outline-white transition-colors ease-in delay-700"
          }`}
        >
          <label className="pl-2">linkedtr.com/</label>
          <div className="overflow-hidden">
            <input
              className="focus:outline-none"
              placeholder="yourname"
              onFocus={handleFocus}
              onBlur={handleFocus}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
        </div>
        <button
          className="bg-linktre-dark-pink rounded-full p-3 hover:bg-fuchsia-300"
          onClick={handleSubmit}
        >
          Claim your Linkedtree
        </button>
      </div>
    </form>
  );
};

export default QuickSignup;
