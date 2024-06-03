import './Tutorials.css'

import { TutorialCard } from "../../components/common/Cards/Cards";
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { NoneTutorial } from '../../components/error-pages/Error404/Error404';
import { Error500 } from '../../components/error-pages/Error500/Error500'
import { useEffect, useState } from 'react';
import { Button, Center } from '@chakra-ui/react';
const api = import.meta.env.VITE_API_URL
import { TUTORIALS_EXAMPLE } from '../../data/data';

export function Tutorials() {
  const [currentPage, setCurrentPage] = useState(1)
  const { categoryId } = useParams()
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Define una función asincrónica para hacer la llamada a la API.
    async function fetchData() {
      try {
        setLoading(true);
        // const response = await fetch(`${api}/tutorials?category=${categoryId}&page=${currentPage}`);
        // if (!response.ok) {
        //   throw new Error(`HTTP Error! Status: ${response.status}`);
        // }
        // const jsonData = await response.json();
        setData(TUTORIALS_EXAMPLE);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    // Llama a fetchData() cuando cambie currentPage.
    fetchData();
  }, [currentPage]);

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
          <TutorialCard key={item.tut_id} length={item.tut_length} id={item.tut_id} img={item.tut_src_image} title={item.tut_title} author={item.tut_author} likes={item.tut_likes} url={item.tut_url} date={item.tut_published_date} />
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