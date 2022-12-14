import { useState } from "react";
import { Button, Card, Col, Input, Row, Text, User } from "@nextui-org/react";
import useAutocomplete from "../../hooks/useAutocomplete";
import classes from "../ui.module.css";
import { Country } from ".";

interface Props {
 data: Country[];
}

const AutocompleteList = ({ data }: Props) => {
 const [isFocused, setIsFocused] = useState(false);
 const [isHover, setIsHover] = useState(false);
 const [showMore, setShowMore] = useState(false);
 const {
  searchedValue,
  suggestions,
  selectedSuggestion,
  activeSuggestion,
  handleChange,
  handleKeyDown,
  handleClick,
 } = useAutocomplete(data);

 const generateList = () => {
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
        <Col
         css={{
          display: "flex",
          alignItems: "center",
         }}>
         <User src={flags.svg} name={""} squared />
         <div
          data-testid={name.common}
          dangerouslySetInnerHTML={{
           __html: name.common
            .toLowerCase()
            .replace(searchedValue.toLowerCase(), `<b>${searchedValue}</b>`),
          }}
         />
        </Col>
       </Row>
      ))}
     </>
    );
  }
 };

 return (
  <div className={classes.autocomplete}>
   <div className="search-input">
    <Input
     data-testid="search-input"
     bordered
     clearable
     labelPlaceholder="Search your Country"
     css={{ width: "100%", minWidth: "500px" }}
     onFocus={() => setIsFocused(true)}
     value={searchedValue}
     onChange={handleChange}
     onBlur={() => setIsFocused(false)}
     onKeyDown={handleKeyDown}
     color="secondary"
    />

    {(isFocused || isHover) && (
     <Card
      data-testid={"suggestion-list"}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      css={{ marginTop: "4px" }}>
      <Card.Body css={{ padding: "4px 0" }}>{generateList()}</Card.Body>
     </Card>
    )}
   </div>
   {selectedSuggestion && (
    <div className={classes.selectionContainer}>
     <Text
      size={20}
      weight="bold"
      css={{
       textGradient: "45deg, $blue600 -20%, $pink600 50%",
      }}>
      Country selected:
     </Text>
     <Text size={14}>
      <img
       src={selectedSuggestion.flags.svg}
       style={{ height: "40px", width: "80px", marginRight: "6px" }}
       alt="flag"
      />
      {selectedSuggestion.name.common}
     </Text>

     <Text size={14}>
      Official name: <u>{selectedSuggestion.name.official}</u>
     </Text>
     <Text size={14}>
      Region: <b>{selectedSuggestion.region}</b>
     </Text>
     <Text size={14}>
      Sub-Region: <b>{selectedSuggestion.subregion}</b>
     </Text>
     <Text size={14}>
      Capital: <b>{selectedSuggestion.capital.join(", ")}</b>
     </Text>
     <Text size={14}>
      Population: <b>{selectedSuggestion.population}</b>
     </Text>
     <Button
      data-testid="more-info-button"
      color="gradient"
      onPress={() => setShowMore(!showMore)}
      css={{ margin: "8px 0" }}
      rounded
      bordered>
      More Info
     </Button>

     {showMore && (
      <div className={classes.nativeNameList}>
       <Text
        weight="semibold"
        css={{
         textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}>
        Native name:
       </Text>
       {Object.entries(selectedSuggestion.name.nativeName).map(
        ([key, val]: any) => (
         <Text size={12}>
          {key} : {val.official}
         </Text>
        )
       )}

       <Text
        weight="semibold"
        css={{
         textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}>
        Currencies:
       </Text>
       {Object.entries(selectedSuggestion.currencies).map(([key, val]: any) => (
        <Text size={12}>
         {key} : {val.name} ({val.symbol})
        </Text>
       ))}
      </div>
     )}
    </div>
   )}
  </div>
 );
};

export default AutocompleteList;
