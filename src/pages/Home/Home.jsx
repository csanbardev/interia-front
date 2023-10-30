import { Divider } from "@chakra-ui/react";
import { Categories } from "../../components/Categories/Categories";
import { ContactArea } from "../../components/Contact/Contact";
import { Banner } from "../../components/Banner/Banner";

export function Home(){
  return (
    <>
      <Banner />
      <Categories />
      <Divider marginTop='100' />
      <ContactArea />
    </>
  )
}