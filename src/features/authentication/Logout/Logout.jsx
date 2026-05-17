import { HiArrowRightOnRectangle } from "react-icons/hi2";

import ButtonIcon from "@/components/ButtonIcon/ButtonIcon";
import SpinnerMini from "@/components/SpinnerMini/SpinnerMini";

import useLogout from "../useLogout";

const Logout = () => {
  const { isLoggingOut, logout } = useLogout();
  return (
    <ButtonIcon disabled={isLoggingOut} onClick={logout}>
      {isLoggingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
};

export default Logout;
