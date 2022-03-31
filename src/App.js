import { useState } from 'react';

import LineChart from './Components/LineChart';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState({ text: 'Faro', id: 'faro' });
  const [period, setPeriod] = useState('all');
  const handleClick = (event) =>
    setData({
      text: event.target.firstChild.data,
      id: event.target.getAttribute('data-city'),
    });
  const handleDropdown = (event) =>
    setPeriod(event.target.getAttribute('data-period'));

  return (
    <Container>
      <Row className="text-center">
        <h1>
          <Badge className="mt-3">Erasmus Air Pollution Visualizer</Badge>
        </h1>
      </Row>
      <Row>
        <ButtonToolbar
          onClick={handleClick}
          className="my-3 justify-content-center"
        >
          <ButtonGroup className="my-1 ">
            <Button className="mx-1" data-city="uherske" variant="success">
              Uherské Hradiště
            </Button>
            <Button className="mx-1" data-city="faro" variant="success">
              Faro
            </Button>
            <Button className="mx-1" data-city="turnu" variant="success">
              Turnu Magurele
            </Button>
            <Button className="mx-1" data-city="lund" variant="success">
              Lund
            </Button>
          </ButtonGroup>
          <ButtonGroup className="my-1 ">
            <Button className="mx-1" data-city="prague" variant="secondary">
              Prague
            </Button>
            <Button className="mx-1" data-city="lisbon" variant="secondary">
              Lisbon
            </Button>
            <Button className="mx-1" data-city="bucharest" variant="secondary">
              Bucharest
            </Button>
            <Button className="mx-1" data-city="stockholm" variant="secondary">
              Stockholm
            </Button>
          </ButtonGroup>
          <ButtonGroup className="my-1">
            <Button className="mx-1" data-city="kiev" variant="danger">
              Kyiv
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Row>
      <Row className="text-center my-2">
        <DropdownButton
          className="text-center"
          variant="outline-dark"
          align="start"
          title="Period Of Time"
          size="lg"
        >
          <Dropdown.Item data-period="1" onClick={handleDropdown}>
            Last Month
          </Dropdown.Item>
          <Dropdown.Item data-period="3" onClick={handleDropdown}>
            Last 3 Months
          </Dropdown.Item>
          <Dropdown.Item data-period="all" onClick={handleDropdown}>
            All Time
          </Dropdown.Item>
        </DropdownButton>
      </Row>
      <Row>
        <h2 className="my-2 text-center">
          Current City: <Badge bg="info">{data.text}</Badge>
        </h2>
      </Row>
      <Row>
        <LineChart city={data.id} period={period} />
      </Row>
    </Container>
  );
}

export default App;
