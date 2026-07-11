import { Button, type ButtonProps } from "antd";
import { useNavigate } from "react-router-dom";

interface NavButtonProps extends ButtonProps {
  to: string;
}

export default ({ to, children, onClick, ...rest }: NavButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};
