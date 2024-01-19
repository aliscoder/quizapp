import moment from "jalali-moment";

export default function unix(date?: any) {
  const timestamp = date ? moment(date).format("X") : moment().format("X");
  return Number(timestamp);
}
