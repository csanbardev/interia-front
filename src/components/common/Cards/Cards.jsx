import { ExternalLinkIcon, WarningIcon } from '@chakra-ui/icons';
import './Cards.css'
import { Button, Card, CardBody, CardFooter, Divider, Heading, Icon, Image, Stack, useToast } from "@chakra-ui/react";
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
        <Heading className='category-title' as='h3' size='md' textAlign='center' color='wheat'>{title}</Heading>
      </div>
    </Link>
  )
}

export function TutorialCard({ img, title, url, id }) {
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
        const res = postReq(`${api}/reports/${id}`, undefined,token)
        toast({
          title: 'Reporte listo',
          description: 'Gracias por avisarnos',
          status: 'info',
          duration: 2000,
          isClosable: true
        })
      }
    } catch (error) {

    }
  }

  return (
    <article>

      <Card maxW='md' variant='elevated'>
        <Image
          objectFit='cover'
          src={img}
          borderRadius='lg'
        />
        <CardBody>
          <Stack>
            <Heading as='h4' size='md'>{title}</Heading>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter
          justify='space-between'
          flexWrap='wrap'
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}>
          <Button onClick={onLike} flex='1' variant={liked ? 'solid' : 'ghost'} leftIcon={<Icon />}>Recomendar</Button>
          <Button onClick={onReport} flex='2' variant='ghost' leftIcon={<WarningIcon />}>Reportar</Button>
          <Button flex='2' variant='ghost' leftIcon={<ExternalLinkIcon />}><Link to={url}>Ver en YouTube</Link></Button>
        </CardFooter>
      </Card>
    </article>
  )
}

