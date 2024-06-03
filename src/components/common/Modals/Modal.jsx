import { Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react';

export function DemoModal({ text }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    onOpen();
  }, [onOpen]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant='white'>
      <ModalOverlay />
      <ModalContent bg="blue.800">
        <ModalHeader>DEMO</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {text}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='white' mr={3} onClick={onClose}>
            Cerrar
          </Button>
          <Button colorScheme='orange' variant='outline'><a href="https://www.linkedin.com/in/cristian-sanchez-barba/" >LinkedIn</a></Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}