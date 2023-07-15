import React from 'react'
import "./grammar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpellCheck, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';

export default function Grammar() {
  return (
    <div className='grammar'>
      <div className='grammar__heading'>
        <div className='grammar__deading'>
          <FontAwesomeIcon className='grammar__item-icon' icon={faSpellCheck} />
          <h3 className='grammar__deading-text'>Grammar</h3>
        </div>
        <div className='grammar__create'>
        </div>
      </div>
      <div>
        <Row gutter={1}>
          <Col span={16} offset={4} className=''>
            <Row gutter={24}>
              <Col span={6} offset={2} className=''>
                <Link to="/bocabularydetails" className='grammar__body-item'>
                  <h3>
                    <FontAwesomeIcon className='grammar__body-icon1' icon={faSpellCheck} />
                    Constant
                  </h3>
                  <FontAwesomeIcon className='grammar__body-icon' icon={faRightLong} />
                </Link>
              </Col>
              <Col span={6} offset={2} className=''>
                <Link to="/bocabularydetails" className='grammar__body-item'>
                  <h3>
                    <FontAwesomeIcon className='grammar__body-icon1' icon={faSpellCheck} />
                    Constant
                  </h3>
                  <FontAwesomeIcon className='grammar__body-icon' icon={faRightLong} />
                </Link>
              </Col>
              <Col span={6} offset={2} className=''>
                <Link to="/bocabularydetails" className='grammar__body-item'>
                  <h3>
                    <FontAwesomeIcon className='grammar__body-icon1' icon={faSpellCheck} />
                    Constant
                  </h3>
                  <FontAwesomeIcon className='grammar__body-icon' icon={faRightLong} />
                </Link>
              </Col>
              <Col span={6} offset={2} className=''>
                <Link to="/bocabularydetails" className='grammar__body-item'>
                  <h3>
                    <FontAwesomeIcon className='grammar__body-icon1' icon={faSpellCheck} />
                    Constant
                  </h3>
                  <FontAwesomeIcon className='grammar__body-icon' icon={faRightLong} />
                </Link>
              </Col>
              <Col span={6} offset={2} className=''>
                <Link to="/bocabularydetails" className='grammar__body-item'>
                  <h3>
                    <FontAwesomeIcon className='grammar__body-icon1' icon={faSpellCheck} />
                    Constant
                  </h3>
                  <FontAwesomeIcon className='grammar__body-icon' icon={faRightLong} />
                </Link>
              </Col>
              <Col span={6} offset={2} className=''>
                <Link to="/bocabularydetails" className='grammar__body-item'>
                  <h3>
                    <FontAwesomeIcon className='grammar__body-icon1' icon={faSpellCheck} />
                    Constant
                  </h3>
                  <FontAwesomeIcon className='grammar__body-icon' icon={faRightLong} />
                </Link>
              </Col>
              <Col span={6} offset={2} className=''>
                <Link to="/bocabularydetails" className='grammar__body-item'>
                  <h3>
                    <FontAwesomeIcon className='grammar__body-icon1' icon={faSpellCheck} />
                    Constant
                  </h3>
                  <FontAwesomeIcon className='grammar__body-icon' icon={faRightLong} />
                </Link>
              </Col>
              <Col span={6} offset={2} className=''>
                <Link to="/bocabularydetails" className='grammar__body-item'>
                  <h3>
                    <FontAwesomeIcon className='grammar__body-icon1' icon={faSpellCheck} />
                    Constant
                  </h3>
                  <FontAwesomeIcon className='grammar__body-icon' icon={faRightLong} />
                </Link>
              </Col>
              <Col span={6} offset={2} className=''>
                <Link to="/bocabularydetails" className='grammar__body-item'>
                  <h3>
                    <FontAwesomeIcon className='grammar__body-icon1' icon={faSpellCheck} />
                    Constant
                  </h3>
                  <FontAwesomeIcon className='grammar__body-icon' icon={faRightLong} />
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}
