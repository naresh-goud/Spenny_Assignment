import React from 'react';

const NoResults = () => {

  return (
    <ul>
      <li className="not-found">
        <h2>No Results Found</h2>
        <p>Your search did not return any results. Please try again.</p>
      </li>
    </ul>
  );
}

export default NoResults;