import { useEffect, useState } from "react";
import axios from "axios";

import { Button, Col, Container, Row, Text } from "@nextui-org/react";
import Autocomplete from "./Autocomplete";

import { Country } from "../../ts/Country.interface";

import classes from "./ui.module.css";
interface IAutocompleteWrapper {
 setIsDark: () => void;
 isDark: boolean;
}
const AutocompleteWrapper: React.FC<IAutocompleteWrapper> = ({
 setIsDark,
 isDark,
}) => {
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
     <Button color="gradient" auto onClick={setIsDark} rounded bordered>
      {" "}
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
      <Autocomplete data={data} />
     </Col>
    </Row>
   </div>
  </Container>
 );
};

export default AutocompleteWrapper;
