import './Tutorials.css'
import { TutorialCard } from "../../components/Cards/Cards";
import ex from '../../assets/banner-img.jpg'
import { fetchData } from '../../utils/fetchData';
import { useParams } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Error404 } from '../../components/error-pages/Error404/Error404';


const api = import.meta.env.VITE_API_URL


export function Tutorials() {
  const { categoryId } = useParams()
  const { data, loading, error, handleCancelRequest } = useFetch(
    `${api}/tutorials?category=${categoryId}`
  )

  if(error && error.includes('404')){
    return <Error404 />
  }


  return (
    <section className='spaced' id="tutorials">
      
      {loading && <h3>Loading...</h3>}
      {data?.map((item) => (
        <TutorialCard key={item.id_tutorial} id={item.id_tutorial} img={item.src_image} title={item.title} author={item.author} likes={item.likes} url={item.url} date={item.published_date} />
      ))}
    </section>
  )
}