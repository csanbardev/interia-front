import { authenticateUser } from "../services/auth"

export const handleLogin = async (data) =>{
  try {
    const res = await authenticateUser(data) 

      
    
      return res

  } catch (error) {
    throw error
  }
}