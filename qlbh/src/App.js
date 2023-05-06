import './App.css';
import { Col, Row } from 'antd';
import Header from './components/navbar/navbar';
import Navigation from './components/navigation/navigation';

function App() {
  return (
    <div className='App'>
        <Row gutter={16}>
        <Col span={4}>
        <Navigation></Navigation>
        </Col>
        <Col span={20}>
        <Header></Header>
        </Col>
      </Row>
    </div>
    
  );
}

export default App;
