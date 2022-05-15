import { FC, useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "../../consts";
import { useDispatch, useSelector } from "../../hooks";
import { WS_CONNECTION_START } from "../../redux/actions/ws-actions";

import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer, 
  Paper } from "@mui/material";

const PhoneNumbersList: FC = () => {
  const { wsConnected, phones } = useSelector(store => store.ws);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!wsConnected) {
      
      dispatch({type: WS_CONNECTION_START, payload: ''});
      
    }

  }, []);

  return (
    <TableContainer 
      sx={{ 
        "width": "95%",
        "boxShadow": "0 0 7px 2px rgba(0, 0, 0, 0.1)" 
      }} 
      component={Paper}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Номер телефона</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {phones.length ? phones.map( (el: any, index: number) => {  
            return (
              <TableRow key={index}>
                <TableCell align="left">
                  {el.phone}
                </TableCell>
              </TableRow>
            );
          } ) : null}
        </TableBody>
        
      </Table>
    </TableContainer>
  );
};

export default PhoneNumbersList;