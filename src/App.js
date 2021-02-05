import './App.css';
import ItemEditor from './components/ItemEditor'
import { data } from './constants/ItemEditorConstant'

function App() {
  return (
    <div className="container">
      <ItemEditor
        data={data}
      />
    </div>
  );
}

export default App;
