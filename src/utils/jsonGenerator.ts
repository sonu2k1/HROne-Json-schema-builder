import { SchemaField } from '@/types/schema';

export const generateJsonFromSchema = (fields: SchemaField[]): any => {
  const result: any = {};
  
  fields.forEach(field => {
    if (field.name.trim() === '') return;
    
    switch (field.type) {
      case 'String':
        result[field.name] = 'sample_string';
        break;
      case 'Number':
        result[field.name] = 42;
        break;
      case 'Nested':
        if (field.children && field.children.length > 0) {
          result[field.name] = generateJsonFromSchema(field.children);
        } else {
          result[field.name] = {};
        }
        break;
    }
  });
  
  return result;
};