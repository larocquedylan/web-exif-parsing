import React from 'react';
import IconGithubAlt from '../ui/github';
import IconLinkedinLine from '../ui/linkedin';

import IconTwitterAlt from '../ui/twitter';
import { HiOutlineMail } from 'react-icons/hi';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <nav className='px-4 pt-4'>
      <div className='max-w-custom mx-auto flex justify-between items-center py-2'>
        <a className='text-custom5 font-medium tracking-wider text-lg' href='/'></a>
        <div className='flex space-x-2'>
          <a
            href='mailto:larocque.d11@gmail.com'
            target='_blank'
            className='p-1 rounded-md border border-white  hover:text-gray hover:border-gray transition-colors duration-300 text-white font-extralight'
            rel='noreferrer'
          >
            <HiOutlineMail />
          </a>
          <a
            href='https://github.com/larocquedylan'
            target='_blank'
            className='p-1 rounded-md border border-white  hover:text-gray hover:border-gray transition-colors duration-300'
            rel='noreferrer'
          >
            <IconGithubAlt />
          </a>
          <a
            href='https://www.linkedin.com/in/dylan-larocque-/'
            target='_blank'
            className='p-1 rounded-md border border-white  hover:text-gray hover:border-gray transition-colors duration-300'
            rel='noreferrer'
          >
            <IconLinkedinLine />
          </a>
          <a
            href='https://twitter.com/LaRocque_Dylan'
            target='_blank'
            className='p-1 rounded-md border border-white hover:border-gray hover:border-gray transition-colors duration-300  hover:text-gray '
            rel='noreferrer'
          >
            <IconTwitterAlt />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
