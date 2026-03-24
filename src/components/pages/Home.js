import styles from './Home.module.css';
import financial_report from '../../img/financial-report.svg'; 
import LinkButton from '../layout/LinkButton';

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>Welcome to <span>Cost Manager</span></h1>
      <p>Start managing your projects!</p>
      <LinkButton to="/NewProject" text="New Project" />
      <img src={financial_report} alt="Cost Manager" />
    </section>
  )
}

export default Home;