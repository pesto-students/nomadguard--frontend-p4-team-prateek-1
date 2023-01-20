// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';


// auth-context
import { AuthContextProvider } from "./_store/auth-context";

// ----------------------------------------------------------------------

export default function App() {
console.log = function no_console() {};
  return (  
    <AuthContextProvider>
      <ThemeProvider>
        <ScrollToTop />
        <StyledChart />
        <Router />
      </ThemeProvider>
    </AuthContextProvider>
  );
}
