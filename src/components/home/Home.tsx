import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Volontiranje - Naslov</h1>
      <p>Ovaj rad sam napravio u sklopu edit JuniorDEV programa. - prestavljanje</p>
    
      <p>Pregledajte druge funkcionalnosti!</p>
      <ul>
        <li><Link to="/activities">Aktivnosti</Link></li>
      </ul>
    </div>
  );
}

export default Home;