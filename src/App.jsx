import "./App.css"
import Pages from "./pages/Pages"
import Header from "./components/Header"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
})

function App() {
  return (
    <div className="app-container">
      <QueryClientProvider client={queryClient}>
        <Pages />
      </QueryClientProvider>
    </div>
  )
}

export default App
