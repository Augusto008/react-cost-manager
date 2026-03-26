import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css';

function ProjectForm() {
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
        text='Select the category' />
      <SubmitButton 
        btnText='Create Project' />
    </form>
  )
}

export default ProjectForm;