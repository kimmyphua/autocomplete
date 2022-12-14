import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row } from "@nextui-org/react";
import AutocompleteList from "./AutocompleteList";
import classes from "../ui.module.css";

export type Country = {
 name: Name;
 flags: Flags;
 region: string;
 subregion: string;
 population: number;
 capital: string[];
 currencies: any;
};

type Name = {
 common: string;
 official: string;
 nativeName: any;
};

type Flags = {
 png: string;
 svg: string;
};

const Autocomplete: React.FC = () => {
 const [data, setData] = useState<Country[]>([]);

 useEffect(() => {
  axios.get(`https://restcountries.com/v3.1/all`).then(({ data }) => {
   setData(
    data.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common))
   );
  });
 }, []);

 return (
  <Container className={classes.container}>
   <div className={classes.main}>
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
