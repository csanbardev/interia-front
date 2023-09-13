import './Containers.css'
import { useContext } from "react"
import { AuthContext } from "../../services/AuthContext"
import { useFetch } from "../../hooks/useFetch"
import { TutorialCard } from "../common/Cards/Cards"
import { EmptyAdvert } from '../common/Errors/Errors'

const api = import.meta.env.VITE_API_URL



export function FavTutorials({userId}){
  const {token} = useContext(AuthContext)
  const {data, loading, error, handleCancelRequest} = useFetch(`${api}/tutorials/likes/${userId}`, 'GET', undefined, token)

  return(
    <section id="fav-tutorials">
      {data?.map((item) => (
        <p>{<TutorialCard img={item.src_image} title={item.title} url={item.url} id={item.id_tutorial} />}</p>
      ))}
      {error && error.includes('404') ? <EmptyAdvert message={"Nada por aquí..."} /> : null}
    </section>
  )
}