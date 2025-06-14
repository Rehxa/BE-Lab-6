//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//

import { pool } from "../utils/database.js";
// Get all articles
export async function getArticles() {
  // const [rows] = await pool.query("SELECT * FROM articles");
  const [rows] = await pool.query(
    "SELECT a.* , j.name AS journalist, j.id AS journalistId FROM articles a JOIN journalists j ON a.journalistId = j.id"
  );
  return rows;
}

// Get one article by ID
// Exercise 2
// export async function getArticleById(id) {
//   // TODO
//   const [rows] = await pool.query("SELECT * FROM articles WHERE id = ?", [id]);
//   return rows[0];
// }

// Create a new article
export async function createArticle(article) {
  const [result] = await pool.query(
    "INSERT INTO articles (title, content, journalist, category) VALUES (?, ?, ?, ?)",
    [article.title, article.content, article.journalist, article.category]
  );
  let id = result.insertId;
  return getArticleById(id);
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
  const [result] = await pool.query(
    "UPDATE articles SET title = ?, content =?, journalist=?, category=? WHERE id = ?",
    [
      updatedData.title,
      updatedData.content,
      updatedData.journalist,
      updatedData.category,
      id,
    ]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return getArticleById(id);
}

// Delete an article by ID
export async function deleteArticle(id) {
  const [result] = await pool.query("DELETE FROM articles WHERE id = ?", [id]);
  return { id };
}

// Exercise 3
export async function getArticleById(id) {
  const [rows] = await pool.query(
    "SELECT a.* ,  j.name AS journalist, j.id AS journalistId FROM articles a JOIN journalists j ON a.journalistId = j.id WHERE a.id = ?",
    [id]
  );
  return rows[0];
}

export async function getAllArticlesByOneJournalist(id) {
  const [rows] = await pool.query(
    "SELECT a.* , j.name AS journalist, j.id AS journalistId FROM articles a JOIN journalists j ON a.journalistId = j.id WHERE j.id = ?",
    [id]
  );
  return rows;
}

//Exercise 4
export async function getAllCategories() {
  const [rows] = await pool.query("SELECT * FROM categories");
  return rows;
}

export async function getAllArticlesByOneCategory(id) {
  const [rows] = await pool.query(
    "SELECT a.* , c.name AS category, c.id AS categoryId, j.name AS journalist, j.id AS journalistId FROM articles a JOIN articles_categories ac ON a.id = ac.articleId JOIN categories c ON ac.categoryId = c.id JOIN journalists j ON a.journalistId = j.id WHERE c.id = ?",
    [id]
  );
  return rows;
}

export async function getCategoryByOneArticle(id) {
  const [rows] = await pool.query(
    "SELECT c.* FROM categories c JOIN articles_categories ac ON c.id = ac.categoryId WHERE ac.articleId = ?",
    [id]
  );
  return rows;
}
