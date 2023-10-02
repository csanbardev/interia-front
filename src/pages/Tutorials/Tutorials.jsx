import './Tutorials.css'

import { TutorialCard } from "../../components/common/Cards/Cards";
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { NoneTutorial } from '../../components/error-pages/Error404/Error404';
import { Error500 } from '../../components/error-pages/Error500/Error500'
import { useEffect, useState } from 'react';
import { Button, Center } from '@chakra-ui/react';
const api = import.meta.env.VITE_API_URL


export function Tutorials() {
  const [currentPage, setCurrentPage] = useState(1)
  const { categoryId } = useParams()
  const { data, loading, error, handleCancelRequest } = useFetch(
    `${api}/tutorials?category=${categoryId}&page=${currentPage}`
  )

  if (error && error.includes('404')) {
    return <NoneTutorial />
  }

  if (error && error.includes('500')) {
    return <Error500 />
  }

  return (
    <section className='spaced total-height' id="tutorials">
      {loading && <h3>Loading...</h3>}
      <div className="tutorials-container">
        {data?.data.map((item) => (
          <TutorialCard key={item.id_tutorial} length={item.length} id={item.id_tutorial} img={item.src_image} title={item.title} author={item.author} likes={item.likes} url={item.url} date={item.published_date} />
        ))}

      </div>

      <div className='pagination-container'>
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          isDisabled={currentPage === 1}
        >Anterior</Button>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          isDisabled={currentPage === data?.pagination.totalPages}
        >Siguiente</Button>
      </div>
    </section>
  )
}