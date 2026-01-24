import Menu from "@src/assets/icons/Menu";
import MainButton from "@src/components/general/Button";
import FiltersDrawer from "./FiltersDrawer";
import { useState } from "react";

const FiltersLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <MainButton title="Filters" startIcon={<Menu />} onClick={toggleDrawer} />
      <FiltersDrawer open={isOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default FiltersLayout;
