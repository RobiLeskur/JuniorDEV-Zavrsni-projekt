import { Link } from 'react-router-dom';
import { FaLinkedin, FaYoutube, FaInstagram, FaGithub } from 'react-icons/fa';
import styles from './home.module.css';


function Home() {
  return (
    <div className={styles.homeContainer} style={{ textAlign: 'center' }}>
      <h1>CroVolonteri</h1>
      <h5>Ime mi je Robert Leskur</h5><p> Ovaj rad sam napravio u sklopu edit JuniorDEV programa. Ovo je moj prvi veliki projekt i zasigurno će mi zauvijek ostati blizak srcu. Bila mi je čast biti dio JuniorDEV ekipe :) </p>
    
      <p>Pregledajte funkcionalnosti!</p>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li><Link to="/activities">Aktivnosti</Link></li>
        <li><Link to="/volunteers">Volonteri</Link></li>
        <li><Link to="/organizations">Organizacije</Link></li>

        
      </ul>

      <div style={{ marginTop: '20px' }}>
        <a href="https://hr.linkedin.com/in/robertleskur" target="_blank" rel="noopener noreferrer"><FaLinkedin size={30} style={{ marginRight: '10px', color: '#0077B5' }} /></a>
        <a href="https://www.youtube.com/channel/UC_upJOsW8ES-hz3OTH4Dkag" target="_blank" rel="noopener noreferrer"><FaYoutube size={30} style={{ marginRight: '10px', color: '#FF0000' }} /></a>
        <a href="https://www.instagram.com/robert.leskur/" target="_blank" rel="noopener noreferrer"><FaInstagram size={30} style={{ marginRight: '10px', color: '#E4405F' }} /></a>
        <a href="https://github.com/robertleskur" target="_blank" rel="noopener noreferrer"><FaGithub size={30} style={{ color: '#000000' }} /></a>
      </div>
    </div>
  );
}

export default Home;