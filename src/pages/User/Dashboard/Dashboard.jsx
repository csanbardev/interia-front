
import { DeleteIcon, InfoIcon, LinkIcon, WarningTwoIcon } from "@chakra-ui/icons"
import { Heading, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box, Badge, List, ListItem, ListIcon, Divider, Stack, Button, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react"
import { Link, useParams } from "react-router-dom"
import { useFetch } from "../../../hooks/useFetch"
import { useContext, useRef } from "react"
import { AuthContext } from "../../../services/AuthContext"
import { DashboardAccordion } from "../../../components/common/Accordion/Accordion"
import { FavTutorials } from "../../../components/Containers/Containers"
import { deleteReq } from "../../../services/http"

const api = import.meta.env.VITE_API_URL


export function Dashboard() {
  const { token, nick, logout } = useContext(AuthContext)
  const { userId } = useParams()
  const { data, loading, error, handleCancelRequest } = useFetch(`${api}/tutorials/user/${userId}`, 'GET', undefined, token)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const handleDeleteUser = async () => {
    try {
      await deleteReq(`${api}/users/${userId}`, undefined, token)
      logout()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="spaced" id="dashboard">
      <Heading as='h2' marginTop='10' >Hi, {nick}!</Heading>
      <Heading as='h3' size='md' >Tutoriales propuestos</Heading>
      <Accordion allowToggle>
        {data?.map((item) => (
          <DashboardAccordion key={item.id_tutorial} title={item.title} category={item.name} url={item.url} state={item.approved} id={item.id_tutorial} />
        ))}
      </Accordion>

      <Divider marginTop='4' orientation="horizontal" />
      <Heading as='h3' size='md' >Tutoriales favoritos</Heading>
      <FavTutorials userId={userId} />
      <Divider marginTop='4' orientation="horizontal" />

      <Heading as='h3' size='md' >Ajustes de la cuenta</Heading>
      <Stack marginTop='4' direction='row' spacing={4}>
        <Button onClick={onOpen} leftIcon={<WarningTwoIcon />} colorScheme="red" variant='solid'>Borrar cuenta</Button>
      </Stack>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                 Borrar cuenta
              </AlertDialogHeader>

              <AlertDialogBody>
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