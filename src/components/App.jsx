import React, { useEffect, useState } from 'react';
import CategoryFilter from './CategoryFilter';
import PostList from './PostList';
import '../styles/index.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        if (Array.isArray(data.posts)) {
          setPosts(data.posts);
          const uniqueCategories = [
            ...new Set(
              data.posts.flatMap((post) => post.categories.map((category) => category.name))
            ),
          ].map((name, index) => ({ id: index, name }));
          setCategories(uniqueCategories);
        } else {
          console.error('Data fetched is not an array:', data.posts);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
    setCurrentPage(1); 
  };

  const filteredPosts = selectedCategories.length > 0
    ? posts.filter((post) =>
        post.categories.some((category) => selectedCategories.includes(category.name))
      )
    : posts;

  // Get current posts for the page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPosts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Posts</h1>
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />
      </header>
      <main>
        <PostList posts={currentPosts} />
        <nav className="pagination">
          <ul>
            {pageNumbers.map(number => (
              <li key={number} className={number === currentPage ? 'active' : ''}>
                <a onClick={() => paginate(number)} href="#!">
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </div>
  );
}

export default App;
