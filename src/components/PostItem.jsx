import React from 'react';

function PostItem({ post }) {
  return (
    <article className="post-item">
      <h2>{post.title}</h2>
      <p>{post.summary}</p>
      <div className="post-meta">
        <small>Categories: {post.categories.map(category => category.name).join(', ')}</small>
        <br />
        <small>Author: {post.author.name}</small>
        <img src={post.author.avatar} alt={`${post.author.name}'s avatar`} />
      </div>
    </article>
  );
}

export default PostItem;
