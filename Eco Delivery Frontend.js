// App.js
import React, { Component } from 'react';
import { render } from 'react-dom';
import 'Eco Delivery Styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Form, Button, Alert, Badge, Navbar, Nav } from 'react-bootstrap';
import { Truck, Leaf, BarChart2, ShoppingCart } from 'lucide-react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedVendor: '',
      cartData: {
        items: [
          { id: 1, name: "Wireless Earbuds", price: 129.99, quantity: 1 },
          { id: 2, name: "Smart Watch", price: 199.99, quantity: 1 }
        ],
        subtotal: 329.98
      },
      deliveryVendors: [
        {
          id: 1,
          name: "EcoExpress",
          type: "electric",
          price: 5.99,
          deliveryTime: "2-3 days",
          co2Savings: 2.5,
          rating: 4.5,
        },
        {
          id: 2,
          name: "FastTrack Logistics",
          type: "petrol",
          price: 4.99,
          deliveryTime: "2-3 days",
          co2Emissions: 5.8,
          rating: 4.7,
        },
        {
          id: 3,
          name: "GreenMile Delivery",
          type: "electric",
          price: 6.99,
          deliveryTime: "3-4 days",
          co2Savings: 3.1,
          rating: 4.3,
        },
        {
          id: 4,
          name: "SpeedWay",
          type: "CNG",
          price: 5.49,
          deliveryTime: "2-3 days",
          co2Emissions: 2.9,
          rating: 4.6,
        }
      ]
    };
  }

  calculateTotalEmissionsSaved = () => {
    const vendor = this.state.deliveryVendors.find(
      v => v.id === parseInt(this.state.selectedVendor)
    );
    return vendor?.co2Savings || 0;
  };

  handleVendorSelect = (vendorId) => {
    this.setState({ selectedVendor: vendorId });
  };

  render() {
    const { cartData, deliveryVendors, selectedVendor } = this.state;

    return (
      <div>
        {/* Navigation */}
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand href="#home">
              <Leaf className="me-2" />
              Eco-Commerce
            </Navbar.Brand>
            <Nav className="ms-auto">
              <Nav.Link href="#cart">
                <ShoppingCart className="me-2" />
                Cart (2)
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Container className="py-4">
          {/* Order Summary */}
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Order Summary</h4>
            </Card.Header>
            <Card.Body>
              {cartData.items.map(item => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${item.price}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Subtotal</strong>
                <strong>${cartData.subtotal}</strong>
              </div>
            </Card.Body>
          </Card>

          {/* Delivery Options */}
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">
                <Truck className="me-2" />
                Select Delivery Partner
              </h4>
            </Card.Header>
            <Card.Body>
              <Form>
                {deliveryVendors.map(vendor => (
                  <Card 
                    key={vendor.id} 
                    className={`mb-3 ${selectedVendor === vendor.id ? 'border-primary' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.handleVendorSelect(vendor.id)}
                  >
                    <Card.Body>
                      <Form.Check
                        type="radio"
                        id={`vendor-${vendor.id}`}
                        name="deliveryVendor"
                        checked={selectedVendor === vendor.id}
                        onChange={() => this.handleVendorSelect(vendor.id)}
                        label={
                          <div className="ms-2">
                            <div className="d-flex justify-content-between align-items-center">
                              <h5 className="mb-0">
                                {vendor.name}
                                {vendor.type === 'electric' && (
                                  <Badge bg="success" className="ms-2">
                                    <Leaf className="me-1" size={14} />
                                    Eco-Friendly
                                  </Badge>
                                )}
                              </h5>
                              <span>${vendor.price}</span>
                            </div>
                            <div className="text-muted">
                              <small>
                                Delivery time: {vendor.deliveryTime} | Rating: {vendor.rating}⭐
                              </small>
                            </div>
                            <div className="mt-2">
                              {vendor.type === 'electric' ? (
                                <Alert variant="success" className="py-2 px-3 mb-0">
                                  <Leaf className="me-2" size={16} />
                                  Saves {vendor.co2Savings}kg CO2 emissions
                                </Alert>
                              ) : (
                                <Alert variant="warning" className="py-2 px-3 mb-0">
                                  <Truck className="me-2" size={16} />
                                  Produces {vendor.co2Emissions}kg CO2 emissions
                                </Alert>
                              )}
                            </div>
                          </div>
                        }
                      />
                    </Card.Body>
                  </Card>
                ))}
              </Form>
            </Card.Body>
          </Card>

          {/* Environmental Impact Summary */}
          {selectedVendor && (
            <Card className="mb-4 shadow-sm border-success">
              <Card.Header className="bg-success text-white">
                <h4 className="mb-0">
                  <BarChart2 className="me-2" />
                  Environmental Impact
                </h4>
              </Card.Header>
              <Card.Body>
                <div className="text-center">
                  <h3 className="text-success">
                    {this.calculateTotalEmissionsSaved()}kg CO2
                  </h3>
                  <p className="mb-0">Estimated emissions saved by choosing this delivery option</p>
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Order Total */}
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal:</span>
                <span>${cartData.subtotal}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Delivery Fee:</span>
                <span>
                  ${selectedVendor ? 
                    deliveryVendors.find(v => v.id === parseInt(selectedVendor))?.price.toFixed(2) : 
                    '0.00'}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong>
                  ${selectedVendor ? 
                    (cartData.subtotal + deliveryVendors.find(v => v.id === parseInt(selectedVendor))?.price).toFixed(2) : 
                    cartData.subtotal.toFixed(2)}
                </strong>
              </div>
              <Button 
                variant="primary" 
                size="lg" 
                className="w-100"
                disabled={!selectedVendor}
              >
                Place Order
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
