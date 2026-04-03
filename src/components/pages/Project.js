import styles from './Project.module.css';
import Loading from '../layout/Loading';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';

function Project() {

  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(data => {
      setProject(data);
    })
    .catch(error => {
      console.error('Error fetching project:', error);
    });
  }, {id});

  function editPost(project) {
    setMessage('');

    if (project.budget < project.cost) {
      setMessage('Budget cannot be less than the total cost of the project.');
      setType('error');
      return false;
    }
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
    .then(resp => resp.json())
    .then(data => {
      setProject(data);
      setShowProjectForm(false);
      setMessage('Project updated successfully!');
      setType('success');
    })
    .catch(error => {
      console.error('Error updating project:', error);
    });
  }


  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Project: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Edit Project' : 'Close'}
              </button>
            </div>
            <div>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Category: </span> {project.category.name}
                  </p> 
                  <p>
                    <span>Budget: </span> {project.budget}
                  </p> 
                  <p>
                    <span>Total Used:</span> {project.cost}
                  </p> 
                </div>
              ) : (
                <div>
                  <ProjectForm 
                    handleSubmit={editPost} 
                    btnText="Update Project" 
                    projectData={project} />
                </div>
              )}
            </div>
          </Container>
        </div>
      ): (
        <Loading />
      )}
    </>
  );
}

export default Project;