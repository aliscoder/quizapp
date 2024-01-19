import React from "react";
import animations from "../../assets/animations";
import ListAnimation from "../ListAnimation/ListAnimation";

const ListEmpty = () => {
  return <ListAnimation full title="موردی یافت نشد" name={animations.listEmpty} />;
};

export default ListEmpty;
