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
import './App.css'

function App() {


  return (
    <>
     <ThemeProvider>
      <CartProvider>
        <Navbar />
  
          <Hero />
          <About />
          <Menu />
          <WhyDirect />
          <Gallery />
          <Visit />
        
        <Footer />
        <Cart />
      </CartProvider>
    </ThemeProvider>
    </>
  )
}

export default App
