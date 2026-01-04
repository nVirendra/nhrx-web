export default function RotationPreview({ rotation }) {
  return (
    <div className="border rounded-lg p-4 bg-muted/40">
      <h4 className="font-semibold mb-3">Rotation Preview</h4>

      <div className="grid grid-cols-3 gap-3 text-sm">
        {Object.entries(rotation.dayShiftMap).map(([day, shift]) => (
          <div key={day} className="border rounded p-2 bg-white">
            <div className="font-medium">Day {day}</div>
            <div className="text-muted-foreground">{shift || "—"}</div>
          </div>
        ))}
      </div>

      {Object.keys(rotation.dayShiftMap).length !== rotation.cycleDays && (
        <p className="text-sm text-red-500 mt-3">
          ⚠ All days must be mapped before saving
        </p>
      )}
    </div>
  );
}
