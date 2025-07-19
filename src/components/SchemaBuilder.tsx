import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { SchemaField, SchemaFormData } from '@/types/schema';
import { FieldBuilder } from './FieldBuilder';
import { JsonPreview } from './JsonPreview';
import { generateJsonFromSchema } from '@/utils/jsonGenerator';
import { createNewField } from '@/utils/fieldUtils';

export const SchemaBuilder = () => {
  const [fields, setFields] = useState<SchemaField[]>([createNewField()]);
  const [jsonOutput, setJsonOutput] = useState<any>({});

  const { handleSubmit } = useForm<SchemaFormData>({
    defaultValues: {
      fields: fields,
    },
  });

  useEffect(() => {
    const output = generateJsonFromSchema(fields);
    setJsonOutput(output);
  }, [fields]);

  const handleAddField = () => {
    const newField = createNewField();
    setFields((prev) => [...prev, newField]);
  };

  const handleUpdateField = (index: number, updatedField: SchemaField) => {
    setFields((prev) => {
      const newFields = [...prev];
      newFields[index] = updatedField;
      return newFields;
    });
  };

  const handleDeleteField = (index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddNestedField = (parentId: string, newField: SchemaField) => {
    setFields((prev) => {
      const addNestedFieldRecursively = (fields: SchemaField[]): SchemaField[] => {
        return fields.map((field) => {
          if (field.id === parentId) {
            return {
              ...field,
              children: [...(field.children || []), newField],
            };
          }
          if (field.children) {
            return {
              ...field,
              children: addNestedFieldRecursively(field.children),
            };
          }
          return field;
        });
      };
      return addNestedFieldRecursively(prev);
    });
  };

  const handleDeleteNestedField = (parentId: string, fieldId: string) => {
    setFields((prev) => {
      const deleteNestedFieldRecursively = (fields: SchemaField[]): SchemaField[] => {
        return fields.map((field) => {
          if (field.id === parentId) {
            return {
              ...field,
              children: (field.children || []).filter((child) => child.id !== fieldId),
            };
          }
          if (field.children) {
            return {
              ...field,
              children: deleteNestedFieldRecursively(field.children),
            };
          }
          return field;
        });
      };
      return deleteNestedFieldRecursively(prev);
    });
  };

  const handleUpdateNestedField = (parentId: string, updatedField: SchemaField) => {
    setFields((prev) => {
      const updateNestedFieldRecursively = (fields: SchemaField[]): SchemaField[] => {
        return fields.map((field) => {
          if (field.id === parentId) {
            return {
              ...field,
              children: (field.children || []).map((child) =>
                child.id === updatedField.id ? updatedField : child
              ),
            };
          }
          if (field.children) {
            return {
              ...field,
              children: updateNestedFieldRecursively(field.children),
            };
          }
          return field;
        });
      };
      return updateNestedFieldRecursively(prev);
    });
  };

  const onSubmit = (data: SchemaFormData) => {
    console.log('Schema data:', data);
    console.log('Generated JSON:', jsonOutput);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">JSON Schema Builder</h1>
          <p className="text-muted-foreground">
            Build dynamic JSON schemas with nested structures and real-time preview
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Schema Builder Section */}
          <div className="space-y-4">
            <Card className="h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 flex-shrink-0">
                <CardTitle>Build Your Schema</CardTitle>
                <Button onClick={handleAddField} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Field
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {fields.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No fields yet. Click "Add Field" to get started.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {fields.map((field, index) => (
                        <FieldBuilder
                          key={field.id}
                          field={field}
                          onUpdateField={(updatedField) => handleUpdateField(index, updatedField)}
                          onDeleteField={() => handleDeleteField(index)}
                          onAddNestedField={handleAddNestedField}
                          onDeleteNestedField={handleDeleteNestedField}
                          onUpdateNestedField={handleUpdateNestedField}
                        />
                      ))}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* JSON Preview Section */}
          <div className="space-y-4">
            <JsonPreview data={jsonOutput} />
          </div>
        </div>
      </div>
    </div>
  );
};