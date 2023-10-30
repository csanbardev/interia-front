import './Categories.css'
import { Suspense, useEffect, useState } from 'react';
import { Button, Divider, Input, SimpleGrid } from '@chakra-ui/react';
import { CategoryCard } from "../common/Cards/Cards";
import { Error500 } from '../error-pages/Error500/Error500';

const api = import.meta.env.VITE_API_URL


export function Categories() {

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("")
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFilter = (event) => {
    setFilter(event.target.value+'%')
  }

  useEffect(() => {
    // Define una función asincrónica para hacer la llamada a la API.
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`${api}/categories?page=${currentPage}&name=${filter}`);
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    // Llama a fetchData() cuando cambie currentPage.
    fetchData();
  }, [currentPage, filter]);


  if (error && error.includes('404')) {
    return <Error404 />
  }

  if (error && error.includes('500')) {
    return <Error500 />
  }


  return (
    <section className='spaced' id="categories" >
      <h2 id="categories-title">Un mundo por <span>aprender</span></h2>
      <Input type="text" placeholder='Busca tu categoría' name='filtro' onChange={handleFilter} />
      <SimpleGrid id='gridder'>
        <Suspense fallback={<div>Loading...</div>} >
          {data?.data.map((item) => (
            <CategoryCard title={item.name} key={item.id_category} img={`${api}/${item.category_img}`} url={'tutorials/' + item.id_category} />
          ))}
        </Suspense>
      </SimpleGrid>
      <div className="pagination-container">
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