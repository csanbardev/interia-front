import './AddCat.css'
import { useContext, useState } from "react"
import { AuthContext } from "../../../services/AuthContext"
import { useForm } from "react-hook-form"
import { postReq } from "../../../services/http"
import { Button, Center, Heading, Input, Alert, AlertIcon } from "@chakra-ui/react"

const api = import.meta.env.VITE_API_URL


export function AddCat(){
  const {token} = useContext(AuthContext)
  const [error, setError] = useState(null)
  const [ok, setOk] = useState(null)
  const {register, formState: {errors}, handleSubmit} = useForm()
  
  const onSubmit = async(data) => {
    try {
      const res = await postReq(`${api}/categories`, data, token)
      setOk("Categoría propuesta con éxito")
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <section className="spaced total-height" id="add-cat">
      <Heading as='h2' textAlign='center' marginTop='10'>Sugerir categoría</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input size='lg' {...register('name', {required:true})} placeholder="Nombre de la categoría"/>
        <Center>
          <Button variant='outline' colorScheme="teal" type="submit" marginTop='7'>Enviar</Button>
        </Center>
      </form>
      {error && <p>{error}</p>}
      {ok && 
        <Alert status="success" variant='subtle'>
          <AlertIcon />
          {ok}
        </Alert>
      }
    </section>
  )
}