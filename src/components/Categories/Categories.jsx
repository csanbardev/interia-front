import './Categories.css'
import { Suspense } from 'react';
import { Heading, SimpleGrid } from '@chakra-ui/react';
import ex from '../../assets/ex-category.svg'
import { CategoryCard } from "../Cards/Cards";
import { fetchData } from '../../utils/fetchData';

const api = import.meta.env.VITE_API_URL
const apiData = fetchData(api + '/categories')


export function Categories() {
  const data = apiData.read()

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