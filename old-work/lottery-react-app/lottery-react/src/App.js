
import './App.css';
import lottery from './lottery';
import { useEffect, useState } from 'react';
import web3 from './web3';

function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');
  const [valueToEnter, setValueToEnter] = useState('');
  const [waitingMessage, setWaitingMessage] = useState('');

  useEffect(() =>{
    async function fetchManager() {
      try {
        setManager(await  lottery.methods.manager().call());
        setPlayers(await lottery.methods.getPlayers().call());
        setBalance(await web3.eth.getBalance(lottery.options.address));
      }catch(err){
        console.log(err)
      }
      
    }
    fetchManager();
    
  });

  async function onSubmit(event) {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    setWaitingMessage('Waiting for the transaction to be proceed');

    try {
     	await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(valueToEnter, 'ether')
      });
      setWaitingMessage('The transaction has been proceed, welcome and good luck for thte contest')
    } catch(error) {
      console.error(error);
      setWaitingMessage('The transaction failed, verifiy the amount of ether ! The amount must be greater than 0.01');
    }
  };

  async function onClick() {
    const accounts = await web3.eth.getAccounts();
    try {
      setWaitingMessage('We are picking a winner');
      await lottery.methods.pickWinner().send({
        from: accounts[0]
      });
      setWaitingMessage('A winner has been picked !!!!!');
    } catch (error) {
      console.error(error);
      setWaitingMessage('An error occured when picking the winner !');
    }
  }
  
  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>
        Contract managed by {manager}. <br />
        The currently {players.length} enter in the competition. <br />
        The prize is : {web3.utils.fromWei(balance, 'ether')}  
      </p>

      <hr />
      <form onSubmit={(e) => onSubmit(e)}>
        <h4>Want to try your chance ?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input 
            value={valueToEnter}
            onChange={(event) => setValueToEnter(event.target.value)}
          />
        </div>
        <button>Enter</button>
      </form>

      <hr />
      {waitingMessage !== '' && <h1>{waitingMessage}</h1>}

      <hr /> 
      <button onClick={() => onClick()}>Pick a winner</button>
      <hr /> 
    </div>
  );
}

export default App;
