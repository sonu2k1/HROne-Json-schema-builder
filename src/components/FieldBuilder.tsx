import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import { SchemaField } from '@/types/schema';
import { createNewField } from '@/utils/fieldUtils';

interface FieldBuilderProps {
  field: SchemaField;
  onUpdateField: (field: SchemaField) => void;
  onDeleteField: () => void;
  onAddNestedField?: (parentId: string, newField: SchemaField) => void;
  onDeleteNestedField?: (parentId: string, fieldId: string) => void;
  onUpdateNestedField?: (parentId: string, updatedField: SchemaField) => void;
  depth?: number;
}

export const FieldBuilder = ({
  field,
  onUpdateField,
  onDeleteField,
  onAddNestedField,
  onDeleteNestedField,
  onUpdateNestedField,
  depth = 0,
}: FieldBuilderProps) => {
  const [localField, setLocalField] = useState<SchemaField>(field);

  // Update local field when prop changes
  useEffect(() => {
    setLocalField(field);
  }, [field]);

  const handleNameChange = (name: string) => {
    const updatedField = { ...localField, name };
    setLocalField(updatedField);
    onUpdateField(updatedField);
  };

  const handleTypeChange = (type: 'String' | 'Number' | 'Nested') => {
    const updatedField = {
      ...localField,
      type,
      children: type === 'Nested' ? (localField.children || []) : undefined,
    };
    setLocalField(updatedField);
    onUpdateField(updatedField);
  };

  const handleAddNestedField = () => {
    if (field.type === 'Nested' && onAddNestedField) {
      const newField = createNewField();
      onAddNestedField(field.id, newField);
    }
  };

  const handleUpdateNestedField = (updatedNestedField: SchemaField) => {
    if (onUpdateNestedField) {
      onUpdateNestedField(field.id, updatedNestedField);
    }
  };

  const handleDeleteNestedField = (nestedFieldId: string) => {
    if (onDeleteNestedField) {
      onDeleteNestedField(field.id, nestedFieldId);
    }
  };

  const marginLeft = depth * 24;

  return (
    <div className="space-y-2" style={{ marginLeft: `${marginLeft}px` }}>
      <Card className="border-l-4 border-l-primary/20">
        <CardContent className="pt-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Input
                placeholder="Field name"
                value={localField.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="h-9"
              />
            </div>
            <div className="w-32">
              <Select value={localField.type} onValueChange={handleTypeChange}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="String">String</SelectItem>
                  <SelectItem value="Number">Number</SelectItem>
                  <SelectItem value="Nested">Nested</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {field.type === 'Nested' && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddNestedField}
                className="h-9 px-3"
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onDeleteField}
              className="h-9 px-3 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {field.type === 'Nested' && field.children && (
        <div className="space-y-2">
          {field.children.map((nestedField) => (
            <FieldBuilder
              key={nestedField.id}
              field={nestedField}
              onUpdateField={handleUpdateNestedField}
              onDeleteField={() => handleDeleteNestedField(nestedField.id)}
              onAddNestedField={onAddNestedField}
              onDeleteNestedField={onDeleteNestedField}
              onUpdateNestedField={onUpdateNestedField}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};