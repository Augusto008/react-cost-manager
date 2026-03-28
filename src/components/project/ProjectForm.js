import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css';
import { useEffect, useState } from 'react';

function ProjectForm({ btnText }) {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);


  return (
    <form className={styles.form}>
      <Input 
        type='text'
        text='Project Name'
        name='name'
        placeholder='Project Name' />
      <Input 
        type='number'
        text='Project Budget'
        name='name'
        placeholder='Project Budget' />
      <Select 
        name='category_id'
        text='Select the category'
        options={categories} />
      <SubmitButton 
        text={btnText} />
    </form>
  )
}

export default ProjectForm;