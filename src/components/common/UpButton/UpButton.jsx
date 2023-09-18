import './UpButton.css'
import { ArrowUpIcon, Icon } from "@chakra-ui/icons";

export function UpButton(){

  const onScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return(
    <section className="spaced" id="up-button">
      <button onClick={onScrollUp}><ArrowUpIcon boxSize='7' /></button>
    </section>
  )
}