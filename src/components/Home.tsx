import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Početna stranica</h1>
      <p>This is a simple example of a Home page using React Router v6.</p>
      <p>Feel free to navigate to other pages:</p>
      <ul>
        <li><Link to="/activities">Aktivnosti</Link></li>
      </ul>
    </div>
  );
}

export default Home;