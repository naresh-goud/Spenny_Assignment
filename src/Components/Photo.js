import React from 'react';

const Photo = ({ farm, serverID, id, secret, title }) => {
 
  return (
    <li>
      <img src={`https://farm${farm}.staticflickr.com/${serverID}/${id}_${secret}.jpg`} alt={title} />
    </li>
  );
}

export default Photo;