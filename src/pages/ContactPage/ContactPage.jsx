import { Heading } from "@chakra-ui/react";
import './ContactPage.css'
import { ContactForm } from "../../components/common/Forms/Forms";

export function ContactPage() {
  return (
    <section className="spaced" id="contact-page">
      <section id="contact-page-banner">
        <Heading as='h2' fontSize='5xl'>Contacta con nosotros</Heading>
        <Heading as='h4' fontSize='md' >Dinos en qué podemos ayudarte</Heading>
      </section>

      <section id="faq">
        <Heading as='h3' >Lo más preguntado</Heading>
      </section>
      <section>
      <Heading as='h3' >Habla con nosotros</Heading>
        <ContactForm />
      </section>
    </section>
  )
}