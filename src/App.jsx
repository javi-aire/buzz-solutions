import { useState, useEffect, useRef } from 'react'
import Feed from './components/Feed';
import SearchBar from './components/SearchBar';
import Stack from 'react-bootstrap/Stack';
import fetchPosts from './utils/fetchPosts';
import './App.scss';

/**
 *
 * Main App Component 
 * - Handles data fetching/state mgmt
 * - Passes data to Feed Component
 * - Fetches more data when user reaches end of current feed
 * 
*/
function App() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [feed, setFeed] = useState([]);
  const [layout, setLayout] = useState('list');
  // observer ref for infinite scroll
  const observerTarget = useRef(null);


  const populateFeed = async (signal) => {
    setIsLoading(true);
    try {
      // fetches data then adds with 
      // the previous posts in state
      // fetch the posts
      const posts = await fetchPosts(signal);
      setFeed(prevPosts => [...prevPosts, ...posts]);
    } catch (err) {
      // logs an error if there is one
      // TODO: add error messaging for user display
      console.error(err)
    } finally {
      // set loading state to false after fetch is complete
      setIsLoading(false);
    }
    
  }

  useEffect(() => {
    // create an abort controller/signal for 
    // fetch cleanup (see return statement)
    const controller = new AbortController();
    const signal = controller.signal;
    // observer for infinite scroll
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          populateFeed(signal);
        }
      },
      { threshold: 1 }
    );

    const current = observerTarget.current;
    

    if (current) {
      observer.observe(current);
    }    

    return () => {
      controller.abort();
      if (current) {
        observer.unobserve(current);
      }      
    }
  }, [observerTarget]);

  const handleSearch = (searchValue) => {
    let tagArray = searchValue.split(',');

    fetchPosts(null, ['a','b','c'])
      .then(data => console.log('data:', data))
  }

  return (
    <Stack gap={3} className="app">
      <h1 className="app__title">Flickr Feed Viewer</h1>
      <div className="app__feedSearchWrapper feedSearchWrapper">
        <SearchBar handleClick={handleSearch} />
        <Feed className="feedSearchWrapper__feed" posts={feed} layout={layout} />
        {isLoading && <h2>Loading...</h2>}
        <div ref={observerTarget}></div>
      </div>
    </Stack>
  )
}

export default App
