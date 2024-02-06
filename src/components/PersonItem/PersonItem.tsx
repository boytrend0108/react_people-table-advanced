import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Parents } from '../../types/Parents';

type Props = {
  person: Person;
  parents: Parents;
};

export const PersonItem: React.FC<Props> = ({ person, parents }) => {
  const { mother, father } = parents;
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={person.slug === slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          to={`${person.slug}`}
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
              to={`${mother.slug}`}
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
              to={`${father.slug}`}
            >
              {person.fatherName || '-'}
            </Link>
          )
          : (<p>{person.fatherName || '-'}</p>)}
      </td>
    </tr>
  );
};
