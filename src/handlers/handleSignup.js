import { createUser } from "../services/auth";

export const handleSignup = async (data) => {
  try {
    const res = await createUser(data)

    if(res){
      return res
    }else{
      throw new Error('Error al registrarse')
    }
  } catch (error) {
    throw error
  }
}