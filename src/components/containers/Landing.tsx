import React, {useState, useEffect} from 'react';
import Hero from '../Hero';
import StoreList from '../StoreList';
import { getStores } from '../services/api';
import ProductList from '../ProductList';

export default function Landing() {
  return (
    <React.Fragment>
      <Hero />
      <StoreList max={3}/>
      <ProductList max={3}/>
    </React.Fragment>
  );
}