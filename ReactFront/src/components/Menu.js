import { List } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, Route } from 'react-router-dom';

function Menu({onChangeSearchName, searchNameRef}) {
  return (
    <header className=' header'>
      {['sm'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
          
            <Navbar.Brand href="/"><img src='https://play-lh.googleusercontent.com/W9AN3AyNH7rgBaGO7Jv2MEMk2piGUEerZTZN7hG-xNJFq6QW1Dzs4HLukka0-oKIsw' width="40px"/></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/customer/announcement">고객센터</Nav.Link>
                <Nav.Link href="/promotion">프로모션</Nav.Link>
                <Nav.Link href="/board/board">게시판</Nav.Link>
                <Nav.Link href="/list" className="link-danger">놀이공원</Nav.Link>
                </Nav>
                <Form action="/list" className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    name="searchName"
                    onChange={onChangeSearchName}
                  />
                  <Button type="button" variant="outline-success">
                    <Link to={{
                    pathname: "/list",
                    state: {
                      "searchNameRef" : "1"
                    }
                  }} >search</Link></Button>
                  </Form>
                
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            
          </Container>
        </Navbar>
      ))}
    </header>
  );
}

export default Menu;