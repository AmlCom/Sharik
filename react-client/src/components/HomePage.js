import withRoot from './Categories/withRoot';
// --- Post bootstrap -----
import React from 'react';
import ProductCategories from './Categories/ProductCategories';
import { homedir } from 'os';

function HomePage() {
  return (
    <React.Fragment>

      <ProductCategories />

    </React.Fragment>
  );
  }

export default withRoot(HomePage)