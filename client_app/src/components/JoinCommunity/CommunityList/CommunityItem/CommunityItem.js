import React from 'react';
import './style.css';

const CommunityItem = ({comm, onChoose}) => (
  <div className='CommunityItem' onClick={() => onChoose(comm)}>{comm.name}</div>
);

export default CommunityItem;
