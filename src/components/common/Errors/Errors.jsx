import { Alert, AlertIcon, Heading, Stack, Image, Center, Text } from "@chakra-ui/react";
import empty from '../../../assets/ilustrations/undraw_no_data_re_kwbl.svg'
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