import './AddCat.css'
import { useContext, useState } from "react"
import { AuthContext } from "../../../services/AuthContext"
import { useForm } from "react-hook-form"
import { postReq } from "../../../services/http"
import { Button, Center, Heading, Input, Alert, AlertIcon, useToast } from "@chakra-ui/react"
import { resetForm } from '../../../utils/formUtils'
const api = import.meta.env.VITE_API_URL


export function AddCat(){
  const {token} = useContext(AuthContext)
  const [error, setError] = useState(null)
  const {register, formState: {errors}, handleSubmit, reset} = useForm()
  const toast = useToast()


  const onSubmit = async(data) => {
    try {
      const res = await postReq(`${api}/categories`, data, token)
      resetForm(reset, setError)
      toast({
        title: 'Categoría propuesta con éxito',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'Ha habido un error',
        description: error.message,
        status: 'error',
        duration: 2000,
        isClosable: true
      })
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
    </section>
  )
}