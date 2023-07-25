import { useFetch } from "../hooks/useFetch"
import { postReq } from "./http"

const api = import.meta.env.VITE_API_URL


export const authenticateUser = async (credentials) => {

  const res = await postReq(`${api}/login`, credentials)

  return res
  
}

export const createUser = async (newData) => {
  const res = await postReq(`${api}/signup`, newData)

  return res
}