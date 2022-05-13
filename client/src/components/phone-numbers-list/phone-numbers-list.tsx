import { FC, useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "../../consts";

import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer, 
  Paper } from "@mui/material";

const PhoneNumbersList: FC = () => {
  //const socket: WebSocket | null = null; 
  const ws = useRef<WebSocket | null>(null);
  const [phones, setPhones] = useState([]);
  const[isConnected, setIsConnected] = useState(false);

  const getPhonesList = async () => {
    const res = await fetch(`${API_BASE_URL}/users/get-phones`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await res.json();
    setPhones(body.result);
  };

  useEffect(() => {
    if ( !phones.length ) getPhonesList();

  }, []);

  /*useEffect(() => {
    if(!isConnected) {
      ws.current = new WebSocket(`ws:localhost:3002`);
      
      setIsConnected(true);
    } else if (ws.current) ws.current.onmessage = e => {                //подписка на получение данных по вебсокету
      
      const message = JSON.parse(e.data);
      //setData(message);
    };
  }, [ws]);*/

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