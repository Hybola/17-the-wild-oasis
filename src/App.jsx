import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;
const StyledApp = styled.main`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis</H1>
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
        <Input placeholder="Number of guests" type="number"></Input>
        <Input placeholder="Number of guests" type="number"></Input>
      </StyledApp>
    </>
  );
}

export default App;
