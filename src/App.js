import './App.css';
import Comments from "./components/Commments/Comments";
import CommentForm from "./components/Form/Form";

const App = () => {
    return (
        <div className="App">
            <CommentForm />
          <Comments />
        </div>
    );
}

export default App;
