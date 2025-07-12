import { useState } from 'react';
// import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
const routes = [
    { title: 'Home', icon: 'fas-solid fa-house', path: '/' },
    { title: 'Sales', icon: 'chart-line', path: '/sales' },
    { title: 'Costs', icon: 'chart-column', path: '/costs' },
    { title: 'Payments', icon: 'wallet', path: '/payments' },
    { title: 'Finances', icon: 'chart-pie', path: '/finances' },
    { title: 'Messages', icon: 'envelope', path: '/messages' },
];

const bottomRoutes = [
    { title: 'Settings', icon: 'sliders', path: '/settings' },
    { title: 'Support', icon: 'phone-volume', path: '/support' },
];



const SidebarContainer = styled.aside`
  position: absolute;
  top: 2vh;
  left: 2vw;
  width: ${p => p.opened ? '200px' : '60px'};
  
  background-color: var(--color-sidebar-background-${p => p.color}-default);
  color:            var(--color-text-${p => p.color}-default);
  display: flex;
  flex-direction: column;
  transition: width .3s ease, background-color .3s ease;
  height: 90vh;
  border-radius: 10px;
`;

const Section = styled.div`
  padding: 0;
  & + & { margin-top: 24px; }
//  border: 1px solid black;
   border-radius: 10px;

`;

const LogoSection = styled(Section)`
  display: flex;
  align-items: center;
  padding: 16px;
  
  img {
    width: 24px;
    height: 24px;
    margin-right: ${p => p.opened ? '8px' : '0'};
    transition: margin .3s ease;
  }
  span {
    display: ${p => p.opened ? 'inline' : 'none'};
    font-weight: 700;
    color: var(--color-text-logo-${p => p.color}-default);
    transition: opacity .3s ease;
  }
`;

const Toggle = styled.div`
position: absolute;
left: ${p => p.opened ? '190px' : '70px'} ;
transition: left .3s ease, background-color .3s ease;
width: 20px;
height:20px;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;


// background: ${p => p.opened ? '#e2e8f0' : '#f9f9f7' } ;

  background-color: ${p => 
    `var(--color-button-background-${p.color}-${p.opened ? 'active' : 'default'})`
  };


  cursor: pointer;
  svg {
  
    transition: transform .3s ease;
    transform: rotate(${p => p.opened ? '180deg' : '0deg'});
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 12px 18px;
  cursor: pointer;
  border-radius: 9px;
  transition: background-color .2s ease, color .2s ease;

  &:hover {
//   border: 1px solid black;
  border-radius: 9px;
    background-color: var(--color-sidebar-background-${p => p.color}-hover);
    color:            var(--color-text-${p => p.color}-hover);
  }

  ${p => p.active && css`
    background-color: var(--color-sidebar-background-${p.color}-active);
    color:            var(--color-text-${p.color}-active);
  `}

  svg {
  flex-shrink: 0;
    // margin-right: ${p => p.opened ? '8px' : '0'};
    transition: margin .3s ease;
  }
  span {
    max-width: ${p => p.opened ? '200px' : '0'};
    opacity:   ${p => p.opened ?   1      : 0};
    overflow: hidden;
    white-space: nowrap;
    transition: max-width .3s ease, opacity .2s ease;
  }
`;

export default function Sidebar({ color }) {
  const [opened, setOpened] = useState(true);
  const [active, setActive] = useState('/');

  return (
    <SidebarContainer color={color} opened={opened}>
      <LogoSection color={color} opened={opened}>
        <img src={logo} alt="Logo"/>
        <span>TensorFlow</span>
        <Toggle opened={opened}  color={color}  onClick={() => setOpened(o => !o)}>
          <FontAwesomeIcon icon={"angle-right"} />
        </Toggle>
      </LogoSection>

      <Section>
        {routes.map(r => (
          <Item
            key={r.path}
            color={color}
            opened={opened}
            active={r.path === active}
            onClick={() => setActive(r.path)}
          >
            <FontAwesomeIcon icon={r.icon} />
            <span>{r.title}</span>
          </Item>
        ))}
      </Section>

      <Section style={{ marginTop: 'auto' }}>
        {bottomRoutes.map(r => (
          <Item
            key={r.path}
            color={color}
            opened={opened}
            active={r.path === active}
            onClick={() => setActive(r.path)}
          >
            <FontAwesomeIcon icon={r.icon} />
            <span>{r.title}</span>
          </Item>
        ))}
      </Section>
    </SidebarContainer>
  );
}

Sidebar.propTypes = {
  color: PropTypes.oneOf(['light','dark']),
};