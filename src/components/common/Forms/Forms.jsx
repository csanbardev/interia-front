import { useContext, useState } from 'react'
import { Input, InputGroup, InputLeftElement, Select, Button, Center, Text, Alert, AlertIcon, useToast, Textarea } from "@chakra-ui/react"
import { LinkIcon } from "@chakra-ui/icons"
import { Link } from 'react-router-dom'
import './Forms.css'
import { AuthContext } from '../../../services/AuthContext'
import { useForm } from 'react-hook-form'
import { postReq } from '../../../services/http'
import { resetForm } from '../../../utils/formUtils'
import { useFetch } from '../../../hooks/useFetch'
import { handleLogin } from '../../../handlers/handleLogin'
import { handleSignup } from '../../../handlers/handleSignup'
import { ValidationError } from '../Errors/Errors'
import { SQL_ERROR_MESSAGES } from '../../../constants/constants'
import { ALL_CATEGORIES } from '../../../data/data'
import { DemoModal } from '../Modals/Modal'
const api = import.meta.env.VITE_API_URL


export function AddTutoForm() {
  const { token } = useContext(AuthContext)
  const { register, formState: { errors }, handleSubmit, reset } = useForm()
  const toast = useToast()
  const DEMO_TEXT = "Prueba con enlaces de YouTube y que no lo sean. TODO se valida. Por supuesto, es una demo: dará error :c"
  //const { data, loading, error } = useFetch(api + '/categoriesFull')


  const onSubmit = async (data) => {
    try {
      const res = await postReq(`${api}/tutorials`, data, token)
      resetForm(reset)
      toast({
        title: 'Tutorial propuesto con éxito',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    } catch (error) {

      toast({
        title: 'Ha habido un error',
        description: SQL_ERROR_MESSAGES[error.message],
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <LinkIcon color='gray.300' />
        </InputLeftElement>
        <Input size='lg' type="url" placeholder="YouTube url" {...register('url', {
          required: 'Inserta una URL de YouTube',
          pattern: {
            value: /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)(\S*)?$/,
            message: 'URL de YouTube no válida'
          }
        })} />
      </InputGroup>

      {errors.url && <ValidationError message={errors.url?.message} />}

      <Select size='lg' placeholder='Elige categoría' {...register('id_category', {
        required: 'Indica una categoría'
      })} required>
        {ALL_CATEGORIES?.map((item) => (
          <option value={item.cat_id} key={item.cat_id}>{item.cat_name}</option>
        ))}
      </Select>
      {errors.id_category && <ValidationError message={errors.id_category?.message} />}

      <Text mt='5' textAlign='center'>¿Falta una categoría? <Link to='/categories/add'>Sugerir</Link></Text>
      <Center>
        <Button variant='solid' colorScheme="teal" type="submit" marginTop='7' >Enviar</Button>
      </Center>
      <DemoModal text={DEMO_TEXT} />
    </form>
  )
}

export function LoginForm() {
  const { token, updateAuth } = useContext(AuthContext)
  const { register, formState: { errors }, handleSubmit } = useForm()
  const toast = useToast()
  const DEMO_TEXT = "Prueba a introducir un usuario y una contraseña válida :)"
  const onSubmit = async (data) => {
    try {
      //const { token, id_user, nick, role, avatar } = await handleLogin(data)
      updateAuth("token", 2, "Usuario Demo", "user", "avatar")

    } catch (error) {
      toast({
        title: 'Nick o contraseña incorrecta',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input size='lg' placeholder="Nick" {...register('nick', {
        required: "Introduce tu nick"
      })} />
      {errors.nick && <ValidationError message={errors.nick.message} />}

      <Input size='lg' type="password" placeholder="Contraseña" {...register('password', {
        required: "Introduce tu contraseña"
      })} />
      {errors.password && <ValidationError message={errors.password.message} />}
      <Center>
        <Button variant='solid' colorScheme="teal" type="submit" marginTop='7' >Enviar</Button>
      </Center>
      <DemoModal text={DEMO_TEXT} />
    </form>
  )
}

export function SignupForm() {
  const { updateAuth } = useContext(AuthContext)
  const { register, formState: { errors }, handleSubmit } = useForm()
  const toast = useToast()

  const onSubmit = async (data) => {
    try {
      const { token, id_user, nick, role, avatar } = await handleSignup(data)
      updateAuth(token, id_user, nick, role, avatar)
    } catch (error) {
      //alert(error.code)
      toast({
        title: 'Error al registrarse',
        description: SQL_ERROR_MESSAGES[error.message],
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input size='lg' placeholder='Nick' {...register('nick', {
        required: "Introduce un nick",
        minLength: {
          value: 4,
          message: "Demasiado corto"
        },
        maxLength: {
          value: 16,
          message: "Demasiado largo"
        }
      })} />
      {errors.nick && <ValidationError message={errors.nick.message} />}
      <Input size='lg' type="password" placeholder="Contraseña" {...register('password', {
        required: "Introduce una contraseña",
        pattern: {
          value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{8,}$/,
          message: "Incluye al menos 1 letra mayúscula, 1 número y 1 carácter especial"
        },
        minLength: {
          value: 8,
          message: "Contraseña demasiado corta"
        }
      })} />
      {errors.password && <ValidationError message={errors.password.message} />}
      <Input size='lg' type="email" placeholder="email" {...register('email', {
        required: "Introduce un email"
      })} />
      {errors.email && <ValidationError message={errors.email.message} />}
      <Center>
        <Button variant='solid' colorScheme="teal" type="submit" marginTop='7' >Enviar</Button>
      </Center>
    </form>
  )
}

export function AddCatForm() {
  const { token } = useContext(AuthContext)
  const [error, setError] = useState(null)
  const { register, formState: { errors }, handleSubmit, reset } = useForm()
  const toast = useToast()
  const DEMO_TEXT = "Aquí puedes sugerir una categoría. ¡AH! Es una demo, dará error :C"


  const onSubmit = async (data) => {
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
        description: SQL_ERROR_MESSAGES[error.message],
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input size='lg' {...register('name', {
        required: "La categoría necesita un nombre",
        minLength: {
          value: 4,
          message: "Inserta al menos 4 caracteres"
        },
        maxLength: {
          value: 20,
          message: "Inserta máximo 20 caracteres"
        },
        pattern: {
          value: /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s\-]+$/,
          message: "No uses números o caracteres extraños",
        },
      })} placeholder="Nombre de la categoría" />
      {errors.name && <ValidationError message={errors.name.message} />}
      <Center>
        <Button variant='solid' colorScheme="teal" type="submit" marginTop='7'>Enviar</Button>
      </Center>
      <DemoModal text={DEMO_TEXT} />
    </form>
  )
}

export function ContactForm() {
  const [error, setError] = useState(null)
  const { register, formState: { errors }, handleSubmit, reset } = useForm()
  const toast = useToast()

  const onSubmit = async (data) => {
    try {
      const res = await postReq(`${api}/contact`, data)
      resetForm(reset, setError)
      toast({
        title: '¡Se ha enviado tu mensaje!',
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type='text' placeholder='Tu nombre' {...register('name', {
          required: "Indica tu nombre",
          minLength: {
            value: 4,
            message: "Inserta al menos 4 caracteres"
          },
          maxLength: {
            value: '20',
            message: "Inserta máximo 20 caracteres"
          },
          pattern: {
            value: /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s\-]+$/,
            message: "No uses números o caracteres extraños",
          }
        })} />
        {errors.name && <ValidationError message={errors.name.message} />}
        <Input type='email' placeholder='Tu Email' {...register('email', {
          required: "¡No te olvides del email!"
        })} />
        {errors.email && <ValidationError message={errors.email.message} />}
        <Input type='text' placeholder='Asunto' {...register('asunto', {
          required: "Indica el asunto",
          minLength: {
            value: 6,
            message: "Inserta al menos 6 caracteres"
          },
          maxLength: {
            value: 30,
            message: "Máximo 30 caracteres"
          }
        })} />
        {errors.asunto && <ValidationError message={errors.asunto.message} />}
        <Textarea placeholder='Mensaje' {...register('mensaje', {
          required: "Indica tu mensaje",
          minLength: {
            value: 20,
            message: "Inserta al menos 20 caracteres"
          },
          maxLength: {
            value: 300,
            message: "Máximo 300 caracteres"
          }
        })} />
        {errors.mensaje && <ValidationError message={errors.mensaje.message} />}
        <Center>
          <Button variant='solid' type="submit" marginTop='7'>Enviar</Button>
        </Center>
      </form>
    </>
  )
}