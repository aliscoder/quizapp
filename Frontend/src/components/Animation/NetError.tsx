import React from "react";
import ListAnimation from "../ListAnimation/ListAnimation";
import animations from "../../assets/animations";

interface Props {
  onRefresh?: () => void;
}
const NetError: React.FC<Props> = ({ onRefresh }) => {
  return (
    <ListAnimation
      onRefresh={onRefresh}
      full
      title="خطا در دریافت اطلاعات"
      name={animations.netError}
    />
  );
};

export default NetError;
