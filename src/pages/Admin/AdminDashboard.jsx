import { Accordion, ButtonGroup, Button, Heading, Spacer } from "@chakra-ui/react";
import { Suspense, useContext, useState } from "react";
import { PendingTutorials, PendingTutorialsFailed } from "../../components/common/Accordion/Accordion";
import { fetchData } from "../../utils/fetchData";
import { getReq } from "../../services/http";
import { AuthContext } from "../../services/AuthContext";
import { useFetch } from "../../hooks/useFetch";
import { PendingReports } from "./Pending/Pending";

const api = import.meta.env.VITE_API_URL




export function AdminDashboard() {
  const { nick, token } = useContext(AuthContext)
  const {data, loading, error, handleCancelRequest} = useFetch(`${api}/tutorials/pending`, 'GET', undefined, token)
  

  return (
    <section className="spaced" id="admin-dashboard">
      <Heading as='h2' marginTop='10' >Hi, admin {nick}!</Heading>
      <Heading as='h3' size='md' >Tutoriales pendientes</Heading>
      <Accordion allowToggle>
          {data?.map((item) => (
            <PendingTutorials key={item.id_tutorial} title={item.title} category={item.name} url={item.url} state={item.approved} id={item.id_tutorial}/>
          ))}
      </Accordion>
      <Spacer />
      <Heading as='h3' size='md' >Categorías pendientes</Heading>
      <Spacer />
      <Heading as='h3' size='md' >Reportes pendientes</Heading>

      <PendingReports token={token} />

    </section>
  )
}








export function AdminDashboardFailed() {

  const [showTutorials, setShowTutorials] = useState(false)
  const [data, setData] = useState(null)
  const handleShowTutorials = async () => {
    const pending = await getReq(`${api}/tutorials?category=1`)
    setData(pending)
    setShowTutorials(prevShowTutorials => !prevShowTutorials)
  }

  return (
    <section className="spaced" id="admin-dashboard">
      <Heading as='h2' marginTop='10' >Hi, admin !</Heading>
      <Heading as='h3' size='md' >Acciones</Heading>
      <ButtonGroup>
        <Button variant='outline' colorScheme="teal" onClick={handleShowTutorials} >Tutoriales pendientes</Button>
      </ButtonGroup>

      {showTutorials && <PendingTutorialsFailed data={data} />}




    </section>
  )
}