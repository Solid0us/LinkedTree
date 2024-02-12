type AnchorLinkProps = {
  href: string;
  text: string;
};

const AnchorLink = ({ href, text }: AnchorLinkProps) => {
  return (
    <a href={href} className="no-underline">
      <div className="hover:bg-white p-3 rounded-md ">
        <span className="text-black font-bold">{text}</span>
      </div>
    </a>
  );
};

export default AnchorLink;
