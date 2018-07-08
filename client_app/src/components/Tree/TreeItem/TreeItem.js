import React from 'react';
import {TimelineEvent} from 'react-event-timeline'

const TreeItem = ({level, profilePic, bgColor, textColor}) => (
  <TimelineEvent icon={level} title={profilePic}
    style={{marginLeft: "-9px", marginBottom: "20px"}}
    bubbleStyle={{backgroundColor: bgColor, marginLeft: "4px"}} iconColor={textColor}
  />
);

export default TreeItem;
