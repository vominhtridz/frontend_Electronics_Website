import { ChangeEvent } from "react"

export interface singupType {
  email: string
  password: string
  name: string
  password1: string
  image: string | any
}
export interface FormSignupType {
  image: string
  handleShowPwd: () => void
  handleShowConfirmPwd: () => void
  data: singupType
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void
  showConfirmPassword: boolean
  showPassword: boolean
}
