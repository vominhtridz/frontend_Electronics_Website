import { ChangeEvent } from "react"
interface userData {
  email: string
  password: string
}
export interface SignInType {
  data: userData
  setData: (e: userData) => void
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void
  showPassword: boolean
  handleShowPwd: () => void
}
