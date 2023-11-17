import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Button } from 'antd';
import { PlusCircleOutlined, SaveOutlined } from '@ant-design/icons';
import './header.css';
import BreadcrumbCustom from '../../shared/Breadcrumb/BreadcrumbCustom';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css'
const { Search } = Input;


const Separator = ({ children, ...props }) => (
  <span style={{ fontWeight: "bold" }} {...props}>
    {children}
  </span>
)

// eslint-disable-next-line no-unused-vars
const TextCustom = ({ children, ...props }) => (
  <div className='text' {...props} style={{width: '150px', overflow: 'hidden', textOverflow: 'ellipsis', color: '#1677ff',
  cursor: 'pointer'}}>
    {children}
  </div>
)

const HeaderPage = ({ title = '', actions = 'default', onAdd = true, onSave = false, handleUpdate, onCreate, onBack = false, search = false, type, optionBreadCrumb }) => {
  const [option, setOption] = useState([]);
  const [currentSite, setCurrentSite] = useState("");
  // eslint-disable-next-line no-unused-vars
  let { pathname } = useLocation();
  const onSearch = (text) => {};
  const navigate = useNavigate();
  

  const styleButton = {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    marginRight: "10px",
  };

  useEffect(() => {
    setCurrentSite(JSON.parse(localStorage.getItem('submenu')))
    setOption(JSON.parse(localStorage.getItem('breadcrumbs')))
    handleCheckUserClickBtnBack()
  }, [])
  
  const handleCheckUserClickBtnBack = () => {
    window.addEventListener('popstate', () => {
      let arr = [];
      localStorage.setItem('breadcrumbs', JSON.stringify(arr));
    });
  }
  
  const handleCheckPrevSite = () => {
    let arr = [];
    localStorage.setItem('breadcrumbs', JSON.stringify(arr));
    navigate(`/${currentSite}`)
  }
  
  const handleCheckCurrSite = (item, index) => {
    let _breadCrumbs = [];
    if(index === 0){
      _breadCrumbs = JSON.parse(localStorage.getItem('breadcrumbs')).toSpliced(1,3)
      localStorage.setItem('breadcrumbs', JSON.stringify(_breadCrumbs));
      navigate(`/${currentSite}/${item}`)
    } else if(index === 1){
      _breadCrumbs = JSON.parse(localStorage.getItem('breadcrumbs')).toSpliced(2,3)
      localStorage.setItem('breadcrumbs', JSON.stringify(_breadCrumbs));
      navigate(`/skill/Listening/test`)
    } else {
      navigate(`/question`)
    }
  } 

  return (
    <div className="header-page">
      <Row className="wrapper" justify="space-around" align="center">
        <Col>
        <BreadcrumbCustom separator={<Separator>{'>'}</Separator>}>

        {/* <Link onClick={() => handleCheckPrevSite()} to={`/${currentSite}`}>{currentSite}</Link> */}
        <strong onClick={() => handleCheckPrevSite()} >{currentSite}</strong>

        {option !== null && option.map((item, index) => {
        return (
          <div key={index} className='some-custom-classname'>
            {/* <Link onClick={() => handleCheckCurrSite(item)}>{item}</Link> */}
            <strong onClick={() => handleCheckCurrSite(item, index)}>{item}</strong>
          </div>
        )
      })}
    </BreadcrumbCustom>
        </Col>
        <Col className="header-page__title">
        </Col>
        <Col flex={1} style={{ textAlign: 'right' }}>
          {actions === 'default' && (
            <Row
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '16px',
                justifyContent: 'end',
              }}
            >
              {
                search && <Search className="header-page__search" placeholder="Search..." onSearch={onSearch} enterButton />
              }
              {
                onCreate && onAdd && <Button /** className='btnBack' */ type='primary' style={styleButton} onClick={() => onCreate()} icon={<PlusCircleOutlined />}>
                {'Create'}
              </Button>
              }
              {
                onSave && <Button /** className='btnBack' */ type='primary' style={styleButton} onClick={() => handleUpdate()} icon={<SaveOutlined />}>
                {'Save'}
              </Button>
              }
            </Row>
          ) }
        </Col>
      </Row>
    </div>
  );
};

HeaderPage.propTypes = {
  /**
   * options data for ribbon
   */
  title: PropTypes.string,
  // actions: PropTypes.oneOf([PropTypes.string, PropTypes.func, PropTypes.bool]),
  onCreate: PropTypes.func,
};

export default HeaderPage;
