import { extendTheme } from "native-base";
import pallete from "./pallete";

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
  fonts: {
    heading: "Yekan",
    body: "Yekan",
    mono: "Yekan",
  },
  colors: pallete,
});

type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

export default theme;
