import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface JsonPreviewProps {
  data: any;
}

export const JsonPreview = ({ data }: JsonPreviewProps) => {
  return (
    <Card className="h-full bg-black border-gray-700">
      <CardHeader>
        <CardTitle className="text-green-400">JSON Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-black p-4 rounded-md overflow-auto max-h-[calc(100vh-200px)] text-sm text-green-400 font-mono border border-gray-700">
          {JSON.stringify(data, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
};