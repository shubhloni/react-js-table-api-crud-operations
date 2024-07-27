import React, { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();

      setAllPosts(data);
      // console.log(data)
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    setPosts(allPosts);
  }, [allPosts]);

  const deletePostHandler = (postIndex) => {
    const newPosts = [...posts];
    newPosts.splice(postIndex, 1);
    // console.log(newPosts)
    setPosts(newPosts);
  };

  const searchPostHandler = (e) => {
    const searchKey = e.target.value.toLowerCase();
    const newPosts = [...allPosts];
    const filteredPosts = newPosts.filter((post) => {
      return post.title.toLowerCase().includes(searchKey);
    });
    setPosts(filteredPosts);
    // console.log(filteredPosts);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for title.."
        onChange={searchPostHandler}
      />
      <table>
        <th>
          <td> Post Id</td>
          <td> Post Title</td>
          <td> Action</td>
        </th>
        {posts.map((post, index) => (
          <tr>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>
              {' '}
              <button onClick={() => deletePostHandler(index)}>
                {' '}
                delete
              </button>{' '}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
