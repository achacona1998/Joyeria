import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../../../Frontend/joyeria/src/pages/Home/Home';
import { CartContext } from '../../../../Frontend/joyeria/src/context/contexto';

// Mock all the components
jest.mock('../../../../Frontend/joyeria/src/layout/footer', () => {
  return function Footer() {
    return <div data-testid="footer">Footer</div>;
  };
});

jest.mock('../../../../Frontend/joyeria/src/layout/layout', () => {
  return function Layout({ children }) {
    return <div data-testid="layout">{children}</div>;
  };
});

jest.mock('../../../../Frontend/joyeria/src/layout/navbar', () => {
  return function Navbar() {
    return <div data-testid="navbar">Navbar</div>;
  };
});

jest.mock('../../../../Frontend/joyeria/src/pages/Home/sections/Braz', () => ({
  Braz: function Braz() {
    return <div data-testid="braz-section">Braz Section</div>;
  },
}));

jest.mock('../../../../Frontend/joyeria/src/pages/Home/sections/Dijes', () => ({
  Dijes: function Dijes() {
    return <div data-testid="dijes-section">Dijes Section</div>;
  },
}));

jest.mock('../../../../Frontend/joyeria/src/pages/Home/sections/Hero', () => ({
  Hero: function Hero() {
    return <div data-testid="hero-section">Hero Section</div>;
  },
}));

jest.mock('../../../../Frontend/joyeria/src/pages/Home/sections/Seleccion', () => ({
  Seleccion: function Seleccion() {
    return <div data-testid="seleccion-section">Seleccion Section</div>;
  },
}));

const mockCartContext = {
  cart: [],
  getCartLength: jest.fn(() => 0),
  removeFromCart: jest.fn(),
  updateCartQuantity: jest.fn(),
  handleAddCart: jest.fn(),
  clearCart: jest.fn(),
  getTotalPrice: jest.fn(() => 0),
  getTotalItems: jest.fn(() => 0),
};

const renderHome = () => {
  return render(
    <BrowserRouter>
      <CartContext.Provider value={mockCartContext}>
        <Home />
      </CartContext.Provider>
    </BrowserRouter>
  );
};

describe('Home Page', () => {
  test('renders without crashing', () => {
    renderHome();
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  test('renders all main sections', () => {
    renderHome();

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('seleccion-section')).toBeInTheDocument();
    expect(screen.getByTestId('braz-section')).toBeInTheDocument();
    expect(screen.getByTestId('dijes-section')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('sections are rendered in correct order', () => {
    renderHome();

    const layout = screen.getByTestId('layout');
    const children = Array.from(layout.children);

    expect(children[0]).toHaveAttribute('data-testid', 'navbar');
    expect(children[1]).toHaveAttribute('data-testid', 'hero-section');
    expect(children[2]).toHaveAttribute('data-testid', 'seleccion-section');
    expect(children[3]).toHaveAttribute('data-testid', 'braz-section');
    expect(children[4]).toHaveAttribute('data-testid', 'dijes-section');
    expect(children[5]).toHaveAttribute('data-testid', 'footer');
  });

  test('layout wraps all content', () => {
    renderHome();

    const layout = screen.getByTestId('layout');
    expect(layout).toBeInTheDocument();
    
    // Check that all main components are inside the layout
    expect(layout).toContainElement(screen.getByTestId('navbar'));
    expect(layout).toContainElement(screen.getByTestId('hero-section'));
    expect(layout).toContainElement(screen.getByTestId('seleccion-section'));
    expect(layout).toContainElement(screen.getByTestId('braz-section'));
    expect(layout).toContainElement(screen.getByTestId('dijes-section'));
    expect(layout).toContainElement(screen.getByTestId('footer'));
  });

  test('page structure is semantically correct', () => {
    renderHome();

    // Verify that the page has the expected structure
    const layout = screen.getByTestId('layout');
    expect(layout.children).toHaveLength(6);
  });
});