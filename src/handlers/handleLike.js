import { patchReq } from "../services/http"

const api = import.meta.env.VITE_API_URL

export const handleLike = async (id, likes, token) => {
  try {
    const res = await patchReq(`${api}/tutorials/${id}/like`, {'likes':likes}, token)

    if(res){
      return res
    }else{
      throw new Error('Error al actualizar')
    }
  } catch (error) {
    throw error
    
  }
}