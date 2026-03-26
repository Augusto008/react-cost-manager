import ProjectForm from "../project/ProjectForm";
import styles from './NewProject.module.css';

function NewProject() {
  return (
    <div className={styles.newproject_container}>
      <h1>NewProject</h1>
      <p>Create your project to add services.</p>
      <ProjectForm btnText='Create Project' />
    </div>
  )
}

export default NewProject;