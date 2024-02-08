import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

type SortParams = keyof Person | null;

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  function getPreparedPeople(
    initialPeople: Person[],
  ): Person[] {
    const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('century');
    const query = searchParams.get('query')?.toLowerCase() || '';
    const sort = searchParams.get('sort') as SortParams;
    const order = searchParams.get('order');

    const filteredPeople = initialPeople.filter(person => {
      const matchSex = !sex || person.sex === sex;

      const matchCentury
        = !centuries.length
        || centuries.includes(person.born.toString().slice(0, 2));

      const matchQuery
        = person.name.toLowerCase().includes(query)
        || person.motherName?.toLowerCase().includes(query)
        || person.fatherName?.toLowerCase().includes(query);

      return matchQuery && matchCentury && matchSex;
    });

    if (sort) {
      const sortedPeople = filteredPeople
        .sort((person1: Person, person2: Person) => {
          const value1 = person1[sort];
          const value2 = person2[sort];

          if (typeof value1 === 'string' && typeof value2 === 'string') {
            return value1.toLowerCase().localeCompare(value2.toLowerCase());
          }

          if (typeof value1 === 'number' && typeof value2 === 'number') {
            return value1 - value2;
          }

          return 0;
        });

      return order ? sortedPeople.reverse() : sortedPeople;
    }

    return filteredPeople;
  }

  const preparedPeople = getPreparedPeople(people);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !!people.length && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading
                ? (<Loader />)
                : (
                  <>
                    {error
                      ? (
                        <p data-cy="peopleLoadingError">Something went wrong</p>
                      )
                      : (<PeopleTable people={preparedPeople} />)}
                  </>
                )}

              {!people.length && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!preparedPeople.length && !loading && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
