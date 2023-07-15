import React from 'react'
import "./homeUser.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';

export default function homeUser() {
  return (
    <div className='vocabulary'>
      <div className='vocabulary__heading'>
        <div className='vocabulary__deading'>
          <FontAwesomeIcon className='vocabulary__item-icon' icon={faBook} />
          <h3 className='vocabulary__deading-text'>Vocabulary</h3>
        </div>
        <div className='vocabulary__create'>
        </div>
      </div>
      <div>
        <Row gutter={1}>
          <Col span={16} offset={4} className=''>
            <Row gutter={24}>
              <Col span={6} offset={2} className=''>
                <Link to="/bocabularydetails" className='vocabulary__body-item'>
                  <h3>
                    <FontAwesomeIcon className='vocabulary__body-icon1' icon={faBook} />
                    Constant
                  </h3>
                  <FontAwesomeIcon className='vocabulary__body-icon' icon={faRightLong} />
                </Link>
              </Col>
              <Col span={6} offset={2} className=''>
                <Link to="/bocabularydetails" className='vocabulary__body-item'>
                  <h3>
                    <FontAwesomeIcon className='vocabulary__body-icon1' icon={faBook} />
                    Constant
                  </h3>
                  <FontAwesomeIcon className='vocabulary__body-icon' icon={faRightLong} />
                </Link>
              </Col>
              <Col span={6} offset={2} className=''>
                <Link to="/bocabularydetails" className='vocabulary__body-item'>
                  <h3>
                    <FontAwesomeIcon className='vocabulary__body-icon1' icon={faBook} />
                    Constant
                  </h3>
                  <FontAwesomeIcon className='vocabulary__body-icon' icon={faRightLong} />
                </Link>
              </Col>
              <Col span={6} offset={2} className=''>
                <Link to="/bocabularydetails" className='vocabulary__body-item'>
                  <h3>
                    <FontAwesomeIcon className='vocabulary__body-icon1' icon={faBook} />
                    Constant
                  </h3>
                  <FontAwesomeIcon className='vocabulary__body-icon' icon={faRightLong} />
                </Link>
              </Col>
              <Col span={6} offset={2} className=''>
                <Link to="/bocabularydetails" className='vocabulary__body-item'>
                  <h3>
                    <FontAwesomeIcon className='vocabulary__body-icon1' icon={faBook} />
                    Constant
                  </h3>
                  <FontAwesomeIcon className='vocabulary__body-icon' icon={faRightLong} />
                </Link>
              </Col>
              <Col span={6} offset={2} className=''>
                <Link to="/bocabularydetails" className='vocabulary__body-item'>
                  <h3>
                    <FontAwesomeIcon className='vocabulary__body-icon1' icon={faBook} />
                    Constant
                  </h3>
                  <FontAwesomeIcon className='vocabulary__body-icon' icon={faRightLong} />
                </Link>
              </Col>
              <Col span={6} offset={2} className=''>
                <Link to="/bocabularydetails" className='vocabulary__body-item'>
                  <h3>
                    <FontAwesomeIcon className='vocabulary__body-icon1' icon={faBook} />
                    Constant
                  </h3>
                  <FontAwesomeIcon className='vocabulary__body-icon' icon={faRightLong} />
                </Link>
              </Col>
              <Col span={6} offset={2} className=''>
                <Link to="/bocabularydetails" className='vocabulary__body-item'>
                  <h3>
                    <FontAwesomeIcon className='vocabulary__body-icon1' icon={faBook} />
                    Constant
                  </h3>
                  <FontAwesomeIcon className='vocabulary__body-icon' icon={faRightLong} />
                </Link>
              </Col>
              <Col span={6} offset={2} className=''>
                <Link to="/bocabularydetails" className='vocabulary__body-item'>
                  <h3>
                    <FontAwesomeIcon className='vocabulary__body-icon1' icon={faBook} />
                    Constant
                  </h3>
                  <FontAwesomeIcon className='vocabulary__body-icon' icon={faRightLong} />
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}
