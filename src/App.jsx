import Home from "./pages/Home";
import Navbar from './components/Navbar';
import Announcement from './components/Announcement'
import Slider from "./components/Slider";

const App = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
    </div>
  )
};

export default App;