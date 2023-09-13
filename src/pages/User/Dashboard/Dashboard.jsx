import './Dashboard.css'
import { CheckIcon, EditIcon, WarningTwoIcon } from "@chakra-ui/icons"
import { Heading, Accordion, Divider, Stack, Button, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Avatar, Center, useToast } from "@chakra-ui/react"
import { useForm } from 'react-hook-form'
import { Link, useParams } from "react-router-dom"
import { useFetch } from "../../../hooks/useFetch"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../../services/AuthContext"
import { DashboardAccordion } from "../../../components/common/Accordion/Accordion"
import { FavTutorials } from "../../../components/Containers/Containers"
import { deleteReq, patchAvatar } from "../../../services/http"
import { EmptyAdvert } from "../../../components/common/Errors/Errors"

const api = import.meta.env.VITE_API_URL


export function Dashboard() {
  const toast = useToast()
  const { register, formState: { errors }, handleSubmit } = useForm()
  const { token, nick, logout, avatar, id, refreshAvatar } = useContext(AuthContext)
  const { userId } = useParams()
  const { data, loading, error, handleCancelRequest } = useFetch(`${api}/tutorials/user/${userId}`, 'GET', undefined, token)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [saving, setSaving] = useState(false)
  const cancelRef = useRef()

  const handleDeleteUser = async () => {
    try {
      await deleteReq(`${api}/users/${userId}`, undefined, token)
      logout()
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = async (data) => {
    const formData = new Object()
    formData.avatar = data.avatar[0]

    try {
      const res = await patchAvatar(`${api}/userAvatar/${id}`, data, token)
      refreshAvatar(res.url)
      setSaving(false)

      toast({
        title: 'Avatar cambiado con éxito',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onSave = () => {
    setSaving(true)
  }

  return (
    <section className="spaced" id="dashboard">
      <Center marginTop='6' marginBottom={6}>
        <Avatar size='xl' src={api + '/' + avatar} />
        <label htmlFor="avatar-input" id='icon-container'>
          <EditIcon />
        </label>
        <form onSubmit={handleSubmit(onSubmit)} id='avatar-form' encType='multipart/form-data'>
          <input multiple={false} onClick={onSave} type="file" id='avatar-input' {...register('avatar', { required: true })} />
        </form>
        <Heading as='h2' >Hi, {nick}!</Heading>
      </Center>
      <Heading as='h3' size='md' >Tutoriales propuestos</Heading>
      <Accordion allowToggle>
        {data?.map((item) => (
          <DashboardAccordion key={item.id_tutorial} title={item.title} category={item.name} url={item.url} state={item.approved} id={item.id_tutorial} />
        ))}
      </Accordion>
      {!data ? <EmptyAdvert message='Nada por aquí...' /> : null}
      <Divider marginTop='4' orientation="horizontal" />

      <Heading as='h3' size='md' >Tutoriales favoritos</Heading>
      <FavTutorials userId={userId} />
      <Divider marginTop='4' orientation="horizontal" />

      <Heading as='h3' size='md' >Ajustes de la cuenta</Heading>
      <Stack marginTop='4' direction='row' spacing={4}>
        <Button onClick={onOpen} leftIcon={<WarningTwoIcon />} colorScheme="red" variant='solid'>Borrar cuenta</Button>
        <Button type='submit' form='avatar-form' isDisabled={!saving} leftIcon={<CheckIcon />} colorScheme='cyan' variant='solid'>Guardar cambios</Button>
      </Stack>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold' color='black'>
              Borrar cuenta
            </AlertDialogHeader>

            <AlertDialogBody color='black'>
              ¿Estás seguro de hacer esto?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>Cancelar</Button>
              <Button colorScheme="red" onClick={handleDeleteUser} ml={3} >Borrar</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </section>
  )
}