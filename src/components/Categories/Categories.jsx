import './Categories.css'
import { Suspense, useEffect, useState } from 'react';
import { Button, Center, Divider, Input, InputGroup, InputLeftElement, SimpleGrid, Stack } from '@chakra-ui/react';
import { CategoryCard } from "../common/Cards/Cards";
import { Error500 } from '../error-pages/Error500/Error500';
import { SearchIcon } from '@chakra-ui/icons';

const api = import.meta.env.VITE_API_URL


export function Categories() {

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("")
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFilter = (event) => {
    setFilter(event.target.value + '%')
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
     
    <div className='category-search'>

      <InputGroup marginBottom='52'>
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
        <Input id='category-search-input' type="text" placeholder='Busca tu categoría' name='filtro' onChange={handleFilter} width='50' />
      </InputGroup>
    </div>
     
      <SimpleGrid id='gridder'>
        <Suspense fallback={<div>Loading...</div>} >
          {data?.data.map((item) => (
            <CategoryCard title={item.cat_name} key={item.cat_id} img={`${api}/${item.cat_img}`} url={'tutorials/' + item.cat_id} />
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