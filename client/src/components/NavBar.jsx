import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <div >
    <div>
        <Link to="/home">Henry Dogs</Link>
    </div>
    <div>
        <Link to="/dog"><h2>Create your Dog</h2></Link>
    </div>
    <div >
        <SearchBar />
    </div>
</div>
  )
}
