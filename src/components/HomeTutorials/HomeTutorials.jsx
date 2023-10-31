import { useContext } from "react"
import { useFetch } from "../../hooks/useFetch"
import { AuthContext } from "../../services/AuthContext"
import { TutorialCard } from "../common/Cards/Cards"

const api = import.meta.env.VITE_API_URL


export function RecentTutorials() {
  const { token } = useContext(AuthContext)
  const { data } = useFetch(`${api}/tutorials/filter?order=recent`, 'GET', undefined, token)


  console.log(data)

  return (
    <section className="spaced">
      <h2>Tutoriales recientes</h2>
      <div className="tutorials-container">
      {data?.map((item) => (
          <TutorialCard key={item.id_tutorial} length={item.length} id={item.id_tutorial} img={item.src_image} title={item.title} author={item.author} likes={item.likes} url={item.url} date={item.published_date} />
        ))}
      </div>
    </section>
  )
}

export function LikestTutorials() {
  const { token } = useContext(AuthContext)
  const { data } = useFetch(`${api}/tutorials/filter?order=likest`, 'GET', undefined, token)


  console.log(data)

  return (
    <section className="spaced">
      <h2>Tutoriales más gustados</h2>
      <div className="tutorials-container">
      {data?.map((item) => (
          <TutorialCard key={item.id_tutorial} length={item.length} id={item.id_tutorial} img={item.src_image} title={item.title} author={item.author} likes={item.likes} url={item.url} date={item.published_date} />
        ))}
      </div>
    </section>
  )
}