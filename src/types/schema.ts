export interface SchemaField {
  id: string;
  name: string;
  type: 'String' | 'Number' | 'Nested';
  children?: SchemaField[];
}

export interface SchemaFormData {
  fields: SchemaField[];
}