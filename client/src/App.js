import ResponsiveFontSize from "./components/responsiveFontSize.Component.js"
import AppRoutes from "./routes/routes.js";
function App() {

  return (
    <>
      <ResponsiveFontSize>
        <AppRoutes/>
      </ResponsiveFontSize>
    </>
  );
}

export default App;
