import './Errors.css'
import { Alert, AlertIcon, Center, Icon, Text } from "@chakra-ui/react";
import { GrAlert } from "react-icons/gr";

export function ErrorMessage({ message }) {

  return (
    <Alert marginTop='5' status="error">
      <AlertIcon />
      {message}
    </Alert>
  )
}

export function EmptyAdvert({ message }) {
  return (
    <Center>
      <Text as='samp' fontSize='sm' textAlign='center' margin={3} >{message}</Text>
    </Center>

  )
}

export function ValidationError({message}){
  return(
    <div className="validation-error-container">
      <Icon as={GrAlert} color='red' />
      <Text>{message}</Text>
    </div>
  )
}