import {AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box, Badge, List, ListItem, ListIcon, Accordion, Button, useDisclosure } from "@chakra-ui/react"
import { LinkIcon, InfoIcon, DeleteIcon } from "@chakra-ui/icons"
import { Link, useNavigate } from "react-router-dom"
import { Suspense, useContext, useRef } from "react"
import { AuthContext } from "../../services/AuthContext"
import { useFetch } from "../../hooks/useFetch"
import { fetchData } from "../../utils/fetchData"
import { handleApprove } from "../../handlers/handleApprove"
import { deleteReq } from "../../services/http"

export function DashboardAccordion({ title, state, url, category, id }) {
  const {token} = useContext(AuthContext)
  const api = import.meta.env.VITE_API_URL
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const handleDeleteTuto = async () => {
    try {
      await deleteReq(`${api}/tutorials/${id}`, undefined, token)
      window.location.reload()
    } catch (error) {
      
    }
  }

  return (
    <article>
      <AccordionItem>
        <h4>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left' >
              {title}
              <Badge ml='1' colorScheme={state === '0' ? 'green' : 'yellow'} >{state === '0' ? 'Aprobado' : 'Pendiente'}</Badge>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h4>
        <AccordionPanel pb={4}>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={LinkIcon} />
              <a href={url}>YouTube</a>
            </ListItem>
            <ListItem>
              <ListIcon as={InfoIcon} />
              Categoría: {category}
            </ListItem>
            <ListItem>
              <ListIcon as={DeleteIcon} />
              <Button onClick={onOpen}>Eliminar</Button>
            </ListItem>
          </List>
          <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                 Borrar tutorial
              </AlertDialogHeader>

              <AlertDialogBody>
                ¿Estás seguro de hacer esto?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>Cancelar</Button>
                <Button colorScheme="red" onClick={handleDeleteTuto} ml={3} >Borrar</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
      </AlertDialog>
        </AccordionPanel>
      </AccordionItem>
    </article>
    
  )
}

export function PendingTutorials({ title, state, url, category, id }) {
  const { token } = useContext(AuthContext)

  const onApprove = async () => {
    try {
      const res = await handleApprove(id, token)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <article>
      <AccordionItem>
        <h4>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left' >
              {title}
              <Badge ml='1' colorScheme={state === '0' ? 'green' : 'yellow'} >{state === '0' ? 'Aprobado' : 'Pendiente'}</Badge>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h4>
        <AccordionPanel pb={4}>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={LinkIcon} />
              <a href={url}>YouTube</a>
            </ListItem>
            <ListItem>
              <ListIcon as={InfoIcon} />
              Categoría: {category}
            </ListItem>
            <ListItem>
              <ListIcon as={DeleteIcon} />
              <Link>Eliminar</Link>
            </ListItem>
            <ListItem>
              <ListIcon as={DeleteIcon} />
              <Link>Aprobar</Link>
            </ListItem>
            <ListItem>
              <Button onClick={onApprove}>Aprobar</Button>
            </ListItem>
          </List>
        </AccordionPanel>
      </AccordionItem>
    </article>
  )
}

export function PendingTutorialsFailed({ data }) {


  const { token } = useContext(AuthContext)
  // const { data, loading, error, handleCancelRequest } = useFetch(`${api}/tutorials/pending`, 'GET', undefined, token)



  return (
    <Accordion id="pending-tutorials">
      {data?.map((item) => {
        <DashboardAccordion key={item.id_tutorial} title={item.title} />
      })}
    </Accordion>
  )
}