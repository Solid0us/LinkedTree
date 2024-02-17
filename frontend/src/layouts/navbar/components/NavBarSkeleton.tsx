interface NavBarSkeletonProps {
  children: JSX.Element;
}

const NavBarSkeleton = ({ children }: NavBarSkeletonProps) => {
  return (
    <nav className="flex justify-between items-center fixed top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full pl-4 pr-4 h-20 mx-auto w-[95%] z-200">
      {children}
    </nav>
  );
};
export default NavBarSkeleton;
