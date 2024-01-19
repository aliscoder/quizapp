// import ListAnimation from "../../components/ListAnimation/ListAnimation";

export const LoadingAnimation = require("./loading.json");
export const EmptyListAnimation = require("./empty.json");
export const NetErrorAnimation = require("./netError.json");
export const CoinAnimation = require("./coin.json");
export const RankAnimation = require("./ranking.json");
export const Logo = require("../../../assets/photos/Logo.png");

// export const Loading = () => <ListAnimation name={LoadingAnimation} />;
// export const ListEmpty = () => <ListAnimation full title="لیست خالی است" name={EmptyListAnimation} />;
// export const ChatEmpty = () => <ListAnimation full title="گفتگویی ثبت نشده است" name={EmptyListAnimation} />;
// export const NetError = ({ onRefresh }: { onRefresh?: () => void }) => (
//   <ListAnimation onRefresh={onRefresh} full title="خطا در دریافت اطلاعات" name={NetErrorAnimation} />
// );

export default {
  loading: require("./loading.json"),
  netError: require("./netError.json"),
  listEmpty: require("./empty.json"),
};
