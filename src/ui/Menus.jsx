import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  position: relative; //Added later for scrolling menu list
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  /* position: fixed; */
  position: absolute;
  z-index: 1; //Added later for scrolling menu list
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  white-space: nowrap;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
const MenuContext = createContext();
function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const close = () => setOpenId("");
  const open = setOpenId;
  return (
    <MenuContext.Provider
      value={{ openId, close, open, position, setPosition }}>
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, open, close, setPosition } = useContext(MenuContext);
  function handleClick(e) {
    e.stopPropagation();
    // console.log("click>>>Toggle");
    const rect = e.target.closest("button").getBoundingClientRect();
    openId === "" || openId !== id ? open(id) : close();
    // console.log(rect);
    // setPosition({
    //   x: window.innerWidth - rect.width - rect.x,
    //   y: rect.y + rect.height + 8,
    // });
    setPosition({ x: -8, y: rect.height });
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ id, children }) {
  const { openId, position, close } = useContext(MenuContext);

  //if user clicks outside the List, then close the List
  const { ref } = useOutsideClick(close, false);
  // const { ref } = useOutsideClick(() => {
  //   console.log("Close from click Outside");
  //   close();
  // }, false);

  if (openId !== id) return null;
  return (
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>
  );
}
function Button({ icon, onClick, children }) {
  const { close } = useContext(MenuContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.Button = Button;
Menus.List = List;
export default Menus;
