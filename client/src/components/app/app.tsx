import Form from '../form/form';
import PhoneNumbersList from '../phone-numbers-list/phone-numbers-list';

// styles
import styles from './app.module.css';

function App() {
  return (
    <div className={`${styles.wrapper}`}>
      <Form />
      <PhoneNumbersList />
    </div>
  );
}

export default App;
