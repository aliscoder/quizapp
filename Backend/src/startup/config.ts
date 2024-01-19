import { PRIVATE_KEY } from "../data";

export default () => {
  if (!PRIVATE_KEY) {
    throw new Error("privateKey not provided");
  }
};
