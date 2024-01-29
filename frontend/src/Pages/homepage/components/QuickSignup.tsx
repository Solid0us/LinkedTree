import { useState } from "react";

const QuickSignup = () => {
  const [focus, setFocus] = useState(false);
  const handleFocus = () => {
    setFocus((prevState) => !prevState);
  };
  const handleSubmit = (e) => {
    console.log("submitted");
    e.preventDefault();
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
            ></input>
          </div>
        </div>
        <button
          className="bg-linktre-dark-pink rounded-full p-3 hover:bg-fuchsia-300"
          onClick={(e) => handleSubmit(e)}
        >
          Claim your Linkedtree
        </button>
      </div>
    </form>
  );
};

export default QuickSignup;
