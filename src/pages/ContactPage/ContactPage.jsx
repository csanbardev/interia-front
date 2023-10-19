import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading } from "@chakra-ui/react";
import './ContactPage.css'
import { ContactForm } from "../../components/common/Forms/Forms";

export function ContactPage() {
  return (
    <section className="spaced" id="contact-page">
      <section id="contact-page-banner">
        <h2>Contacta con nosotros</h2>
        <Heading as='h4' fontSize='md' >Dinos en qué podemos ayudarte</Heading>
      </section>

      <section id="faq">
        <Heading as='h3' >Lo más preguntado</Heading>
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  ¿Hay tutoriales de otras plataformas, además de YouTube?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              No. Por ahora, no hay planes de añadir otras plataformas.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  ¿Pagáis algo por compartir los tutoriales?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Ni pagamos ni cobramos. Este es un sitio de libre sabiduría.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  He propuesto una cateogoría y todavía no la habéis aprobado. ¿Tarda mucho?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Vamos lo más rápido posible. Si es aceptable, pronto la tendrás disponible.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  ¿Puedo proponer un tutorial sin categoría?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Claro, ¡aunque no exactamente! Para eso, tenemos la categoría "Otros". Aunque es posible que, más adelante, lo movamos a una categoría existente.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </section>
      <section>
        <Heading as='h3' >Habla con nosotros</Heading>
        <ContactForm />
      </section>
    </section>
  )
}