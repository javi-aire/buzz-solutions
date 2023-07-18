import { useState, useEffect, useRef } from 'react';
import Post from '../Post';
import Stack from 'react-bootstrap/Stack';
import './Feed.scss';

/**
 *
 * Feed Component 
 * - Handles data fetching/state mgmt
 * - Passes data to Feed Component
 * - Fetches more data when user reaches end of current feed
 * 
*/
const Feed = ({ className, posts, layout }) => {

  return (
    <Stack className={className} gap={4}>
      {posts.map(post => {
        const { author_id, author, description, link, media, published, tags, title } = post;

        return (
          <Post
            key={author_id} 
            id={author_id}
            author={author}
            link={link}
            caption={description}
            title={title ?? ''}
            datePosted={published}
            image={media}
            tags={tags ?? ''}
          />
        )
      })}      
    </Stack>
  )
}

export default Feed;