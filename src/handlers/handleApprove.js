import { patchReq } from "../services/http"

const api = import.meta.env.VITE_API_URL


export const handleApprove = async (id, adminToken) => {
  try {
    const res = await patchReq(`${api}/tutorials/${id}`, {'approved':0}, adminToken)

    if(res){
      return res
    }else{
      throw new Error('Error al actualizar')
    }
  } catch (error) {
    throw error
    
  }
}