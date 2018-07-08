import React from 'react';
import './style.css';

const CommunityItem = ({comm, onChoose}) => (
  <div className='CommunityItem' onClick={() => onChoose(comm)}>
    <div className='CommunityItem-pic'><img src={comm.pic} alt='' /></div>
    <div className='CommunityItem-name'>{comm.name}</div>
  </div>
);

export default CommunityItem;
