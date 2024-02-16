import { useGetAuthUserQuery } from "@state/api/auth"
import useAuth from "./useAuth"

function useUpdatingUser() {
    const {user: initialUser} = useAuth()
    const {data, isLoading} = useGetAuthUserQuery({userId : initialUser._id})
  
    return isLoading ? initialUser : data?.user!
  }

  export default useUpdatingUser