import { Button, Center, Heading } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

export function Error505(){
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return(
    <section id="error-500">
      <Heading textAlign='center' marginTop='10' as='h3'>Ups, algo se ha roto</Heading>
      <Center>
        <Button onClick={handleBack} >Sácame de aquí</Button>
      </Center>
    </section>
  )
}