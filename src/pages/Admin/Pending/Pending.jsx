import './Pending.css'
import { CategoryCard, PendingCategoryCard, ReportCard } from "../../../components/common/Cards/Cards"
import { useFetch } from "../../../hooks/useFetch"
import { useEffect, useState } from 'react'

const api = import.meta.env.VITE_API_URL


export function PendingReports({ token }) {

  // const { data, loading, error, handleCancelRequest } = useFetch(`${api}/reports`, 'GET', undefined, token)
  const [data, setData] = useState(null)
  const [change, setChange] = useState('')

  const handleDataChange = (newChange) => {
    setChange(newChange)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${api}/reports`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } })
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error.message);
      }
    }
    // llama a fetchData cada que se actúa sobre un reporte
    fetchData()
  }, [change])

  return (
    <section id="pending-reports">
      {data?.map((item) => (
        <ReportCard key={item.tut_id} img={item.tut_src_image} title={item.tut_title} token={token} id_tutorial={item.tut_id} onChange={handleDataChange} />
      ))}
    </section>
  )

}

export function PendingCategories({ token }) {
  const { data, loading, error, handleCancelRequest } = useFetch(`${api}/categories/pending`, 'GET', undefined, token)

  return (
    <section id='pending-categories'>
      {data?.map((item) => (
        <PendingCategoryCard api={api} title={item.cat_name} key={item.cat_id} id={item.cat_id} token={token} />
      ))}
    </section>
  )

}