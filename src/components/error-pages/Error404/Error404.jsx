import { Button, Center, Heading, Image, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import noTutorial from '../../../assets/ilustrations/no-tutorial.svg'
import error404 from '../../../assets/ilustrations/not-found.svg'
import './Error404.css'
export function NoneTutorial() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }
  return (
    <section className="spaced total-height" id="none-tutorial">
      <img src={noTutorial} alt="" />
      <Heading className="none-tutorial-title" textAlign='center' marginTop='10' as='h2'>Guau, cuánto vacío</Heading>
      <Text className="none-tutorial-description" textAlign='center'>¿Te gustaría llenarlo?</Text>
      <div style={{ display: 'grid', gap: '.5rem', justifyContent: 'center', marginTop: '1rem' }}>
        <Button><Link to='/tutorials/add' >Sugerir tutorial</Link></Button>
        <Text textAlign='center'>o</Text>
        <Button onClick={handleBack}>Volver</Button>
      </div>

    </section>
  )
}

export function Error404() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }

  return (
    <section className="spaced total-height" id="error-404">
      <img src={error404} />
      <Heading className="error-404-title" as='h2' textAlign='center' >¿Qué andas buscando?</Heading>
      <Center>
        <Button marginTop='13' onClick={handleBack} >Sácame de aquí</Button>
      </Center>
    </section>
  )
}