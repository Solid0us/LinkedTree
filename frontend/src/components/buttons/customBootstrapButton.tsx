import Button from "react-bootstrap/esm/Button";

type props = {
  variant: string;
  button_text: string;
  onClick: () => any;
};

export const CustomBootstrapButton = ({
  variant,
  button_text,
  onClick,
}: props) => {
  return (
    <Button variant={variant} onClick={onClick}>
      {button_text}
    </Button>
  );
};
