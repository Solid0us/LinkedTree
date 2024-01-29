type Props = {
  onClick: () => any;
};

const NavBarSignoutButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-slate-200 rounded-md p-2 font-semibold hover:bg-slate-400 hover:text-slate-100 transition-colors duration-100 ease-linear"
    >
      Logout
    </button>
  );
};

export default NavBarSignoutButton;
