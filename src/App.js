import React, { useEffect, useState } from 'react';

import Tmdb from './Tmdb';

import ItemsRow from './components/items-rows';
import FeaturedMovie from './components/featured-movie';
import Footer from './components/footer';
import MyList from './components/my-list';
import Originals from './components/originals-netflix';
import Categories from './components/categories';
import ContinueWatching from './components/continue-watch';

import './App.css';
import Header from './components/Header';

import loading from './assets/loading_netflix.gif';

function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const [myList, setMyList] = useState([]);
  const [originals, setOriginals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);

  useEffect(() => {

    //Pegando a lista toda
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegando a minha lista
      let getMylist = await Tmdb.getMyList();
      setMyList(getMylist);

      //Pegando os featured
      let getOriginals = await Tmdb.getOriginals();
      setOriginals(getOriginals);

      //Pegando as categorias
      let getCategories = await Tmdb.getCategoriesMovies();
      setCategories(getCategories);

      //Pegando Watching
      let getContinueWatching = await Tmdb.getContinueWatching();
      setContinueWatching(getContinueWatching);

      //Pegando os featured
      let featuredOriginals = getOriginals.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (featuredOriginals[0].items.results.length - 1));

      let chosen = featuredOriginals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      setFeaturedData(chosenInfo);

    }
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 50) {
        setBlackHeader(true);
      }
      else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="my-list">
        {myList.map((item, key) => (
          <MyList
            key={key}
            title={item.title}
            items={item.items}
          />
        ))}
      </section>

      <section className="continue-watching">
        {continueWatching.map((item, key) => (
          <ContinueWatching
            key={key}
            title={item.title}
            items={item.items}
          />
        ))}
      </section>

      <section className="lists">
        {movieList.map((item, key) => (
          <ItemsRow
            key={key}
            title={item.title}
            items={item.items}
          />
        ))}
      </section>

      <section className="originals">
        {originals.map((item, key) => (
          <Originals
            key={key}
            title={item.title}
            items={item.items}
          />
        ))}
      </section>

      <section className="categories">
        {categories.map((item, key) => (
          <Categories
            key={key}
            title={item.title}
            items={item.items}
          />
        ))}
      </section>

      <Footer />

      {movieList.length <= 0 &&
        <div className='loading'>
          <img src={loading} alt="Loading Netflix" />
        </div>
      }

    </div>
  );
}

export default App;
