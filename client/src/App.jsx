import AppRouter from "./routes/AppRouter";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  );
}

export default App;
