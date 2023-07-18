import { apiUrl } from './constants';

// data fetch (abstracted for infinite scroll purposes)
const fetchPosts = async (abortSignal, search = []) => {
  let signal = abortSignal;
  if(signal === null) {
    const controller = new AbortController();
    signal = controller.signal;
  }
  const resp = await fetch(`${apiUrl}/${search.length > 0 ? `api/search=${search.join(',')}` : ''}`, { signal });
  const posts = await resp.json();
    
  return posts;
}

export default fetchPosts;