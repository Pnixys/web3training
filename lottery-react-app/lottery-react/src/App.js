
import './App.css';
import lottery from './lottery';
import { useEffect, useState } from 'react';

function App() {
  const [manager, setManager] = useState('');

  useEffect(() =>{
    async function fetchManager() {
      try {
        const manager = await  lottery.methods.manager().call();
        console.log('here the manager ' + manager);
        setManager(manager);
      }catch(err){
        console.log(err)
      }
      
    }
    fetchManager();
    
  },[]);
  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>adresse : {manager}</p>
    </div>
  );
}

export default App;
