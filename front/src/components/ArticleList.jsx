import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getArticles,
  removeArticle,
  getCategoryByOneArticle,
} from "../services/api";
import { Link } from "react-router-dom";
//
// ArticleList component
//
export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles(); // Fetch all articles when component mounts
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      await removeArticle(id);
      await fetchArticles(); // refresh the list
    } catch (err) {
      setError("Failed to delete article.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (id) => navigate(`/articles/${id}`);

  const handleEdit = (id) => navigate(`/articles/${id}/edit`);

  const onCat = (catId) => navigate(`/categories/${catId}/articles`);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className='article-list'>
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={deleteArticle}
            onCat={onCat}
          />
        ))}
      </div>
    </>
  );
}

function ArticleCard({ article, onView, onEdit, onDelete, onCat }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoryByOneArticle(article.id);
        setCategories(data);
      } catch (err) {
        setError("Failed to load categories. Please try again.");
      }
    };
    fetchCategories();
  }, [article.id]);
  return (
    <div className='article-card'>
      <div className='article-title'>{article.title}</div>
      <div className='article-author'>
        By{" "}
        <Link to={`/journalists/${article.journalistId}/articles`}>
          {article.journalist}
        </Link>
      </div>

      <p className='article-author'>Click to view category</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          flexWrap: "wrap",
          width: "100%",
          padding: "10px",
        }}>
        {categories.map((cat) => {
          return (
            <button
              key={`${cat.id}`}
              onClick={() => onCat(cat.id)}
              className='button-tertiary'
              style={{
                padding: "0.5em",
                borderRadius: "1em",
                border: "solid 1px blue",
                color: "blue",
              }}>
              {cat.name}
            </button>
          );
        })}
      </div>

      <div className='article-actions'>
        <button className='button-tertiary' onClick={() => onEdit(article.id)}>
          Edit
        </button>
        <button
          className='button-tertiary'
          onClick={() => onDelete(article.id)}>
          Delete
        </button>
        <button className='button-secondary' onClick={() => onView(article.id)}>
          View
        </button>
      </div>
    </div>
  );
}
