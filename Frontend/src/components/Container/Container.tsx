import { FontAwesome5, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, Icon, View } from "native-base";
import { IViewProps } from "native-base/lib/typescript/components/basic/View/types";
import React, { useEffect } from "react";
import { useAuth } from "../../hooks";
import { Row, RowBetween } from "../Row/Row";
import Touch from "../Touch/Touch";
import { Column } from "../Column/Column";
import { TextNormal } from "../Text/Text";
import Animation from "../Animation/Animation";
import { CoinAnimation } from "../../../src/assets/animations";
import Avatar from "../Avatar/Avatar";
import { UserScreenNavigationProp } from "@navigation/utils/types";
import { useGetCoinQuery } from "@state/api/auth";

interface ContainerProps extends IViewProps {
  children?: React.ReactNode;
  hasBack?:boolean;
  hasHeader?: boolean;
  isInSafeArea?: boolean | number;
  headerComponent?: React.ReactNode;
  hasAvatar?: boolean;
  headerLeftElement?: React.ReactNode;
  headerRightElement?: React.ReactNode;
  rightIconComponent?: React.ReactNode;
  bottomPadded?: boolean;
  headerTitle?: string;
  bodyPadded?: boolean;
}

const MainHeader = ({hasBack} : {hasBack?: boolean}) => {
  const { user } = useAuth();
  const {navigate, goBack} = useNavigation<UserScreenNavigationProp>()
  const {data} = useGetCoinQuery({userId: user._id})

 
  return (
    <Column>
      <RowBetween mx={2} borderRadius={5} height={12} px={4} my={2} bg="card.background">
        <Row space={2}>
         {hasBack && <Touch onPress={goBack}><Icon name='arrow-left' as={SimpleLineIcons} size='md' /></Touch>}
      
          <Row bg="light.500" borderRadius={15} pr={2} h={8}>
            <Animation size={40} name={CoinAnimation} />
            <TextNormal mt={1}>{data?.coin?.toLocaleString()}</TextNormal>
            <Icon
              ml="4"
              as={FontAwesome5}
              name="plus-square"
              size={15}
              color="#ffd862"
            />
          </Row> 
        </Row>
        
     
        <Row space={2}>
          <TextNormal>{user.username}</TextNormal>
          {/* @ts-ignore */}
          <Avatar onPress={() => navigate('Main' , {screen: 'Profile'})} uri={user?.avatar?.url} size="sm" />
        </Row>
      </RowBetween>
      <View>{/* BANNER */}</View>
    </Column>
  );
};

const Container: React.FC<ContainerProps> = ({
  children,
  hasHeader = true,
  bottomPadded = false,
  isInSafeArea = true,
  bodyPadded = true,
  hasBack = false,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <Box
      background="primary"
      pb={bottomPadded ? 20 : 0}
      safeArea={isInSafeArea}
      flex={1}
    >
      {user && hasHeader && <MainHeader hasBack={hasBack} />}

      <View flex={1} px={bodyPadded ? 2 : 0} {...rest}>
        {children}
      </View>
    </Box>
  );
};

export default Container;
