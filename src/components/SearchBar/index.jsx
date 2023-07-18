import { useState, useEffect, useRef } from 'react';
import Post from '../Post';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import './SearchBar.scss';

/**
 *
 * SearchBar Component 
 * - Handles data fetching/state mgmt
 * - Passes data to SearchBar Component
 * - Fetches more data when user reaches end of current feed
 * 
*/
const SearchBar = ({ className, handleClick }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = event => {
    const { value } = event.target;

    setSearchInput(value);
  }
  return (
    <div className="d-flex flex-column justify-content-center mb-4">
      <Form.Floating className="d-inline-flex">
        <Form.Control 
          placeholder="summer, beach, ocean" 
          className="searchbar__input lh-base" 
          type="text" 
          id="imageSearchbar" 
          aria-describedby="searchHelpBlock"
          onChange={handleChange}
          value={searchInput}
        />
        <label className="searchbar__label" htmlFor="imageSearchbar">Tag Search</label>
        <Button className="searchbar__submitBtn ms-3" variant="outline-primary" size="lg" onClick={() => handleClick(searchInput)}>Submit</Button>
      </Form.Floating>
      <Form.Text className="mx-auto" id="searchHelpBlock" muted>
        Please enter tags to search with, separated by a comma.
      </Form.Text>
    </div>      
  )
}


export default SearchBar;