import { Accordion, ButtonGroup, Button, Heading, Spacer } from "@chakra-ui/react";
import { Suspense, useContext, useEffect, useState } from "react";
import { PendingTutorials, PendingTutorialsFailed } from "../../components/common/Accordion/Accordion";
import { fetchData } from "../../utils/fetchData";
import { getReq } from "../../services/http";
import { AuthContext } from "../../services/AuthContext";
import { useFetch } from "../../hooks/useFetch";
import { PendingCategories, PendingReports } from "./Pending/Pending";
import { PendingCategoriesTable } from "../../components/common/Tables/Tables";

const api = import.meta.env.VITE_API_URL




export function AdminDashboard() {
  const { nick, token } = useContext(AuthContext)
  // const {data, loading, error, handleCancelRequest} = useFetch(`${api}/tutorials/pending`, 'GET', undefined, token)
  const [data, setData] = useState(null)
  const [change, setChange] = useState('')
  const handleDataChange = (newData) => {
    setChange(newData)
  }
  
  useEffect(() => {
    async function fetchData(){
      try {
        const response = await fetch(`${api}/tutorials/pending`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } })
        if (!response.ok && response.status != '404') {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error.message);
      }
    }
    // llama a fetchData cada que se actúa sobre un tutorial
    fetchData()
  }, [change])

  return (
    <section className="spaced" id="admin-dashboard">
      <Heading as='h2' marginTop='10' >Hi, admin {nick}!</Heading>
      <Heading as='h3' size='md' >Tutoriales pendientes</Heading>
      <Accordion allowToggle>
          {data?.map((item) => (
            <PendingTutorials key={item.tut_id} title={item.tut_title} category={item.tut_name} url={item.tut_url} state={item.tut_approved} id={item.tut_id} onChange={handleDataChange} />
          ))}
      </Accordion>
      <Spacer />
      <Heading as='h3' size='md' >Categorías pendientes</Heading>
      <PendingCategoriesTable token={token} api={api} />
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