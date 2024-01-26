import React from 'react';
import { ArrowLeft } from '../assets/svgs/0_index';

const RegisterHeader = () => {
  return (
    <header>
      <div>
        <ArrowLeft />
        <>그만두기</>
      </div>
      <progress></progress>
    </header>
  );
};

export default RegisterHeader;
