import './App.css';
import Calendar from './components/Calendar'

const App = () => {

  return (
    <div className="App">
      <h1>Itinerary for a few days in Montreal</h1>
      <h2>Created by Daniel Chuang</h2>
      <Calendar />
    </div>
  )
}

export default App