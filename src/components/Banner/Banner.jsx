import './Banner.css'
import { Heading } from '@chakra-ui/react'

export function Banner(){
  return(
    <section id="banner">
      <Heading as='h1'>Tutoweb</Heading>
      <Heading as='h3'>Aprende algo nuevo cada día</Heading>
    </section>
  )
}