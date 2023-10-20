import { Divider } from "@chakra-ui/react";
import { Categories } from "../../components/Categories/Categories";
import { ContactArea } from "../../components/Contact/Contact";

export function Home(){
  return (
    <>
      <Categories />
      <Divider marginTop='100' />
      <ContactArea />
    </>
  )
}