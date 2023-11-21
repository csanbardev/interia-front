import { useContext } from "react"
import { useFetch } from "../../hooks/useFetch"
import { AuthContext } from "../../services/AuthContext"
import { TutorialCard } from "../common/Cards/Cards"

const api = import.meta.env.VITE_API_URL


export function RecentTutorials() {
  const { token } = useContext(AuthContext)
  const { data } = useFetch(`${api}/tutorials/filter?order=recent`, 'GET', undefined, token)

  return (
    <section className="spaced">
      <h2>Tutoriales recientes</h2>
      <div className="tutorials-container">
      {data?.map((item) => (
          <TutorialCard key={item.tut_id} length={item.tut_length} id={item.tut_id} img={item.tut_src_image} title={item.tut_title} author={item.tut_author} likes={item.tut_likes} url={item.tut_url} date={item.tut_published_date} />
        ))}
      </div>
    </section>
  )
}

export function LikestTutorials() {
  const { token } = useContext(AuthContext)
  const { data } = useFetch(`${api}/tutorials/filter?order=likest`, 'GET', undefined, token)

  return (
    <section className="spaced">
      <h2>Tutoriales más gustados</h2>
      <div className="tutorials-container">
      {data?.map((item) => (
          <TutorialCard key={item.tut_id} length={item.tut_length} id={item.tut_id} img={item.tut_src_image} title={item.tut_title} author={item.tut_author} likes={item.tut_likes} url={item.tut_url} date={item.tut_published_date} />
        ))}
      </div>
    </section>
  )
}