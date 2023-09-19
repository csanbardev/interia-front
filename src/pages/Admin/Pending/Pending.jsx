import './Pending.css'
import { CategoryCard, PendingCategoryCard, ReportCard } from "../../../components/common/Cards/Cards"
import { useFetch } from "../../../hooks/useFetch"

const api = import.meta.env.VITE_API_URL


export function PendingReports({ token }) {

  const { data, loading, error, handleCancelRequest } = useFetch(`${api}/reports`, 'GET', undefined, token)

  return (
    <section id="pending-reports">
      {data?.map((item) => (
        <ReportCard key={item.id_tutorial} img={item.src_image} title={item.title} token={token} id_tutorial={item.id_tutorial} />
      ))}
    </section>
  )

}

export function PendingCategories({ token }) {
  const { data, loading, error, handleCancelRequest } = useFetch(`${api}/categories/pending`, 'GET', undefined, token)

  return (
    <section id='pending-categories'>
      {data?.map((item) => (
        <PendingCategoryCard api={api} title={item.name} key={item.id_category} id={item.id_category} token={token} />
      ))}
    </section>
  )

}