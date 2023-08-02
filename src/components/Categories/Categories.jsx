import './Categories.css'
import { Suspense, useState } from 'react';
import { Heading, SimpleGrid } from '@chakra-ui/react';
import ex from '../../assets/ex-category.svg'
import { CategoryCard } from "../common/Cards/Cards";
import { fetchData } from '../../utils/fetchData';
import { useFetch } from '../../hooks/useFetch';

const api = import.meta.env.VITE_API_URL


export function Categories() {


  const { data, loading, error, handleCancelRequest } = useFetch(`${api}/categories`)

  if (error && error.includes('404')) {
    return <Error404 />
  }

  if (error && error.includes('500')) {
    return <Error500 />
  }


  return (
    <section id="categories" >
      <Heading as='h2' size='lg'>Categorías</Heading>
      <SimpleGrid id='gridder'>
        <Suspense fallback={<div>Loading...</div>} >
          {data?.map((item) => (
            <CategoryCard key={item.id_category} img={ex} url={'tutorials/' + item.id_category} />
          ))}
        </Suspense>
      </SimpleGrid>
    </section>
  )
}