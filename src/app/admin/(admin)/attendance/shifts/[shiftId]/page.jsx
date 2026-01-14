"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import {
  Card, CardHeader, CardTitle, CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

/* ---------------- DEFAULT POLICY ---------------- */
const defaultPolicy = {
  graceInMinutes: 10,
  graceOutMinutes: 5,
  punchInWindowMinutes: 30,
  checkoutAfterMinutes: 240,
  lateAfterMinutes: 15,
  lateMarksToHalfDay: 3,
  lateMarksToAbsent: 6,
  minHalfDayMinutes: 270,
  minFullDayMinutes: 480,
  otAfterMinutes: 30,
  minOTMinutes: 30,
  maxOTMinutes: 120,
  autoMarkAbsent: true,

  weekoffConfig: {
    Sun: ["1st", "2nd", "3rd", "4th", "5th"], // default
  },
};


const SHIFT_RULE_MATRIX = {
  fixed: {
    disable: [],

  },
  flexible: {
    disable: [
      "graceInMinutes",
      "graceOutMinutes",
      "punchInWindowMinutes",
      "checkoutAfterMinutes",
      "lateAfterMinutes",
      "lateMarksToHalfDay",
      "lateMarksToAbsent",
      "otAfterMinutes",
      "minOTMinutes",
      "maxOTMinutes",
    ],

  },
  rotational: {
    disable: Object.keys(defaultPolicy),

  },
};


const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEK_OCCURRENCES = ["1st", "2nd", "3rd", "4th", "5th"];

export default function ShiftSettingsPage() {
  const { shiftId } = useParams();

  /* TEMP SHIFT TYPE LOGIC (replace with API later) */
  const shiftType = shiftId?.startsWith("flex")
    ? "flexible"
    : shiftId?.startsWith("rot")
      ? "rotational"
      : "rotational";

  const [enableLateMarks, setEnableLateMarks] = useState(false);
  const [enableOvertime, setEnableOvertime] = useState(false);
  const [enableWeekdayPartial, setEnableWeekdayPartial] = useState(false);

  const [policy, setPolicy] = useState(defaultPolicy);


  /* ---------------- APPLY RULES ---------------- */
  useEffect(() => {
    const config = SHIFT_RULE_MATRIX[shiftType];
    if (!config) return;

    setPolicy(prev => {
      const updated = { ...prev };

      config.disable.forEach(key => {
        if (key === "weekoffConfig") {
          updated.weekoffConfig = {}; // ALWAYS object
        }
        else if (Array.isArray(prev[key])) {
          updated[key] = [];      //  arrays stay arrays
        } else {
          updated[key] = null;    // numbers / booleans can be null
        }
      });

      return updated;
    });
  }, [shiftType]);



  const [breaks, setBreaks] = useState([
    {
      breakName: "",
      breakStart: "",
      breakEnd: "",
      isPaid: false,
    },
  ]);

  const addBreak = () => {
    setBreaks(prev => [
      ...prev,
      { breakName: "", breakStart: "", breakEnd: "", isPaid: false },
    ]);
  };

  const updateBreak = (index, key, value) => {
    const updated = [...breaks];
    updated[index][key] = value;
    setBreaks(updated);
  };

  const removeBreak = (index) => {
    setBreaks(prev => prev.filter((_, i) => i !== index));
  };


  const updatePolicy = (key, value) => {
    setPolicy(prev => ({ ...prev, [key]: value }));
  };




  const toggleWeekoffDay = (day) => {
    setPolicy(prev => {
      const updated = { ...prev.weekoffConfig };

      if (updated[day]) {
        delete updated[day]; // remove day
      } else {
        updated[day] = [];   // add day with no weeks
      }

      return { ...prev, weekoffConfig: updated };
    });
  };

  const toggleWeekoffOccurrence = (day, occ) => {
    setPolicy(prev => {
      const updated = { ...prev.weekoffConfig };
      const weeks = updated[day] || [];

      updated[day] = weeks.includes(occ)
        ? weeks.filter(w => w !== occ)
        : [...weeks, occ];

      return { ...prev, weekoffConfig: updated };
    });
  };


  const isDisabled = (key) =>
    SHIFT_RULE_MATRIX[shiftType]?.disable.includes(key);

  const isRotation = shiftType === "rotational";
  const isFlexible = shiftType === "flexible";

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Shift Settings</h1>

      {/* SHIFT HEADER */}
      <Card>
        <CardHeader>
          <CardTitle>Shift ID: {shiftId}</CardTitle>
        </CardHeader>
      </Card>

      {/* ATTENDANCE POLICY SECTION */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Rules & Policies</CardTitle>
        </CardHeader>

        {isRotation && (
          <div className="mx-6 mt-4 p-4 border rounded-lg bg-muted text-sm">
            Attendance rules are inherited from individual shifts assigned in
            rotation. Editing is disabled here.
          </div>
        )}

        <CardContent
          className="space-y-10"
          style={{
            pointerEvents: isRotation ? "none" : "auto",
            opacity: isRotation ? 0.6 : 1,
          }}
        >

          {/* ================= GRACE TIME ================= */}
          <div className="space-y-2">
            <Label>Grace In Time (Minutes)</Label>
            <Input
              type="number"
              disabled={isDisabled("graceInMinutes")}
              value={policy.graceInMinutes ?? ""}
              onChange={e => updatePolicy("graceInMinutes", +e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Late mark will not be applied if employee arrives within grace time.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Grace Out Time (Minutes)</Label>
            <Input
              type="number"
              disabled={isDisabled("graceOutMinutes")}
              value={policy.graceOutMinutes ?? ""}
              onChange={e => updatePolicy("graceOutMinutes", +e.target.value)}
            />
          </div>

          {/* ================= PUNCH WINDOW RULES ================= */}
          <div className="space-y-4">
            <Label className="font-semibold">Punch Window Rules</Label>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Punch-In Minute Window</Label>
                <Input
                  type="number"
                  disabled={isDisabled("punchInWindowMinutes")}
                  value={policy.punchInWindowMinutes ?? ""}
                  onChange={e =>
                    updatePolicy("punchInWindowMinutes", +e.target.value)
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Allowed minutes before/after shift start for valid IN punch.
                </p>
              </div>

              <div>
                <Label>Checkout After (Minutes)</Label>
                <Input
                  type="number"
                  disabled={isDisabled("checkoutAfterMinutes")}
                  value={policy.checkoutAfterMinutes ?? ""}
                  onChange={e =>
                    updatePolicy("checkoutAfterMinutes", +e.target.value)
                  }
                />
                <p className="text-xs text-muted-foreground">
                  OUT punch before this time will be ignored.
                </p>
              </div>
            </div>
          </div>

          {/* ================= LATE MARK RULES ================= */}
          <div className="space-y-4">
            <Label className="font-semibold">Late Mark Rules</Label>

            <div className="flex items-center justify-between border p-3 rounded-lg">
              <div>
                <p className="font-medium">Enable Late Marks</p>
                <p className="text-sm text-muted-foreground">
                  Late arrival beyond grace time counts as late mark.
                </p>
              </div>
              <Switch
                checked={enableLateMarks}
                onCheckedChange={setEnableLateMarks}
              />
            </div>

            {enableLateMarks && (<div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Late After (Minutes)</Label>
                <Input
                  type="number"
                  disabled={isDisabled("lateAfterMinutes")}
                  value={policy.lateAfterMinutes ?? ""}
                  onChange={e =>
                    updatePolicy("lateAfterMinutes", +e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Late Marks → Half-Day</Label>
                <Input
                  type="number"
                  disabled={isDisabled("lateMarksToHalfDay")}
                  value={policy.lateMarksToHalfDay ?? ""}
                  onChange={e =>
                    updatePolicy("lateMarksToHalfDay", +e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Late Marks → Absent</Label>
                <Input
                  type="number"
                  disabled={isDisabled("lateMarksToAbsent")}
                  value={policy.lateMarksToAbsent ?? ""}
                  onChange={e =>
                    updatePolicy("lateMarksToAbsent", +e.target.value)
                  }
                />
              </div>
            </div>)}

          </div>

          {/* ================= HALF DAY RULE ================= */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border p-3 rounded-lg">
              <div>
                <Label>Enable Half-Day Policy</Label>
                <p className="text-sm text-muted-foreground">
                  Half-day if minimum working hours not met.
                </p>
              </div>
              <Switch />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Minimum Minutes for Half-Day</Label>
                <Input type="number" placeholder="270 (4.5 hrs)" />
              </div>

              <div>
                <Label>Minimum Minutes for Full-Day</Label>
                <Input type="number" placeholder="480 (8 hrs)" />
              </div>
            </div>
          </div>

          {/* ================= OVERTIME RULES ================= */}
          <div className="space-y-4">
            <Label className="font-semibold">Overtime Policy</Label>

            <div className="flex items-center justify-between border p-3 rounded-lg">
              <div>
                <p className="font-medium">Allow Overtime</p>
                <p className="text-sm text-muted-foreground">
                  Calculate OT beyond shift working hours.
                </p>
              </div>
              <Switch
                checked={enableOvertime}
                onCheckedChange={setEnableOvertime}
              />
            </div>

            {enableOvertime && (<div className="grid grid-cols-3 gap-4">
              <div>
                <Label>OT After (Minutes)</Label>
                <Input
                  type="number"
                  disabled={isDisabled("otAfterMinutes")}
                  value={policy.otAfterMinutes ?? ""}
                  onChange={e => updatePolicy("otAfterMinutes", +e.target.value)}
                />
              </div>

              <div>
                <Label>Minimum OT (Minutes)</Label>
                <Input
                  type="number"
                  disabled={isDisabled("minOTMinutes")}
                  value={policy.minOTMinutes ?? ""}
                  onChange={e => updatePolicy("minOTMinutes", +e.target.value)}
                />
              </div>

              <div>
                <Label>Max OT Per Day (Minutes)</Label>
                <Input
                  type="number"
                  disabled={isDisabled("maxOTMinutes")}
                  value={policy.maxOTMinutes ?? ""}
                  onChange={e => updatePolicy("maxOTMinutes", +e.target.value)}
                />
              </div>
            </div>)}

          </div>

          {/* ================= SHIFT BREAK POLICY ================= */}
          <Card
            style={{
              pointerEvents: isFlexible ? "none" : "auto",
              opacity: isFlexible ? 0.5 : 1,
            }}
          >
            <CardHeader>
              <CardTitle>Shift Break Policy</CardTitle>
            </CardHeader>

            {isFlexible && (
              <div className="mx-6 mb-4 p-3 border rounded-md bg-muted text-sm">
                Break policy is not applicable for <b>Flexible shifts</b>.
              </div>
            )}
            <CardContent className="space-y-6">
              {breaks.map((brk, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 space-y-4 relative"
                >
                  {/* REMOVE BUTTON */}
                  {breaks.length > 1 && (
                    <button
                      onClick={() => removeBreak(index)}
                      className="absolute top-2 right-2 text-red-500 text-sm"
                    >
                      ✕
                    </button>
                  )}

                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label>Break Name</Label>
                      <Input
                        placeholder="Lunch / Tea"
                        value={brk.breakName}
                        onChange={(e) =>
                          updateBreak(index, "breakName", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <Label>Break Start</Label>
                      <Input
                        type="time"
                        value={brk.breakStart}
                        onChange={(e) =>
                          updateBreak(index, "breakStart", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <Label>Break End</Label>
                      <Input
                        type="time"
                        value={brk.breakEnd}
                        onChange={(e) =>
                          updateBreak(index, "breakEnd", e.target.value)
                        }
                      />
                    </div>

                    <div className="flex items-center gap-3 mt-6">
                      <Switch
                        checked={brk.isPaid}
                        onCheckedChange={(val) =>
                          updateBreak(index, "isPaid", val)
                        }
                      />
                      <Label>Paid Break</Label>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    If unpaid, break duration will be excluded from working hours.
                  </p>
                </div>
              ))}

              <Button variant="outline" onClick={addBreak}>
                + Add Break
              </Button>
            </CardContent>
          </Card>


          {/* ================= AUTO ABSENT ================= */}
          <div className="flex items-center justify-between border p-3 rounded-lg">
            <div>
              <Label>Auto Mark Absent</Label>
              <p className="text-sm text-muted-foreground">
                Mark absent if no IN punch exists.
              </p>
            </div>
            <Switch
              disabled={isDisabled("autoMarkAbsent")}
              checked={!!policy.autoMarkAbsent}
              onCheckedChange={v => updatePolicy("autoMarkAbsent", v)}
            />
          </div>



          {/* ================= WEEKOFF SETTINGS ================= */}
          <div className="space-y-4 border rounded-lg p-4">
            <Label className="font-semibold">Weekoff Configuration</Label>

            {WEEK_DAYS.map(day => {
              const isSelected = !!policy.weekoffConfig[day];

              return (
                <div key={day} className="border rounded-lg p-4 space-y-3">
                  {/* Day Toggle */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 font-medium">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleWeekoffDay(day)}
                      />
                      {day}
                    </label>

                    {isSelected && (
                      <span className="text-xs text-muted-foreground">
                        Select applicable weeks
                      </span>
                    )}
                  </div>

                  {/* Week Occurrences */}
                  {isSelected && (
                    <div className="flex flex-wrap gap-4 pl-6">
                      {WEEK_OCCURRENCES.map(occ => (
                        <label key={occ} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={policy.weekoffConfig[day]?.includes(occ)}
                            onChange={() => toggleWeekoffOccurrence(day, occ)}
                          />
                          {occ}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <p className="text-xs text-muted-foreground">
              Examples: <br />
              • <b>Sun → 1st–5th</b> (Every Sunday off) <br />
              • <b>Sat → 2nd & 4th</b> (Alternate Saturdays) <br />
              • <b>Fri → 1st & 2nd</b>
            </p>
          </div>



          {/* ================= WEEKDAY PARTIAL DAY RULES ================= */}
          {/* <div className="space-y-4 border-t pt-6">
            <Label className="font-semibold">Weekday Partial Day Rules</Label>

          
            <div className="border rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label>Day</Label>
                  <select className="border rounded-md p-2 w-full">
                    <option>Friday</option>
                    <option>Saturday</option>
                  </select>
                </div>

                <div>
                  <Label>Begins At</Label>
                  <Input type="time" />
                </div>

                <div>
                  <Label>Ends At</Label>
                  <Input type="time" />
                </div>

                <div>
                  <Label>Attendance Credit</Label>
                  <select className="border rounded-md p-2 w-full">
                    <option>FULL_DAY</option>
                    <option>HALF_DAY</option>
                    <option>PRESENT</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                {["1st", "2nd", "3rd", "4th", "5th"].map(o => (
                  <label key={o} className="flex items-center gap-2">
                    <input type="checkbox" /> {o}
                  </label>
                ))}
              </div>
            </div>

            <Button variant="outline">+ Add Partial Day Rule</Button>
          </div> */}

          <div className="flex items-center justify-between border p-3 rounded-lg">
            <div>
              <Label>Enable Weekday Partial Day Rules</Label>
              <p className="text-sm text-muted-foreground">
                Configure partial day attendance for weekdays.
              </p>
            </div>
            <Switch
              checked={enableWeekdayPartial}
              onCheckedChange={setEnableWeekdayPartial}
            />
          </div>

          {enableWeekdayPartial && (
            <div className="space-y-4 border-t pt-6">
              <Label className="font-semibold">Weekday Partial Day Rules</Label>

              <div className="border rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label>Day</Label>
                    <select className="border rounded-md p-2 w-full">
                      <option>Friday</option>
                      <option>Saturday</option>
                    </select>
                  </div>

                  <div>
                    <Label>Begins At</Label>
                    <Input type="time" />
                  </div>

                  <div>
                    <Label>Ends At</Label>
                    <Input type="time" />
                  </div>

                  <div>
                    <Label>Attendance Credit</Label>
                    <select className="border rounded-md p-2 w-full">
                      <option>FULL_DAY</option>
                      <option>HALF_DAY</option>
                      <option>PRESENT</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  {["1st", "2nd", "3rd", "4th", "5th"].map(o => (
                    <label key={o} className="flex items-center gap-2">
                      <input type="checkbox" /> {o}
                    </label>
                  ))}
                </div>
              </div>

              <Button variant="outline">+ Add Partial Day Rule</Button>
            </div>
          )}


        </CardContent>
      </Card>
    </div>
  );
}
