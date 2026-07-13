import { Button, type ButtonProps } from "antd";
import { useNavigate, type To } from "react-router-dom";

interface NavButtonProps extends ButtonProps {
  to: To | number;
}

export default ({ to, children, onClick, ...rest }: NavButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        // костыль чтобы ts не ругался на no matching overload
        if (typeof to === "number") {
          navigate(to);
        } else {
          navigate(to);
        }
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};
