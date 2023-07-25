import { AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box, Badge, List, ListItem, ListIcon, Accordion, Button, AlertDialog } from "@chakra-ui/react"
import { LinkIcon, InfoIcon, DeleteIcon } from "@chakra-ui/icons"
import { Link, useNavigate } from "react-router-dom"
import { Suspense, useContext, useEffect, useTransition } from "react"
import { AuthContext } from "../../services/AuthContext"
import { useFetch } from "../../hooks/useFetch"
import { fetchData } from "../../utils/fetchData"
import { handleApprove } from "../../handlers/handleApprove"

export function DashboardAccordion({ title, state, url, category, id }) {
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
          </List>
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