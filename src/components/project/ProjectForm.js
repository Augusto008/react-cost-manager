import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css';
import { useEffect, useState } from 'react';

function ProjectForm({ handleSubmit, btnText, projectData }) {

  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {}); // if projectData is not provided, initialize with an empty object

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

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project);
  }

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setProject({ ...project, category:
      {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text
      }
    });
  }


  return (
    <form onSubmit={submit} className={styles.form}>
      <Input 
        type='text'
        text='Project Name'
        name='name'
        placeholder='Project Name' 
        handleOnChange={handleChange} 
        value={project.name ? project.name : ''} />
      <Input 
        type='number'
        text='Project Budget'
        name='budget'
        placeholder='Project Budget' 
        handleOnChange={handleChange}
        value={project.budget ? project.budget : ''} />
      <Select 
        name='category_id'
        text='Select the category'
        options={categories} 
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : ''} />
      <SubmitButton 
        text={btnText} />
    </form>
  )
}

export default ProjectForm;