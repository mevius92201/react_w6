import { Outlet, Link, useNavigate } from "react-router";
import { useParams } from "react-router";

import NewsArticle from "./NewsArticle";
import axios from "axios";
import { useEffect, useState } from "react";
const { VITE_APP_API_BASE, VITE_APP_API_PATH } = import.meta.env;
// const newsCategory = 1;
function News() {
  const params = useParams();
  console.log(params);
  const { id } = params;
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);

  const getNewsList = async () => {
    try {
      const res = await axios.get(
        `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/articles`
      );
      setNewsList(res.data.articles);

      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getNewsList();
  }, []);

  function handleNavigate(e, news) {
    e.preventDefault();
    navigate("{/newsCategory}/{news.id}");
  }
  return (
    <>
      {newsList.map((news) => (
        <div className="news-list" key={news.id}>
          <h3 className="news-title">{news.title}</h3>
          <p className="news-description">{news.description}</p>
          <Link to={`/${news.id}`}></Link>
          <a href="#" onClick={(e) => handleNavigate(e, news)}></a>
        </div>
      ))}

      <Outlet />
    </>
  );
}
export default News;
