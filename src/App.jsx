import "./App.css";
import MapComponent from "./Login/map.jsx";
import Login from "./Login/Login.jsx";
import SwipeableEdgeDrawer from "./chatmap/chat.jsx";
function App() {
  return (
    <>
    <MapComponent></MapComponent>
      <SwipeableEdgeDrawer>
      </SwipeableEdgeDrawer>
    </>
  );
}

export default App;
