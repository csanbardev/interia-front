import { ExternalLinkIcon, LinkIcon, SunIcon, WarningIcon, CheckIcon } from '@chakra-ui/icons';
import './Cards.css'
import { Heading, Icon, Image, useToast, Text, Button, Center } from "@chakra-ui/react";
import { Link, json } from 'react-router-dom';
import { handleLike } from '../../../handlers/handleLike';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../services/AuthContext';
import { deleteReq, getReq, patchAvatar, postReq } from '../../../services/http';
import { useForm } from 'react-hook-form';


export function CategoryCard({ img, url, title }) {
  return (
    <Link to={url} className="category-card">
      <Image className='category-img' src={img} alt="" borderRadius='lg' />
      <div className="over-content">
        <Heading className='category-title' as='h3' textAlign='center'>{title}</Heading>
      </div>
    </Link>
  )
}

export function PendingCategoryCard({ title, token, id, api }) {
  const { register, formState: { errors }, handleSubmit } = useForm()


  const onSubmit = async (data) => {
    const formData = new Object()
    formData.avatar = data.avatar[0]

    try {
      const res = await patchAvatar(`${api}/categories/pending/${id}`, data, token)
    } catch (error) {
      console.log(error)

    }

  }

  return (
    <article className='category-card'>
      <p>{title}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input multiple={false} type='file' {...register('avatar', { required: true })} />
        <Button type='submit'>Enviar</Button>
      </form>
    </article>
  )
}

export function TutorialCard({ img, title, url, id, length }) {
  const toast = useToast()

  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(0)
  const { token } = useContext(AuthContext)
  const api = import.meta.env.VITE_API_URL

  // get likes when comp. load or state liked change 
  useEffect(() => {
    getReq(`${api}/likes/${id}`, token)
      .then((res) => {
        setLikes(res.cant_likes)
      })
      .catch((error) => { console.log(error) })
    if (token) {
      getReq(`${api}/likes/liked/${id}`, token)
        .then((res) => {
          res.total > 0 ? setLiked(true) : setLiked(false)
        })
        .catch((error) => { console.log(error) })
    }
  }, [liked])

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
      } else {
        const res = await postReq(`${api}/reports/${id}`, undefined, token)
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

      if (error.message.includes('500')) {
        errorMessage = "Algo ha ido muy mal"
      } else if (error.message.includes('401')) {
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


  return (
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
          <button style={{ color: liked ? 'var(--accent)' : '' }} onClick={onLike}><CheckIcon /></button>
          <button onClick={onReport} ><WarningIcon /></button>
          <button><Link to={url} ><ExternalLinkIcon /></Link></button>
        </div>
        <Center>
          <Text className='tuto-likes'>{likes || "Sin"} likes</Text>
        </Center>
      </div>
    </article>
  )
}

export function ReportCard({ id_tutorial, token, img, title, url }) {
  const api = import.meta.env.VITE_API_URL


  const onDelete = async () => {
    try {
      const res = await deleteReq(`${api}/tutorials/${id_tutorial}`, undefined, token)
      window.location.reload()
    } catch (error) {
      console.error("Error deleting tuto:", error);
    }
  }

  const onCancel = async () => {
    try {
      const res = await deleteReq(`${api}/reports/${id_tutorial}`, undefined, token)
      window.location.reload()
    } catch (error) {
      console.error("Error canceling report:", error);
    }
  }

  return (
    <article className='tuto-container'>
      <div className="tuto-img-container">
        <Image
          src={img}
          borderRadius='3xl'
        />
      </div>
      <div className="tuto-body-container">
        <Heading as='h4' size='sm'>{title}</Heading>
        <div className="report-button-container">
          <button onClick={onDelete}><WarningIcon /></button>
          <button onClick={onCancel}><ExternalLinkIcon /></button>
        </div>
      </div>
    </article>
  )

}