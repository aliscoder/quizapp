import { Ionicons } from "@expo/vector-icons";
import { useModal } from "@hooks";
import { Box, Icon, Pressable } from "native-base";
import React, { useState } from "react";
import { Column } from "../Column/Column";
import Modal from "../Modal/Modal";
import { RowBetween } from "../Row/Row";
import { TextMuted, TextNormal } from "../Text/Text";
import Touch from "../Touch/Touch";

interface SelectProps<T> {
  data: any[];
  label?: string;
  onChange: (item: any) => void;
  extraTitle?: string;
  selectLabel?: string | undefined;
}

function Select<F>({ label, data, onChange, extraTitle, selectLabel }: SelectProps<F>) {
  const [selectedItem, setSelectedItem] = useState(data[0]);
  const { isOpen, closeModal, openModal } = useModal();

  const onSelect = (item: any) => {
    setSelectedItem(item);
    closeModal();
    onChange(item);
  };

  // useEffect(() => {
  //   closeModal();
  //   // onChange(selectedItem);
  // }, [selectedItem]);

  return (
    <>
      {label && <TextMuted mb={1}>{label}</TextMuted>}
      <Pressable onPress={openModal}>
        <Box
          borderWidth={0.4}
          backgroundColor="transparent"
          borderColor="border.muted"
          height="10"
          pr={2}
          borderRadius={5}
        >
          <RowBetween flex={1}>
            <Icon
              as={Ionicons}
              style={{
                marginLeft: 10,
              }}
              color="text.main"
              name="chevron-down-circle-outline"
              size="md"
            />

            <TextMuted>{selectLabel ? selectedItem[selectLabel] : selectedItem}</TextMuted>
          </RowBetween>
        </Box>
      </Pressable>

      <Modal isOpen={isOpen} isSheet onClose={closeModal}>
        <Column>
          {data.map((item, index) => (
            <Touch
              key={index}
              style={{
                marginTop: index === 0 ? 0 : 8,
                borderRadius: 5,
                backgroundColor: "gray.300",
                paddingVertical: 4,
                width: "90%",
                alignSelf: "center",
              }}
              onPress={() => onSelect(item)}
            >
              <TextNormal textAlign="center" p={2}>
                {`${selectLabel ? item[selectLabel] : item} ${extraTitle || ""}`}
              </TextNormal>
            </Touch>
          ))}
        </Column>
      </Modal>
    </>
  );
}
export default Select;
