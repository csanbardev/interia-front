import { ExternalLinkIcon, LinkIcon, SunIcon, WarningIcon, CheckIcon } from '@chakra-ui/icons';
import './Cards.css'
import { Button, Card, CardBody, CardFooter, Divider, Heading, Icon, Image, Stack, useToast, Text, ButtonGroup } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { handleLike } from '../../../handlers/handleLike';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../services/AuthContext';
import { getReq, postReq } from '../../../services/http';


export function CategoryCard({ img, url, title }) {
  return (
    <Link to={url} className="category-card">
      <Image className='category-img' src={img} alt="" borderRadius='lg' />
      <div className="over-content">
        <Heading className='category-title' as='h3' textAlign='center' color='wheat'>{title}</Heading>
      </div>
    </Link>
  )
}

export function TutorialCard({ img, title, url, id, length }) {
  const toast = useToast()

  const [liked, setLiked] = useState(false)
  const { token } = useContext(AuthContext)
  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    if (token) {

      getReq(`${api}/likes/${id}`, token)
        .then((res) => {
          setLiked(true)
        })
        .catch((error) => { })


    }
  }, [id, token])

  const onLike = async () => {
    try {
      if (!token) {
        toast({
          title: 'No puedes dar like',
          description: 'Inicia sesión primero',
          status: 'error',
          duration: 2000,
          isClosable: true
        })
      }
      else if (liked) {

        const res = handleLike(id, -1, token)
        setLiked(false)
      } else {
        const res = handleLike(id, 1, token)
        setLiked(true)
      }
    } catch (error) {

    }
  }

  const onReport = async () => {
    try {
      if (!token) {
        toast({
          title: 'No puedes reportar',
          description: 'Inicia sesión primero',
          status: 'error',
          duration: 2000,
          isClosable: true
        })
      }else{
        const res = await postReq(`${api}/reports/${id}`, undefined,token)
        toast({
          title: 'Reporte listo',
          description: 'Gracias por avisarnos',
          status: 'info',
          duration: 2000,
          isClosable: true
        })
      }
    } catch (error) {
      let errorMessage = ""

      if(error.message.includes('500')){
        errorMessage = "Algo ha ido muy mal"
      }else if(error.message.includes('401')){
        errorMessage = "No puedes reportar dos veces un tutorial"
      }
      toast({
        title: 'Ha habido un error',
        description: errorMessage,
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  }


  return(
    <article className='tuto-container'>
      <div className="tuto-img-container">
        <Image
          src={img}
          borderRadius='3xl'        
        />
      </div>
      <div className="tuto-body-container">
        <Heading as='h4' size='sm'>{title}</Heading>
        <Text as='sup'>{length}</Text>
        <div className="tuto-button-container">
          <button style={{color: liked ? 'var(--accent)': ''}} onClick={onLike}><CheckIcon /></button>
          <button onClick={onReport} ><WarningIcon /></button>
          <button><Link to={url} ><ExternalLinkIcon /></Link></button>
        </div>
      </div>
    </article>
  )
}

