import { Button, FormControl, FormHelperText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { FC, ChangeEvent, FormEvent, useState,  } from "react";

import { API_BASE_URL } from "../../consts";

import styles from './form.module.scss';

import Config from "../../config";

const Form: FC = () => {
  const defaultCode = Config.phoneCodes.find(el => el.country === "Russia");
  const [formState, setFormState] = useState({phone: '', code: defaultCode ? defaultCode.code : "", error: {flag: false, message: ""}});
  // const [isError, setIsError] = useState(false);
  //const selectRef = useRef<HTMLDivElement>(null);
  //const defaultSelectCode = ;

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({...formState, phone: e.target.value});
  };

  const onSelectChangeHandler = (e: SelectChangeEvent) => {
    setFormState({...formState, code: e.target.value});
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ( formState.phone.match(/^\d{3,10}$/) ) {
      if (formState.error.flag) setFormState({...formState, error: {flag: false, message: ""}});
      try {
        const res = await fetch(`${API_BASE_URL}/users/add`, {
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ phone: formState.code + formState.phone })
        });

        if (!res.ok) {
          const body = await res.json() ;
          setFormState({ ...formState, error: { flag: true, message: body.message ? body.message : "" }});
        }
      } catch (error: any) {
        console.log(error.message);
        
      }
    } else {
      setFormState({...formState, error: {flag: true, message: "Номер введен неверно"}});
    }
  };

  return (
    <form className={`${styles.formWrapper}`} onSubmit={onSubmitHandler}>
      <FormControl>
        <Select 
          size="small"
          value={formState.code}
          onChange={onSelectChangeHandler} 
        >
          {Config.phoneCodes.map((el, index) => (<MenuItem value={el.code} key={index}>{el.code}</MenuItem>))}
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>
      <FormControl>
        <OutlinedInput 
          name="phone"
          id="phone"
          onChange={onChangeHandler} 
          size="small"
          error={formState.error.flag}
        />
        <FormHelperText id="phone" error={formState.error.flag}>{formState.error.message}</FormHelperText>
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