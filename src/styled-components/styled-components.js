import styled from "styled-components";

export const Table = styled.table`
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 75%;
  text-align: center;
  border-spacing: 0;
  border: 1px solid black;
  font-size: 14px;
`;

export const TableHead = styled.thead`
  font-weight: bold;
  font-size: 20px;
`;
export const TableBody = styled.tbody``;

export const TableData = styled.td`
  padding: 1px;
  height: 40px;
  border: 0.9px solid black;
`;

export const TableRow = styled.tr`
  background-color: white;
  color: black;
  &:hover {
    color: black;
    background-color: orange;
  }
`;

export const Button = styled.button`
  padding: 10px;
  font-size: 42px;
  color: white;
  background-color: green;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  transform: translateY(-1px);
  text-align: center;
  transition: all 0.15s;

  :disabled {
    opacity: 0.5;
    transform: none;
    box-shadow: none;
  }

  :hover {
    background-color: white;
    color: green;
    cursor: pointer;
  }
`;
