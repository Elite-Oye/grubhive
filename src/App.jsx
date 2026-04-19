import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import WhyDirect from './components/WhyDirect';
import Gallery from './components/Gallery';
import Visit from './components/Visit';
import Footer from './components/Footer';
import Cart from './components/Cart';

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Menu />
          <WhyDirect />
          <Gallery />
          <Visit />
        </main>
        <Footer />
        <Cart />
      </CartProvider>
    </ThemeProvider>
  );
}
