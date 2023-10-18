import './Categories.css'
import { Suspense } from 'react';
import { Divider, SimpleGrid } from '@chakra-ui/react';
import { CategoryCard } from "../common/Cards/Cards";
import { useFetch } from '../../hooks/useFetch';
import { ContactArea } from '../Contact/Contact';

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
    <section className='spaced total-height' id="categories" >
      <h2 id="categories-title">Un mundo por <span>aprender</span></h2>
      <SimpleGrid id='gridder'>
        <Suspense fallback={<div>Loading...</div>} >
          {data?.map((item) => (
            <CategoryCard title={item.name} key={item.id_category} img={`${api}/${item.category_img}`} url={'tutorials/' + item.id_category} />
          ))}
        </Suspense>
      </SimpleGrid>
      <Divider marginTop='100' />
      <ContactArea />
    </section>
  )
}