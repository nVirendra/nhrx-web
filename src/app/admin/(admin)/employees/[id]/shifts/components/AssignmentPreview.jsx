export default function AssignmentPreview({ type, data }) {
  return (
    <div className="border rounded-lg p-4 bg-muted/30">
      <h4 className="font-semibold mb-2">Assignment Preview</h4>

      <pre className="text-xs bg-white p-3 rounded border overflow-auto">
{JSON.stringify(
  {
    assignmentType: type,
    ...data,
  },
  null,
  2
)}
      </pre>
    </div>
  );
}
