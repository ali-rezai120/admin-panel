import Layout from "./components/layout/Layout";
import Page from "./components/pages/Page";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Page />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
