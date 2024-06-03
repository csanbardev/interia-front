import { useContext } from "react"
import { useFetch } from "../../hooks/useFetch"
import { AuthContext } from "../../services/AuthContext"
import { TutorialCard } from "../common/Cards/Cards"
import './HomeTutorials.css'
import { NoneHomeTutorial } from "../error-pages/Error404/Error404"
import { LIKEST_TUTORIALS, RECENT_TUTORIALS } from "../../data/data"
const api = import.meta.env.VITE_API_URL


export function RecentTutorials() {
  const { token } = useContext(AuthContext)
  //const { data, error } = useFetch(`${api}/tutorials/filter?order=recent`, 'GET', undefined, token)



  return (
    <section id="recent-tutorials" className="spaced">
      <h2>Tutoriales recientes</h2>
      
      <div className="tutorials-container">
        {RECENT_TUTORIALS?.map((item) => (
          <TutorialCard key={item.tut_id} length={item.tut_length} id={item.tut_id} img={item.tut_src_image} title={item.tut_title} author={item.tut_author} likes={item.tut_likes} url={item.tut_url} date={item.tut_published_date} />
        ))}
      </div>
    </section>
  )
}

export function LikestTutorials() {
  const { token } = useContext(AuthContext)
  // const { data, error } = useFetch(`${api}/tutorials/filter?order=likest`, 'GET', undefined, token)

  return (
    <section id="likest-tutorials" className="spaced">
      <h2>Tutoriales más gustados</h2>
      <div className="tutorials-container">
        {LIKEST_TUTORIALS?.map((item) => (
          <TutorialCard key={item.tut_id} length={item.tut_length} id={item.tut_id} img={item.tut_src_image} title={item.tut_title} author={item.tut_author} likes={item.tut_likes} url={item.tut_url} date={item.tut_published_date} />
        ))}
      </div>
    </section>
  )
}