import { Router } from "express";
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getAllArticlesByOneJournalist,
  getAllArticlesByOneCategory,
  getAllCategories,
  getCategoryByOneArticle,
} from "../controllers/articleController.js";

const articleRouter = Router();
articleRouter.get("/articles/", getAllArticles);
articleRouter.get("/articles/:id", getArticleById);
articleRouter.post("/articles/", createArticle);
articleRouter.put("/articles/:id", updateArticle);
articleRouter.delete("/articles/:id", deleteArticle);

articleRouter.get("/journalists/:id/articles", getAllArticlesByOneJournalist);
articleRouter.get("/categories/:id/articles", getAllArticlesByOneCategory);
articleRouter.get("/categories", getAllCategories);
articleRouter.get("/articles/:id/categories", getCategoryByOneArticle);

export default articleRouter;
