import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { Parents } from '../types/Parents';

type Props = {
  person: Person;
  parents: Parents;
};

export const PersonItem: React.FC<Props> = ({ person, parents }) => {
  const { mother, father } = parents;
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      className={person.slug === slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          to={{
            pathname: person.slug,
            search: searchParams.toString(),
          }}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother
          ? (
            <Link
              to={{
                pathname: mother.slug,
                search: searchParams.toString(),
              }}
              className="has-text-danger"
            >
              {person.motherName || '-'}
            </Link>
          )
          : (<p>{person.motherName || '-'}</p>)}

      </td>
      <td>
        {father
          ? (
            <Link
              to={{
                pathname: father.slug,
                search: searchParams.toString(),
              }}
            >
              {person.fatherName || '-'}
            </Link>
          )
          : (<p>{person.fatherName || '-'}</p>)}
      </td>
    </tr>
  );
};
