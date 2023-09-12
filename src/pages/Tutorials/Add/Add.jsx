import { Heading, Input, InputGroup, InputLeftElement, Select, Button, Center, Text, Alert, AlertIcon, useToast } from "@chakra-ui/react"
import { Suspense, useContext, useState } from "react"
import { AuthContext } from "../../../services/AuthContext"
import { useForm } from "react-hook-form"
import { LinkIcon } from "@chakra-ui/icons"
import { fetchData } from "../../../utils/fetchData"
import { postReq } from "../../../services/http"
import { Link } from "react-router-dom"
import './Add.css'
import { resetForm } from "../../../utils/formUtils"

const api = import.meta.env.VITE_API_URL
const apiData = fetchData(api + '/categories')


export function AddTutorial() {
  const { token } = useContext(AuthContext)
  const [error, setError] = useState('')
  const [ok, setOK] = useState(null)
  const { register, formState: { errors }, handleSubmit, reset } = useForm()
  const categories = apiData.read()
  const toast = useToast()
  

  const onSubmit = async (data) => {
    try{
      const res = await postReq(`${api}/tutorials`, data, token)
      resetForm(reset, setError)
      toast({
        title: 'Tutorial propuesto con éxito',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    }catch(error){
      let errorMessage = ""

      if(error.message.includes('500')){
        errorMessage = "Algo ha ido muy mal"
      }else if(error.message.includes('401')){
        errorMessage = "El enlace no es válido o no existe"
      }
      toast({
        title: 'Ha habido un error',
        description: errorMessage,
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  }


  return (
    <section className="spaced total-height" id="add-tutorial">
      <Heading as='h2' textAlign='center' marginTop='10'>Sugerir tutorial</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <LinkIcon color='gray.300' />
          </InputLeftElement>
          <Input size='lg' variant='outline' type="url" placeholder="YouTube url" {...register('url', {required: true})}/>
        </InputGroup>
        {errors.url?.type === 'required' && <Text fontSize='sm' margin={2} color='red'>Inserta una url de YouTube</Text>}
        <Suspense fallback={<div>Loading...</div>}>
          <Select size='lg' placeholder='Elige categoría' {...register('id_category')} required>
            {categories?.map((item) => (
              <option value={item.id_category} key={item.id_category}>{item.name}</option>
            ))}
          </Select>
        </Suspense>
        <Text mt='5' textAlign='center'>¿Falta una categoría? <Link to='/categories/add'>Sugerir</Link></Text>
        <Center>
          <Button variant='outline' colorScheme="teal" type="submit" marginTop='7' >Enviar</Button>
        </Center>
      </form>
    </section>
  )
}