import { useState } from 'react';
import styles from '../project/ProjectForm.module.css';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';

function ServiceForm({ handleSubmit, btnText, projectData }) {
  
  const [service, setService] = useState({});

  function submit(e) {
    e.preventDefault();
    projectData.services.push(service);
    handleSubmit(projectData);
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }

  return (
    <>
      <form onSubmit={submit} className={styles.form}>
        <Input 
          type="text" 
          text="service Name"
          name="name"
          placeholder="Service Name"
          handleOnChange={handleChange} />
        <Input 
          type="number" 
          text="Service Cost"
          name="cost"
          placeholder="Service Cost"
          handleOnChange={handleChange} />
        <Input 
          type="text" 
          text="service description"
          name="description"
          placeholder="Service Description"
          handleOnChange={handleChange} />
        <SubmitButton text={btnText} />
      </form>
    </>
  )
}

export default ServiceForm;