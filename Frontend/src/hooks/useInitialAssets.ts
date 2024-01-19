import { useFonts } from "expo-font";

const useInitialAssets = () => {
  const [fontLoaded] = useFonts({
    Yekan: require("../../assets/fonts/Yekan.ttf"),
    YekanBold: require("../../assets/fonts/Yekan-Bold.ttf"),
    YekanExtraBold: require("../../assets/fonts/Yekan-ExtraBold.ttf"),
    YekanLight: require("../../assets/fonts/Yekan-Light.ttf"),
    YekanMedium: require("../../assets/fonts/Yekan-Medium.ttf"),
  });

  return { fontLoaded };
};

export default useInitialAssets;
