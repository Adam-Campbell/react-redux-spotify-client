import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import * as ActionCreators from '../actions';
import { connect } from 'react-redux';
import SubNavigation from './SubNavigation';


const Navigation = props => (
    <div className="nav-container">
        <nav className="nav">
            <ul className="nav__list">
                <li className="nav__list-item">
                    <NavLink to="/search" className="nav__link" onClick={props.toggleNav}>Search</NavLink>
                </li>
                <li className="nav__list-item">
                    <NavLink to="/browse" className="nav__link" onClick={props.toggleNav}>Browse</NavLink>
                </li>
                <li className="nav__list-item">
                    <NavLink to="/me" className="nav__link" onClick={props.toggleNav}>Me</NavLink>
                </li>
                <SubNavigation 
                    artistInfo={props.artistInfo}
                    toggleNav={props.toggleNav} 
                />
                
            </ul>
        </nav>
    </div>
);

// class Navigation extends Component {

//     hideNav() {
//         document.getElementById('root').classList.remove('nav-open');
//     }

//     render() {
//         return (
//             <div className="nav-container">
//                 <nav className="nav">
//                     <ul className="nav__list">
//                         <li className="nav__list-item">
//                             <NavLink to="/search" className="nav__link" onClick={this.props.toggleNav}>Search</NavLink>
//                         </li>
//                         <li className="nav__list-item">
//                             <NavLink to="/browse" className="nav__link" onClick={this.props.toggleNav}>Browse</NavLink>
//                         </li>
//                         <li className="nav__list-item">
//                             <NavLink to="/me" className="nav__link" onClick={this.props.toggleNav}>Me</NavLink>
//                         </li>
//                         <SubNavigation 
//                             artistInfo={this.props.artistInfo}
//                             toggleNav={this.props.toggleNav} 
//                         />
                        
//                     </ul>
//                 </nav>
//             </div>
//         );
//     }
// }



const mapStateToProps = state => ({
    artistInfo: state.artistInfo,
    accessToken: state.accessToken.token
});

export default connect(
    mapStateToProps, 
    null, 
    null, 
    {pure: false}
)(Navigation);
