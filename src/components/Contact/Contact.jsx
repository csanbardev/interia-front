import { ContactForm } from "../common/Forms/Forms";
import './Contact.css'

export function ContactArea(){
  return(
    <section id="contact-area">
      <h3 id="contact-area-title">¡Contacta con nosotros!</h3>
      <ContactForm />
    </section>
  )
}