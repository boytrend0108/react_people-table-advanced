import classNames from 'classnames';

type Props = {
  order: string | null;
  sort: string | null;
  name: string;
};
export const MySortArrow: React.FC<Props> = ({ order, sort, name }) => (
  <i
    className={classNames('fas', {
      'fa-sort': sort !== name,
      'fa-sort-up': sort === name && !order,
      'fa-sort-down': order && sort === name,
    })}
  />
);
