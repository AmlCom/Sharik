// import React, { Component } from 'react';

// const Home = () => {
//     return (
//         <h1>This is the home page </h1>

//     )
// }

// export default Home;



import withRoot from './Categories/withRoot';
// --- Post bootstrap -----
import React from 'react';
import ProductCategories from './Categories/ProductCategories';
import { homedir } from 'os';

function Home() {
  return (
    <React.Fragment>

      <ProductCategories />

    </React.Fragment>
  );
}

export default withRoot(Home);
