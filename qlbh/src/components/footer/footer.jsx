import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'

export default function Footer() {
    return (
        <div className="footer wide">
            <div className="footer__heading row">design by DC4-Ext TIP</div>
            <div className="row footer__tilte ">
                <div className="col l-3 footer__menu">
                    <ul className="footer__list">
                        <li className="footer__item footer__item-menu">
                            <Link to="/" className="footer__link">Danh Mục</Link>
                        </li>
                        <li className="footer__item">
                            <Link to="/" className="footer__link">ACOUSTIC TREATMENT</Link>
                        </li>
                        <li className="footer__item">
                            <Link to="/" className="footer__link">AMPLIFIERS</Link>
                        </li>
                        <li className="footer__item">
                            <Link to="/" className="footer__link">AUDIO PROCESSING</Link>
                        </li>
                        <li className="footer__item">
                            <Link to="/" className="footer__link">BROADCAST &amp; RF</Link>
                        </li>
                    </ul>
                </div>
                <div className="col l-3 footer__menu">
                    <ul className="footer__list">
                        <li className="footer__item footer__item-menu">
                            <Link to="/" className="footer__link">INFORMATION</Link>
                        </li>
                        <li className="footer__item">
                            <Link to="/" className="footer__link">CABLES, WIRE &amp; CONNECTORS</Link>
                        </li>
                        <li className="footer__item">
                            <Link to="/" className="footer__link">CONTACTS</Link>
                        </li>
                        <li className="footer__item">
                            <Link to="/" className="footer__link">DELIVERY</Link>
                        </li>
                        <li className="footer__item">
                            <Link to="/" className="footer__link">PRIVACY POLICY</Link>
                        </li>
                    </ul>
                </div>
                <div className="col l-3 footer__menu">
                    <ul className="footer__list">
                        <li className="footer__item footer__item-menu">
                            <Link to="/" className="footer__link">ABOUT</Link>
                        </li>
                        <li className="footer__item">
                            <Link to="/" className="footer__link">HEADPHONES &amp; HEADSETS</Link>
                        </li>
                        <li className="footer__item">
                            <Link to="/" className="footer__link">INTERFACES &amp; CONVERTERS</Link>
                        </li>
                        <li className="footer__item">
                            <Link to="/" className="footer__link">MICROPHONES &amp; ACCESSORIES</Link>
                        </li>
                    </ul>
                </div>
                <div className="col l-3">
                    <ul className="footer__list">
                        <li className="footer__item footer__item-menu">
                            <a href='/' className="footer__link">POWER</a>
                        </li>
                        <li className="footer__item">
                            <a href='/' className="footer__link">PERSONAL MONITOR SYSTEMS</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )
}
