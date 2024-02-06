import classNames from 'classnames';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

const CENTURIES = [16, 17, 18, 19];
const SEX = ['All', 'Male', 'Female'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('century');

  function setSearchWith(value: string) {
    const search = getSearchWith({ query: value || null }, searchParams);

    setSearchParams(search);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {SEX.map(el => (
          <NavLink
            key={el}
            className={classNames({
              'is-active':
                (el === 'All' && !sex) || el.at(0)?.toLowerCase() === sex,
            })}
            to={{
              search: getSearchWith({
                sex: el === 'All' ? null : el.slice(0, 1).toLowerCase(),
              }, searchParams),
            }}
          >
            {el}
          </NavLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={event => setSearchWith(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <NavLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                to={{
                  search: getSearchWith({
                    century: centuries.includes(century.toString())
                      ? centuries.filter(item => item !== century.toString())
                      : [...centuries, century],
                  }, searchParams),
                }}
              >
                {century}
              </NavLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <NavLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{ search: getSearchWith({ century: null }, searchParams) }}
            >
              All
            </NavLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith({
              sex: null,
              century: null,
              query: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
