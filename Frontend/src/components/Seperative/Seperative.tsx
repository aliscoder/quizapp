import { Box } from "native-base";
import { Children } from "react";

const SeperatorLine = () => {
  return <Box h={0} w="full" my={4} backgroundColor="text.muted" />;
};

const Seperative = ({ children }: any) => {
  return Children.map(children, (child) => {
    return (
      <>
        {child}
        <SeperatorLine />
      </>
    );
  });
};

export default Seperative;
