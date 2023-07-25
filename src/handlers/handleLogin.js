import { authenticateUser } from "../services/auth"

export const handleLogin = async (data) =>{
  try {
    const res = await authenticateUser(data) 

    if(res){
      return res

    }else{
      throw new Error('Credenciales inválidas')
    }
  } catch (error) {
    throw error
  }
}