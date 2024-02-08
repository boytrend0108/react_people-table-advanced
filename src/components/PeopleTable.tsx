import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { Parents } from '../types/Parents';
import { PersonItem } from './PersonItem';
import { getSearchWith } from '../utils/searchHelper';
import { MySortArrow } from './UI/MySortArrow';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  function findParents(person: Person): Parents {
    return {
      father: people.find(item => person.fatherName === item.name) || null,
      mother: people.find(item => person.motherName === item.name) || null,
    };
  }

  function setFiltersParams(filter: string): string {
    if (filter !== sort) {
      return getSearchWith({ sort: filter, order: null }, searchParams);
    }

    if (filter === sort && order) {
      return getSearchWith({ sort: null, order: null }, searchParams);
    }

    return getSearchWith({ order: 'desc' }, searchParams);
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <Link
                to={{
                  search: setFiltersParams('name'),
                }}
              >
                <span className="icon">
                  <MySortArrow order={order} sort={sort} name="name" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  search: setFiltersParams('sex'),
                }}
              >
                <span className="icon">
                  <MySortArrow order={order} sort={sort} name="sex" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  search: setFiltersParams('born'),
                }}
              >
                <span className="icon">
                  <MySortArrow order={order} sort={sort} name="born" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  search: setFiltersParams('died'),
                }}
              >
                <span className="icon">
                  <MySortArrow order={order} sort={sort} name="died" />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonItem
            key={person.slug}
            person={person}
            parents={findParents(person)}
          />
        ))}
      </tbody>

    </table>
  );
};
