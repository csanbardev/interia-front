import './AddCat.css'
import { Heading } from "@chakra-ui/react"
import { AddCatForm } from '../../common/Forms/Forms'


export function AddCat(){
  

  return (
    <section className="spaced total-height" id="add-cat">
      <Heading as='h2' textAlign='center' marginTop='10'>Sugerir categoría</Heading>
      <AddCatForm />
    </section>
  )
}