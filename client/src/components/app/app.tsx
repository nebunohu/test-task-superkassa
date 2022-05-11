import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

// styles
import styles from './app.module.css';

function App() {
  const [formState, setFormState] = useState({phone: ''});

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({...formState, phone: e.target.value})
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //const target = e.target as HTMLInputElement;
    //const target = e.target as Element;
    try {
      const res = await fetch('http://localhost:3001/api/users/add', {
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
      console.log(error.message)
    }
  }

  useEffect(() => {

  }, []);

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input type="text" name="phone" onChange={onChangeHandler}/>
        <input type="submit" value="Отправить" />
      </form>
    </div>
  );
}

export default App;
