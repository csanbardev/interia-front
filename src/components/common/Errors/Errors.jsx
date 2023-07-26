import { Alert, AlertIcon, Stack } from "@chakra-ui/react";

export function ErrorMessage({message}){

  return (
    <Alert marginTop='5' status="error">
      <AlertIcon />
      {message}
    </Alert>
  )
}