import { useNavigate } from "react-router-dom";
import ProjectForm from "../project/ProjectForm";
import styles from './NewProject.module.css';

function NewProject() {

  const navigate = useNavigate();

  function createPost(project) {
    // initialize cost and services
    project.cost = 0;
    project.services = [];

    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then(response => response.json())
      .then(data => {
        //console.log('Project created:', data);
        navigate('/projects', { message: 'Project created successfully!' });
      })
      .catch(error => console.error('Error creating project:', error));
  }

  return (
    <div className={styles.newproject_container}>
      <h1>NewProject</h1>
      <p>Create your project to add services.</p>
      <ProjectForm handleSubmit={createPost} btnText='Create Project' />
    </div>
  )
}

export default NewProject;