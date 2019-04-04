import { NavItem } from './nav-item';


export const NAVBAR_LIST: NavItem[] = [
  {
    id: 1,
    title: 'upcoming tasks',
    current: true,
    router: '/profile',
    rightMenu: false,
    burgerMenu: true,
    hr: 'hr',
    dev: ''
  },
  {
    id: 2,
    title: 'issues',
    current: false,
    router: '',
    rightMenu: false,
    burgerMenu: true,
    hr: '',
    dev: 'dev'
  },
  {
    id: 3,
    title: 'contact info',
    current: false,
    router: 'contact-info',
    rightMenu: false,
    burgerMenu: true,
    hr: 'hr',
    dev: 'dev'
  },
  {
    id: 4,
    title: 'log out',
    current: false,
    router: '',
    rightMenu: true,
    burgerMenu: false,
    hr: 'hr',
    dev: 'dev',
    logout: true
  },
  {
    id: 5,
    title: 'my profile',
    current: false,
    router: 'my-profile',
    rightMenu: false,
    burgerMenu: true,
    hr: 'hr',
    dev: 'dev'
  },
  {
    id: 6,
    title: 'edit profile',
    current: false,
    router: '',
    rightMenu: true,
    burgerMenu: false,
    hr: 'hr',
    dev: ''
  },
  {
    id: 7,
    title: 'create user',
    current: false,
    router: '',
    rightMenu: false,
    burgerMenu: true,
    hr: 'hr',
    dev: ''
  }
];
