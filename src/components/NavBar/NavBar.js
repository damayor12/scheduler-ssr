/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { colors } from '../../styles';

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;

  a {
    text-decoration: none;
  }
  a:last-child {
    margin-left: 1rem;
  }
`;
const StyledNavLink = styled(NavLink)`
  &.active {
    background: ${colors.primary};
    color: #000;
  }
  padding: 0.5rem 1rem;
`;

const NavBar = () => {
  return (
    <StyledNav>
      <StyledNavLink to="/" activeClassName="active" exact>
        Load
      </StyledNavLink>
      <StyledNavLink to="/schedule" activeClassName="active" exact>
        Schedule
      </StyledNavLink>
    </StyledNav>
  );
};

export default NavBar;
