import styled from "styled-components";

export const Heading1 = styled.h1`
  font-size: 40px;
  color: ${(p) => p.theme.colors.green};
`;

export const Heading3 = styled.h3`
  font-size: 25px;
`;

export const Table = styled.table`
  border-spacing: 0;
  font-size: 25px;
  max-width: 500px;
  width: 100%;
  border: 1px solid ${(p) => p.theme.colors.red};
`;

export const TableHead = styled.thead`
  font-weight: bold;
`;

export const TableBody = styled.tbody``;

export const TableData = styled.td`
  text-align: left;
  border: 1px solid ${(p) => p.theme.colors.red};
  padding: 5px;
`;

export const TableDataPoints = styled(TableData)`
  text-align: center;
`;

export const TableRow = styled.tr`
  background-color: ${(p) => p.theme.colors.blue};
  color: ${(p) => p.theme.colors.purple};

  :nth-child(even) {
    color: ${(p) => p.theme.colors.purple};
    background-color: ${(p) => p.theme.colors.white};
    :hover {
      cursor: pointer;
      color: ${(p) => p.theme.colors.blue};
      background-color: ${(p) => p.theme.colors.red};
    }
  }
  :hover {
    cursor: pointer;
    color: ${(p) => p.theme.colors.blue};
    background-color: ${(p) => p.theme.colors.red};
  }
`;

export const TableRowHeader = styled.tr`
  background-color: ${(p) => p.theme.colors.red};
  color: ${(p) => p.theme.colors.purple};
`;

export const Button = styled.button`
  padding: 10px;
  color: ${(p) => p.theme.colors.purple};
  background-color: ${(p) => p.theme.colors.green};
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  border: 0.16em solid ${(p) => p.theme.colors.green};
  text-align: center;
  transition: all 0.15s;
  outline: none;

  :disabled {
    opacity: ${(p) => p.theme.hover.opacity};
    transform: none;
    box-shadow: none;
  }

  :hover {
    color: ${(p) => p.theme.colors.white};
    background-color: ${(p) => p.theme.colors.purple};
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    transform: translateY(-1px);
    cursor: pointer;
  }
`;
