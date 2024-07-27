import React from 'react';

function PostList({ posts }) {
  return (
    <ol className="post-list">
      {posts.map((post) => (
        <li key={post.id} className="post-item">
          <h2>{post.title}</h2>
          <div className="post-meta">
            <img src={post.author.avatar} alt={`${post.author.name}'s avatar`} />
            <span>{post.author.name}</span> | <span>{new Date(post.publishDate).toLocaleDateString()}</span>
          </div>
          <p>{post.summary}</p>
        </li>
      ))}
    </ol>
  );
}

export default PostList;
