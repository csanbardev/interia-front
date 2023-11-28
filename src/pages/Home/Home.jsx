import { Divider } from "@chakra-ui/react";
import { Categories } from "../../components/Categories/Categories";
import { ContactArea } from "../../components/Contact/Contact";
import { Banner } from "../../components/Banner/Banner";
import { LikestTutorials, RecentTutorials } from "../../components/HomeTutorials/HomeTutorials";

export function Home(){
  return (
    <>
      <Banner />
      <Categories />
      <RecentTutorials />
      <LikestTutorials />
      <ContactArea />
    </>
  )
}