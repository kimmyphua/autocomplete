import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Row, Text } from "@nextui-org/react";
import AutocompleteList from "./AutocompleteList";
import classes from "../ui.module.css";

export type Country = {
 name: Name;
 flags: Flags;
};

type Name = {
 common: string;
};

type Flags = {
 png: string;
 svg: string;
};
interface Props {
 data: Country[];
}

interface IAutocomplete {
 setIsDark: () => void;
 isDark: boolean;
}
const Autocomplete: React.FC<IAutocomplete> = ({ setIsDark, isDark }) => {
 const [data, setData] = useState<Country[]>([]);

 useEffect(() => {
  axios
   .get(`https://restcountries.com/v3.1/lang/eng`)
   .then(({ data }) => setData(data));
 }, []);

 return (
  <Container className={classes.container}>
   <div className={classes.aside}>
    <Text
     h4
     css={{
      textAlign: "start",
      textGradient: "45deg, $black -20%, $blue600 50%",
     }}>
     Settings:
    </Text>
    <Text
     h5
     css={{
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      gap: "5px",
     }}>
     <Button
      data-testid="theme-button"
      color="gradient"
      auto
      onPress={setIsDark}
      rounded
      bordered>
      {isDark ? "Light" : "Dark"} Theme
     </Button>
    </Text>
   </div>
   <div className={classes.main}>
    <Row>
     <Col>
      <Text
       h1
       css={{
        textAlign: "center",
        textGradient: "45deg, $blue600 -20%, $pink600 50%",
       }}>
       English-speaking countries:
      </Text>
     </Col>
    </Row>
    <Row>
     <Col className={classes.autocompleteContainer}>
      <AutocompleteList data={data} />
     </Col>
    </Row>
   </div>
  </Container>
 );
};

export default Autocomplete;
