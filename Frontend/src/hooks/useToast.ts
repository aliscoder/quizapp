import { useTheme } from "native-base";
import { Platform } from "react-native";
import { Position, showMessage } from "react-native-flash-message";

const useToast = () => {
  const theme = useTheme();

  const showError = (title: string, position: Position = "top") => {
    showMessage({
      message: title,
      position,
      style: {
        backgroundColor: theme.colors.danger,
        alignSelf: Platform.OS === "web" ? "center" : "auto",
        maxWidth: Platform.OS === "web" ? 600 : "auto",
        width: Platform.OS === "web" ? "100%" : "auto",
      },

      titleStyle: {
        fontFamily: "Yekan",
        color: theme.colors.white,
        fontSize: 16,
        marginTop: position === "top" ? 25 : 0,
      },
    });
    return;
  };

  const showNormalToast = (title: string, position: Position = "top", type: "error") => {
    showMessage({
      message: title,
      position,
      style: {
        backgroundColor: type === "error" ? "red" : "green",
        alignSelf: Platform.OS === "web" ? "center" : "auto",
        maxWidth: Platform.OS === "web" ? 600 : "auto",
        width: Platform.OS === "web" ? "100%" : "auto",
      },

      titleStyle: {
        fontFamily: "Yekan",
        color: "snow",
        fontSize: 16,
        marginTop: position === "top" ? 25 : 0,
      },
    });
    return;
  };

  const showSuccess = (title: string, position: Position = "top") => {
    showMessage({
      message: title,
      position,
      style: {
        backgroundColor: theme.colors.success,
        alignSelf: Platform.OS === "web" ? "center" : "auto",
        maxWidth: Platform.OS === "web" ? 600 : "auto",
        width: Platform.OS === "web" ? "100%" : "auto",
      },
      titleStyle: {
        fontFamily: "Yekan",
        color: theme.colors.white,
        fontSize: 16,
        marginTop: position === "top" ? 25 : 0,
      },
    });
    return;
  };

  return { showError, showSuccess, showNormalToast };
};

export default useToast;
