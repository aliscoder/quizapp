import { useCallback, useState } from "react";

const useModal = () => {
  const [isOpen, setOpen] = useState(false);
  const [modalData, setModalData] = useState();

  const closeModal = useCallback(() => {
    setOpen(false);
  }, [isOpen]);

  const openModal = useCallback(
    () => {
      // setModalData(data);
      setOpen(true);
    },
    [isOpen]
  );

  return { isOpen, openModal, closeModal, modalData };
};

export default useModal;
