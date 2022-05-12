import { Button, FormControl, FormHelperText, OutlinedInput, Select } from "@mui/material";
import { FC, ChangeEvent, FormEvent, useState } from "react";

import { API_BASE_URL } from "../../consts";

import styles from './form.module.scss';

const Form: FC = () => {
  const [formState, setFormState] = useState({phone: ''});

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({...formState, phone: e.target.value});
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //const target = e.target as HTMLInputElement;
    //const target = e.target as Element;
    try {
      await fetch(`${API_BASE_URL}/users/add`, {
      // const res = fetch('http://localhost:3001/api/users/test', {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone: formState.phone
        })
      });
      // const result = await res.json();
      //   console.log("Успех: ", JSON.stringify(result));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <form className={`${styles.formWrapper}`} onSubmit={onSubmitHandler}>
      <FormControl>
        <Select 
          size="small"
        />
        <FormHelperText></FormHelperText>
      </FormControl>
      <FormControl>
        <OutlinedInput 
          name="phone"
          onChange={onChangeHandler} 
          size="small"
        />
        <FormHelperText></FormHelperText>
      </FormControl>
      <Button 
        type="submit"
        variant="contained"
      >
        Отправить
      </Button>
    </form>
  );
};

export default Form;