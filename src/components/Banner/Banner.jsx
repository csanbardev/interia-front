import { useEffect } from 'react';
import './Banner.css'
import { Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { DemoModal } from '../common/Modals/Modal';

export function Banner() {
  const DEMO_TEXT = "¡Bienvenido a Interia! Esta es una demo de la aplicación final. Algunas características están limitadas. Si quieres una demostración en vivo, no dudes en contactarme ;)"
  return (
    <section id="banner">
      <Heading as='h3'>Un lugar para aprender</Heading>
      <Heading as='h1'>INTERIA</Heading>
      <DemoModal text={ DEMO_TEXT} />
    </section>
  )
}