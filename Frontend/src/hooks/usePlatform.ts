import { useMemo } from "react";
import { Platform } from "react-native";

const usePlatform = () => {
  const isWeb = useMemo(() => {
    return Platform.OS === "web";
  }, [Platform.OS]);
  const isAndroid = useMemo(() => {
    return Platform.OS === "android";
  }, [Platform.OS]);
  const isIOS = useMemo(() => {
    return Platform.OS === "ios";
  }, [Platform.OS]);

  return { isWeb, isAndroid, isIOS };
};

export default usePlatform;
