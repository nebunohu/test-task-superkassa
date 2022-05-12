import { FC, useEffect, useState } from "react";
import { API_BASE_URL } from "../../consts";

const PhoneNumbersList: FC = () => {
  const [phones, setPhones] = useState([]);
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

  return (
    <>
      {phones.length ? phones.map((el: any) => el.phone) : null}
    </>
  );
};

export default PhoneNumbersList;