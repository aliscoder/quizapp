import { Ionicons } from "@expo/vector-icons";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import { DEVICE } from "@utils";
import { Box, Center, FlatList, Icon } from "native-base";
import { IFlatListProps } from "native-base/lib/typescript/components/basic/FlatList";
import React from "react";
import { Platform, RefreshControl } from "react-native";
import {
  EmptyListAnimation,
  LoadingAnimation,
  NetErrorAnimation,
} from "../../assets/animations";
import Animation from "../Animation/Animation";
import { Column, ColumnCentered } from "../Column/Column";
import { TextNormal } from "../Text/Text";
import Touch from "../Touch/Touch";

type MergedProps<T> = IFlatListProps<T> & FlashListProps<T>;

interface Props<F> extends MergedProps<F> {
  hasSeperator?: boolean;
  isPerformant?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;
  onRefetch?: () => void;
  refreshData?: () => void;
  space?: number;
  data: F[] | undefined;
}

const Seperator = () => {
  return <Box h={0.3} my={4} bg="text.muted" />;
};

export const Empty = () => {
  return (
    <Center flex={1}>
      <Column space={1} alignItems="center">
        <Animation size={130} name={EmptyListAnimation} />
        <TextNormal>موردی یافت نشد</TextNormal>
      </Column>
    </Center>
  );
};

export const Loading = () => {
  return (
    <Center flex={1}>
      <Animation size={130} name={LoadingAnimation} />
    </Center>
  );
};

export const Error = ({ onRefresh }: { onRefresh?: () => void }) => {
  return (
    <Center flex={1}>
      <ColumnCentered space={2}>
        {Platform.OS !== "web" && (
          <Animation size={120} name={NetErrorAnimation} />
        )}
        <TextNormal>خطا در برقراری ارتباط</TextNormal>
        {onRefresh && (
          <Touch onPress={onRefresh}>
            <Icon as={Ionicons} name="refresh" color="text.dark" size="md" />
          </Touch>
        )}
      </ColumnCentered>
    </Center>
  );
};

function List<N>({
  hasSeperator = false,
  isPerformant = false,
  isLoading = false,
  isError = false,
  isFetching = false,
  onRefetch,
  refreshData,
  data,
  space,
  ...rest
}: Props<N>) {

  
  return data && data.length < 1 ? (
    <Empty />
  ) : isLoading ? (
    <Loading />
  ) : isError ? (
    <Error onRefresh={refreshData} />
  ) : Platform.OS === "web" ? (
    <FlatList
      ItemSeparatorComponent={hasSeperator ? Seperator : null}
      data={data}
      showsVerticalScrollIndicator={false}
      {...rest}
    />
  ) : isPerformant ? (
    <FlashList
      estimatedListSize={
        space
          ? { width: DEVICE.width - 8 * space, height: DEVICE.height }
          : undefined
      }
      refreshControl={
        onRefetch ? (
          <RefreshControl refreshing={isFetching} onRefresh={onRefetch} />
        ) : undefined
      }
      ItemSeparatorComponent={hasSeperator ? Seperator : null}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={data}
      {...rest}
    />
  ) : (
    <FlatList
      refreshControl={
        onRefetch ? (
          <RefreshControl refreshing={isFetching} onRefresh={onRefetch} />
        ) : undefined
      }
      ItemSeparatorComponent={hasSeperator ? Seperator : null}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={data}
      {...rest}
    />
  );
}

export default React.memo(List);
