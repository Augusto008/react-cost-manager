import styles from './Project.module.css';
import Loading from '../layout/Loading';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from '../layout/Container';

function Project() {

  const { id } = useParams();
  console.log(id);

  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);

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

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            <div className={styles.details_container}>
              <h1>Project: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Edit Project' : 'Close'}
              </button>
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
                    <p>Project Details</p>
                  </div>
                )}
              </div>
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