type Param = number | string;

type Params = {
  [key: string]: Param | Param[] | null;
};

export function getSearchWith(
  params: Params,
  currentSearch?: URLSearchParams | string,
): string {
  const newParams = new URLSearchParams(currentSearch);

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(params)) {
    switch (true) {
      case value === null:
        newParams.delete(key);
        break;

      case Array.isArray(value):
        newParams.delete(key);
        value.forEach(item => newParams.append(key, item.toString()));
        break;

      default:
        newParams.set(key, value.toString());
    }
  }

  return newParams.toString();
}
