import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

const StyledApp = styled.main`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">The Wild Oasis</Heading>
        <Heading as="h2">Check in and out</Heading>
        <Button
          onClick={() => {
            alert("check in");
          }}>
          Check in
        </Button>
        <Button
          onClick={() => {
            alert("check out");
          }}>
          Check out
        </Button>
        <Heading as="h3">Form</Heading>
        <Input placeholder="Number of guests" type="number"></Input>
        <Input placeholder="Number of guests" type="number"></Input>
      </StyledApp>
    </>
  );
}

export default App;
