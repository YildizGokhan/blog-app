
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchFail, fetchStart, loginSuccess, registerSuccess } from '../features/authSlice'
import useAxios from "./useAxios"
import { toastErrorNotify, toastSuccessNotify} from "../helper/ToastNotify"



const useAuthCalls = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { axiosPublic } = useAxios()

  const login = async (userInfo) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosPublic.post("/auth/login", userInfo)
      dispatch(loginSuccess(data))
      toastSuccessNotify("Login işlemi başarılı.")
      navigate("/")
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify("Login işlemi başarısız oldu.")
    }
  }

  const register = async (userInfo) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosPublic.post("/users", userInfo)
      dispatch(registerSuccess(data))
      toastSuccessNotify("Register işlemi başarılı.")
      navigate("/")
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify("Register işlemi başarısız oldu.")
    }
  }
  return { login, register }
}
export default useAuthCalls