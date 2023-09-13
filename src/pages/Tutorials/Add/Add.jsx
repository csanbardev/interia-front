import { Heading } from "@chakra-ui/react"
import { Suspense } from "react"
import './Add.css'
import { AddTutoForm } from "../../../components/common/Forms/Forms"


export function AddTutorial() {

  return (
    <section className="spaced total-height" id="add-tutorial">
      <Heading as='h2' textAlign='center' marginTop='10'>Sugerir tutorial</Heading>
      <Suspense>
        <AddTutoForm />
      </Suspense>
    </section>
  )
}