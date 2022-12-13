import { SetStateAction, useState } from "react";
import { Card, Col, Input, Row, Text, User } from "@nextui-org/react";
import { Country } from "../../ts/Country.interface";
import useAutocomplete from "../../hooks/useAutocomplete";
import classes from "./ui.module.css";

export const generateList = (
 suggestions: any[],
 searchedValue: string | any[],
 data: Country[],
 activeSuggestion: number,
 handleClick: (arg0: string) => void,
 setIsHover: { (value: SetStateAction<boolean>): void; (arg0: boolean): void }
) => {
 switch (!!suggestions.length) {
  case false:
   if (!!searchedValue.length) {
    return (
     <Row className={classes.itemListNot}>
      <Col>
       <Text>Nothing to show :(</Text>
      </Col>
     </Row>
    );
   } else {
    return (
     <>
      {data.map(({ name, flags }: Country, index) => (
       <Row
        key={index}
        className={`${classes.itemList} ${
         index === activeSuggestion - 1 ? classes.activeItem : ""
        }`}
        onClick={() => {
         handleClick(name.common);
         setIsHover(false);
        }}>
        <Col>
         <User src={flags.svg} name={name.common} squared />
        </Col>
       </Row>
      ))}
     </>
    );
   }
  case true:
   return (
    <>
     {suggestions.map(({ name, flags }: Country, index) => (
      <Row
       key={index}
       className={`${classes.itemList} ${
        index === activeSuggestion - 1 ? classes.activeItem : ""
       }`}
       onClick={() => {
        handleClick(name.common);
        setIsHover(false);
       }}>
       <Col>
        <User src={flags.svg} name={name.common} squared />
       </Col>
      </Row>
     ))}
    </>
   );
 }
};

interface Props {
 data: Country[];
}

const Autocomplete = ({ data }: Props) => {
 const [isFocused, setIsFocused] = useState(false);
 const [isHover, setIsHover] = useState(false);
 const {
  searchedValue,
  suggestions,
  selectedSuggestion,
  activeSuggestion,
  handleChange,
  handleKeyDown,
  handleClick,
 } = useAutocomplete(data);

 return (
  <div className={classes.autocomplete}>
   <Input
    data-testid="search-input"
    bordered
    labelPlaceholder="Search your Country"
    size="xl"
    onFocus={() => setIsFocused(true)}
    value={searchedValue}
    onChange={handleChange}
    onBlur={() => setIsFocused(false)}
    onKeyDown={handleKeyDown}
    color="secondary"
   />

   {(isFocused || isHover) && (
    <Card
     onMouseEnter={() => setIsHover(true)}
     onMouseLeave={() => setIsHover(false)}
     css={{ marginTop: "0.5rem" }}>
     <Card.Body css={{ padding: "0" }}>
      {generateList(
       suggestions,
       searchedValue,
       data,
       activeSuggestion,
       handleClick,
       setIsHover
      )}
     </Card.Body>
    </Card>
   )}

   <Text size="$xs">Country selected: {selectedSuggestion}</Text>
  </div>
 );
};

export default Autocomplete;
