import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';

export function CartPage({ user, cart, setCart, onLogout, setSearchQuery }) {
  const navigate = useNavigate();
  const [itemToRemove, setItemToRemove] = useState(null);
  const [isConfirmingRemoval, setIsConfirmingRemoval] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Agrupar productos por ID y contar cantidades
  const cartItems = useMemo(() => {
    const grouped = {};
    cart.forEach(item => {
      if (!grouped[item.id]) {
        grouped[item.id] = {
          ...item,
          quantity: 0
        };
      }
      grouped[item.id].quantity += 1;
    });
    return Object.values(grouped);
  }, [cart]);

  const handleRemoveClick = (item) => {
    setItemToRemove(item);
    setIsConfirmingRemoval(true);
  };

  const confirmRemoval = () => {
    if (itemToRemove) {
      setCart(cart.filter(item => item.id !== itemToRemove.id));
      setItemToRemove(null);
      setIsConfirmingRemoval(false);
    }
  };

  const cancelRemoval = () => {
    setItemToRemove(null);
    setIsConfirmingRemoval(false);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    setIsCheckingOut(true);

    // Simulamos un proceso de compra (en un caso real, se integraría con un sistema de pago)
    try {
      // Mostrar un resumen de la compra
      const total = calculateTotal();
      const itemsSummary = cartItems.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n');
      
      const message = `Resumen de la compra:\n\n${itemsSummary}\n\nTotal: $${total.toFixed(2)}\n\n¿Confirmar la compra?`;
      
      if (window.confirm(message)) {
        // Simular procesamiento de pago (en un caso real sería con Stripe, PayPal, etc.)
        alert('¡Compra realizada con éxito! Gracias por tu pedido.\n\nNúmero de pedido: #' + Math.floor(Math.random() * 1000000));
        setCart([]);
        navigate('/home');
      }
    } catch (error) {
      alert('Error en la compra: ' + error.message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const total = calculateTotal();

  return (
    <div className="app">
      <Header
        cartCount={cart.length}
        onSearch={setSearchQuery}
        onCategoryClick={() => navigate('/home')}
        onLogout={onLogout}
        user={user}
      />

      <main style={{ minHeight: '80vh', padding: '40px 0' }}>
        <div className="container">
          <h1 style={{ marginBottom: '30px' }}>Tu Carrito</h1>

          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ fontSize: '18px', marginBottom: '20px' }}>Tu carrito está vacío</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/home')}
              >
                Volver a la Tienda
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px' }}>
              {/* Lista de productos en el carrito */}
              <div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '20px'
                }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        padding: '15px',
                        textAlign: 'center',
                        backgroundColor: '#f9f9f9'
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          marginBottom: '10px'
                        }}
                      />
                      <h3 style={{ marginBottom: '10px', fontSize: '14px' }}>{item.name}</h3>
                      <p style={{ marginBottom: '5px', color: '#666' }}>${item.price.toFixed(2)}</p>
                      <p style={{ marginBottom: '10px', fontWeight: 'bold', color: '#333' }}>
                        Cantidad: <span style={{ fontSize: '18px' }}>{item.quantity}</span>
                      </p>
                      <p style={{ marginBottom: '15px', color: '#999', fontSize: '14px' }}>
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        className="btn"
                        style={{
                          backgroundColor: '#d32f2f',
                          color: '#fff',
                          padding: '8px 12px',
                          fontSize: '12px',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleRemoveClick(item)}
                      >
                        Quitar del Carrito
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumen del carrito */}
              <div
                style={{
                  position: 'sticky',
                  top: '20px',
                  height: 'fit-content',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '20px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Resumen</h2>
                
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    paddingBottom: '10px',
                    borderBottom: '1px solid #e0e0e0'
                  }}>
                    <span>Subtotal ({cart.length} items):</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px'
                  }}>
                    <span>Envío:</span>
                    <span>Gratis</span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                  paddingTop: '10px',
                  borderTop: '2px solid #333'
                }}>
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? 'Procesando...' : 'Comprar Ahora'}
                </button>

                <button
                  className="btn"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    marginTop: '10px',
                    backgroundColor: '#fff',
                    border: '1px solid #333',
                    color: '#333',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate('/home')}
                >
                  Continuar Comprando
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal de confirmación para eliminar */}
      {isConfirmingRemoval && itemToRemove && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={cancelRemoval}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '30px',
              borderRadius: '8px',
              maxWidth: '400px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '15px' }}>¿Quitar del carrito?</h2>
            <p style={{ marginBottom: '20px', color: '#666' }}>
              ¿Estás seguro de que deseas quitar <strong>{itemToRemove.name}</strong> del carrito?
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                className="btn btn-primary"
                style={{
                  padding: '10px 20px',
                  flex: 1
                }}
                onClick={confirmRemoval}
              >
                Sí, Quitar
              </button>
              <button
                className="btn"
                style={{
                  padding: '10px 20px',
                  flex: 1,
                  backgroundColor: '#999',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={cancelRemoval}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
