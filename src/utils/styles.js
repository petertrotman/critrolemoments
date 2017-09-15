export const buttonHover = `
  box-shadow: 0px 4px 8px #AAA;
  transform: translateY(-2px);
  @media (hover) {
    box-shadow: none;
    transform: none;
  }

  :hover {
    box-shadow: 0px 4px 8px #AAA;
    transform: translateY(-2px);
  }

  :active {
    box-shadow: none;
    transform: translateY(0);
  }
`;
