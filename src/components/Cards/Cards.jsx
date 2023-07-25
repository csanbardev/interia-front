import { ExternalLinkIcon, WarningIcon } from '@chakra-ui/icons';
import './Cards.css'
import { Button, Card, CardBody, CardFooter, Divider, Heading, Icon, Image, Stack } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { handleLike } from '../../handlers/handleLike';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../services/AuthContext';
import { useFetch } from '../../hooks/useFetch';
import { getReq } from '../../services/http';


export function CategoryCard({ img, url }) {
  return (
    <Link to={url} className="category-card">
      <Image src={img} alt="" borderRadius='lg' />
      <div className="over-content">
        <Heading as='h3' size='md' textAlign='center' color='wheat'>Química</Heading>
      </div>
    </Link>
  )
}

export function TutorialCard({ img, title, url, id }) {
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
      if (liked) {

        const res = handleLike(id, -1, token)
        setLiked(false)
      } else {
        const res = handleLike(id, 1, token)
        setLiked(true)
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
          <Button flex='2' variant='ghost' leftIcon={<WarningIcon />}>Reportar</Button>
          <Button flex='2' variant='ghost' leftIcon={<ExternalLinkIcon />}><Link to={url}>Ver en YouTube</Link></Button>
        </CardFooter>
      </Card>
    </article>
  )
}

