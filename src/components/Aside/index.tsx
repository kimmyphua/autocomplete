import { Navbar, Button, Link } from "@nextui-org/react";

interface IAside {
 setIsDark: () => void;
 isDark: boolean;
}

const Aside: React.FC<IAside> = ({ setIsDark, isDark }) => {
 const collapseItems = ["Features", "Settings"];

 return (
  <>
   <Navbar isBordered variant="sticky">
    <Navbar.Brand
     css={{
      display: "flex",
      gap: "20px",
     }}>
     <Navbar.Toggle
      aria-label="toggle navigation"
      data-testid="aside-toggle-button"
     />
     Countries
    </Navbar.Brand>
    <Navbar.Collapse>
     {collapseItems.map((item, index) => (
      <Navbar.CollapseItem
       key={item}
       css={{
        textAlign: "center",
       }}>
       {item === "Settings" ? (
        <Button
         data-testid="theme-button"
         color="gradient"
         auto
         onPress={setIsDark}
         rounded
         bordered>
         {isDark ? "Light" : "Dark"} Theme
        </Button>
       ) : (
        <Link
         color="inherit"
         css={{
          minWidth: "100%",
         }}
         href="#">
         {item}
        </Link>
       )}
      </Navbar.CollapseItem>
     ))}
    </Navbar.Collapse>
   </Navbar>
  </>
 );
};
export default Aside;
