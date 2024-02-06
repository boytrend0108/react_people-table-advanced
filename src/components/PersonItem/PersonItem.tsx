import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  return (
    <tr data-cy="person">
      <td>
        <a href="#/people/pieter-haverbeke-1602">{person.name}</a>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName}</td>
      <td>{person.fatherName}</td>
    </tr>
  );
};
