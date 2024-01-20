import { Avatar, Column, RowBetween, TextNormal, TextTitle } from "@components";
import { useAuth } from "@hooks";
import { useRegisterUserInGameMutation } from "@state/api/game";
import { GameInterface } from "@types";
import { showError, showSuccess,delay } from "@utils";
import { isLoading } from "expo-font";
import { AlertDialog, Button } from "native-base";
import React, { useEffect, useRef } from "react";


type Props = {
  isOpen: boolean;
  toggleModal: () => void;
  game: GameInterface | undefined;
};

const RegisterModal = ({ isOpen, toggleModal, game }: Props) => {
  const cancelRef = useRef(null);
  const {user} = useAuth();

  const [registerUser, { isLoading, isError, isSuccess, error }] =
    useRegisterUserInGameMutation();


    useEffect(() => {
        if(isSuccess) {
            showSuccess('ثبت نام با موفقیت انجام شد')
            toggleModal()
        }

        if(isError) {
            //@ts-ignore
            showError(error.data.error)
            toggleModal()
        }
    }, [isSuccess , isError])

  return (
    game && (
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={toggleModal}
        _backdrop={{ backgroundColor: "primary", opacity: 0.8 }}
      >
        <AlertDialog.Content backgroundColor="modal">
          <AlertDialog.Header
            backgroundColor="modal"
            alignItems="center"
            textAlign="center"
            py={2}
            px={5}
          >
            <RowBetween w="full">
              <Avatar size="sm" uri={game.image} />
              <TextTitle>ثبت نام در مسابقه</TextTitle>
            </RowBetween>
          </AlertDialog.Header>
          <AlertDialog.Body backgroundColor="modal" alignItems="end">
            <Column space={2}>
              <RowBetween>
                <TextNormal color="warning">
                  {" "}
                  {game.type.toLocaleString()} سکه
                </TextNormal>
                <TextNormal>ورودی مسابقه </TextNormal>
              </RowBetween>
              <RowBetween>
                <TextNormal color="warning">
                  {game.players.length} نفر
                </TextNormal>
                <TextNormal>شرکت کنندگان تا این لحظه </TextNormal>
              </RowBetween>
              <RowBetween>
                <TextNormal color="warning">{`${Math.round(
                  game.players.length * game.type * 0.7
                ).toLocaleString()} سکه`}</TextNormal>
                <TextNormal>جایزه نفر اول</TextNormal>
              </RowBetween>
            </Column>
          </AlertDialog.Body>
          <AlertDialog.Footer backgroundColor="modal">
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                w="1/2"
                backgroundColor="warning"
                onPress={toggleModal}
                ref={cancelRef}
              >
                انصراف
              </Button>
              <Button
                isLoading={isLoading}
                w="1/2"
                backgroundColor="success"
                onPress={() => {
                  registerUser({ gameId: game._id, userId: user._id });
                }}
              >
                تایید
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    )
  );
};

export default RegisterModal;
