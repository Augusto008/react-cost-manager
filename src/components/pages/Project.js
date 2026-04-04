import { parse, v4 as uuidv4 } from 'uuid';
import styles from './Project.module.css';
import Loading from '../layout/Loading';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import ServiceForm from '../service/ServiceForm';
import Message from '../layout/Message';

function Project() {

  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
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
  }, [id]);

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

  function createService(project) {

    setMessage('');

    // last service
    const lastService = project.services[project.services.length - 1];
    
    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    //maximum value validation
    if (newCost > parseFloat(project.budget)) {
      setMessage('Budget exceeded, check the value of the service');
      setType('error');
      project.services.pop();
      return false;
    }

    // add service cost to project total cost
    project.cost = newCost;

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
    .then(resp => resp.json())
    .then(data => {
      // show services
      setProject(data);
      setShowServiceForm(false);
      setMessage('Service added successfully!');
      setType('success');
    })
    .catch(error => {
      console.error('Error adding service:', error);
    });

  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
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
                <div className={styles.project_info}>
                  <ProjectForm 
                    handleSubmit={editPost} 
                    btnText="Update Project" 
                    projectData={project} />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Add a service:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Add Service' : 'Close'}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Add Service"
                    projectData={project} />
                )}
              </div>
            </div>
            <h2>Services</h2>
            <Container customClass="start">
              <p>List of services will go here</p>
            </Container>
          </Container>
        </div>
      ): (
        <Loading />
      )}
    </>
  );
}

export default Project;