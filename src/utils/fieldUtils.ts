export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const createNewField = (name: string = '', type: 'String' | 'Number' | 'Nested' = 'String') => {
  return {
    id: generateId(),
    name,
    type,
    children: type === 'Nested' ? [] : undefined,
  };
};