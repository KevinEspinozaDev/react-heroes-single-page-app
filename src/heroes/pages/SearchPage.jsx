import {HeroCard} from '../components/HeroCard';
import {useForm} from '../../hooks/useForm';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { getHeroesByName } from '../helpers/getHeroesByName';

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // Uso de libreria externa queryString
  const {q = ''} = queryString.parse(location.search);
  
  const heroes = getHeroesByName(q);

  const {searchText = '', onInputChange} = useForm({
    searchText : q,
  });
  
  const onSearchSubmit = (event) => {
    event.preventDefault();

    navigate(`?q=${ searchText }`);
  }

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />

          <form onSubmit={onSearchSubmit}>
            <input type="text" 
            placeholder="Search a hero"
            name="searchText" autoComplete="off"
            className="form-control" 
            value={searchText}
            onChange={onInputChange}
            />

            <button className="btn btn-primary">
              Search
            </button>
          </form>

        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {
            (q === '' && heroes.length === 0) 
            ? <div className="alert alert-primary animate__animated animate__fadeIn">
                Search a hero
              </div>

            : (heroes.length === 0) 
            && 
            <div className="alert alert-danger animate__animated animate__fadeIn">
              There's not no results for <b>{q}</b>
            </div>

          }
          

          

          {
            heroes.map(hero => {
              return <HeroCard key={hero.id} {...hero} />
            })
          }
        </div>
      </div>
      
    </>
  )
}
