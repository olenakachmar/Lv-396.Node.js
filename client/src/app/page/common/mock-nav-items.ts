import { NavItem } from './nav-item';

export const NAVBAR_LIST: NavItem[] = [
  {
    id: 1,
    title: 'upcoming tasks',
    current: true,
    router: '/profile',
    rightMenu: false,
    burgerMenu: true,
    hr: true,
    developer: true
    
  },
  {
    id: 2,
    title: 'issues',
    current: false,
    router: '',
    rightMenu: false,
    burgerMenu: true,
    hr: false,
    developer: true
  },
  {
    id: 3,
    title: 'contact info',
    current: false,
    router: 'contact-info',
    rightMenu: false,
    burgerMenu: true,
    hr: true,
    developer: true
  },
  {
    id: 4,
    title: 'Log Out',
    current: false,
    router: '',
    rightMenu: true,
    burgerMenu: false,
    hr: true,
    developer: true
  },
  {
    id: 5,
    title: 'My profile',
    current: false,
    router: '',
    rightMenu: true,
    burgerMenu: true,
    hr: false,
    developer: true
  },
  {
    id: 6,
    title: 'Edit Profile',
    current: false,
    router: '',
    rightMenu: true,
    burgerMenu: false,
    hr: true,
    developer: false
  },
  {
    id: 7,
    title: 'create user',
    current: false,
    router: '',
    rightMenu: false,
    burgerMenu: true,
    hr: true,
    developer: true
  }
];
