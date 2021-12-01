import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Layout } from "./components/Layout";
import { ecologiTheme } from "./theme/ecologiTheme";
import { ThemeProvider } from "@mui/material";
import { InteractiveTreeGraph } from "./components/InteractiveTreeGraph/InteractiveTreeGraph";

import "./App.scss";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={ecologiTheme}>
        <div className="App">
          <Layout>
            <InteractiveTreeGraph />
          </Layout>
        </div>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
