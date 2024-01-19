import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

async function getItem(key: string) {
  return isWeb ? localStorage.getItem(key) : await getItemAsync(key);
}

async function setItem(key: string, value: string) {
  return isWeb ? localStorage.setItem(key, value) : await setItemAsync(key, value);
}

async function deleteItem(key: string) {
  return isWeb ? localStorage.removeItem(key) : await deleteItemAsync(key);
}

export { deleteItem, getItem, setItem };
