import { Center, HStack, Icon, VStack } from "native-base";
import React, { memo } from "react";
import { isEqual } from "lodash";
import { AntDesign } from "@expo/vector-icons";
import Button from "../Button/Button";
import Modal from "./Modal";
import { Column } from "../Column/Column";
import { Row } from "../Row/Row";
import { TextTitle } from "../Text/Text";
import { useModal } from "@hooks";

type Props = {
  onReject: () => void;
  onConfirm: () => void;
  title: string;
};
const ConfirmationModal: React.FC<Props> = ({ onReject, onConfirm, title }) => {
  const { isOpen, closeModal } = useModal();
  return (
    <Modal isOpen={isOpen} onClose={closeModal} isSheet>
      <Column space={4} px={6} alignItems="center" pt={3}>
        <TextTitle>{title}</TextTitle>

        <Row w="full" space={5} justifyContent="center">
          <Button size="1/2" title="لغو" onPress={onReject} scheme="danger" />
          <Button size="1/2" title="بله" onPress={onConfirm} scheme="success" />
        </Row>
      </Column>
    </Modal>
  );
};

export default memo(ConfirmationModal, isEqual);
