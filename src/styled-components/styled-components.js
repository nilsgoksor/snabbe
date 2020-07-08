import styled from "styled-components";

export const Heading1 = styled.h1`
  font-size: 30px;
  margin: 0;
`;
export const Heading3 = styled.h3`
  font-size: 25px;
`;

export const Table = styled.table`
  border-spacing: 0;
  font-size: 25px;
  max-width: 500px;
  width: 100%;
  border: 1px solid ${(p) => p.theme.colors.white};
`;

export const TableHead = styled.thead`
  font-weight: bold;
  border: 1px solid ${(p) => p.theme.colors.black};
`;

export const TableBody = styled.tbody`
  border: 1px solid ${(p) => p.theme.colors.white};
`;

export const TableData = styled.td`
  text-align: left;
  border: 1px solid ${(p) => p.theme.colors.white};
  padding: 5px;
`;

export const TableDataPoints = styled(TableData)`
  text-align: center;
`;

export const Points = styled(TableData)`
  text-align: right;
`;

export const TableRow = styled.tr`
  border: "1px solid white";

  &:hover {
    opacity: 0.2;
    cursor: pointer;
  }
`;

export const TableRowHeader = styled.tr`
  background-color: ${(p) => p.theme.colors.white};
  color: ${(p) => p.theme.colors.green};
`;

export const Button = styled.button`
  padding: 10px;
  color: ${(p) => p.theme.colors.green};
  background-color: ${(p) => p.theme.colors.white};
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  border: 0.16em solid ${(p) => p.theme.colors.white};
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
    background-color: ${(p) => p.theme.colors.green};
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    transform: translateY(-1px);
    cursor: pointer;
  }
`;
