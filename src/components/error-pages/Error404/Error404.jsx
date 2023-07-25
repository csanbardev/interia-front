import { Button, Center, Heading } from "@chakra-ui/react";
import {  useNavigate } from "react-router-dom";


export function Error404() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }
  return (
    <section id="error-404">
        <Heading textAlign='center' marginTop='10' as='h3'>Baia, cuánto vacío</Heading>
      <Center>
        <Button onClick={handleBack}>Volver</Button>
      </Center>
    </section>
  )
}