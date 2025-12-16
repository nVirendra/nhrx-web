import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

// THEMES (JS only)
const THEMES = { light: "", dark: ".dark" };

// -------------------------------------
// CONTEXT (NO TS)
// -------------------------------------
const ChartContext = React.createContext(null);

function useChart() {
  const ctx = React.useContext(ChartContext);
  if (!ctx) throw new Error("useChart must be used within a <ChartContainer />");
  return ctx;
}

// -------------------------------------
// CHART CONTAINER
// -------------------------------------
const ChartContainer = React.forwardRef(
  ({ id, className, children, config, ...props }, ref) => {
    const uniqueId = React.useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          data-chart={chartId}
          ref={ref}
          className={cn(
            "flex aspect-video justify-center text-xs " +
              "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground " +
              "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 " +
              "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border " +
              "[&_.recharts-dot[stroke='#fff']]:stroke-transparent " +
              "[&_.recharts-layer]:outline-none " +
              "[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border " +
              "[&_.recharts-radial-bar-background-sector]:fill-muted " +
              "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted " +
              "[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border " +
              "[&_.recharts-sector[stroke='#fff']]:stroke-transparent " +
              "[&_.recharts-sector]:outline-none " +
              "[&_.recharts-surface]:outline-none",
            className
          )}
          {...props}
        >
          <ChartStyle id={chartId} config={config} />
          <RechartsPrimitive.ResponsiveContainer>
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    );
  }
);
ChartContainer.displayName = "ChartContainer";

// -------------------------------------
// CHART STYLE (PURE JSX)
// -------------------------------------
const ChartStyle = ({ id, config }) => {
  const colorKeys = Object.entries(config).filter(
    ([_, conf]) => conf.color || conf.theme
  );

  if (!colorKeys.length) return null;

  const cssString = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const colors = colorKeys
        .map(([key, itemConfig]) => {
          const color =
            (itemConfig.theme && itemConfig.theme[theme]) ||
            itemConfig.color ||
            null;
          return color ? `  --color-${key}: ${color};` : "";
        })
        .join("\n");

      return `
${prefix} [data-chart=${id}] {
${colors}
}
`;
    })
    .join("\n");

  return <style dangerouslySetInnerHTML={{ __html: cssString }} />;
};

// -------------------------------------
// TOOLTIP WRAPPER
// -------------------------------------
const ChartTooltip = RechartsPrimitive.Tooltip;

// -------------------------------------
// TOOLTIP CONTENT (PURE JSX VERSION)
// -------------------------------------
const ChartTooltipContent = React.forwardRef(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
      ...props
    },
    ref
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) return null;

      const [item] = payload;
      const key = labelKey || item.dataKey || item.name || "value";
      const itemConfig = getConfigFromPayload(config, item, key);

      const value =
        !labelKey && typeof label === "string"
          ? config[label]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        );
      }

      return value ? (
        <div className={cn("font-medium", labelClassName)}>{value}</div>
      ) : null;
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ]);

    if (!active || !payload?.length) return null;

    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 " +
            "bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
        // {...props}
      >
        {!nestLabel ? tooltipLabel : null}

        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = nameKey || item.name || item.dataKey || "value";
            const itemConfig = getConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;

            return (
              <div
                key={item.dataKey + index}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item.value !== undefined ? (
                  formatter(
                    item.value,
                    item.name,
                    item,
                    index,
                    item.payload
                  )
                ) : (
                  <>
                    {!hideIndicator && (
                      <div
                        className={cn("shrink-0 rounded-[2px]", {
                          "h-2.5 w-2.5": indicator === "dot",
                          "w-1": indicator === "line",
                          "w-0 border-[1.5px] border-dashed bg-transparent":
                            indicator === "dashed",
                          "my-0.5": nestLabel && indicator === "dashed",
                        })}
                        style={{
                          backgroundColor: indicatorColor,
                          borderColor: indicatorColor,
                        }}
                      />
                    )}

                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>

                      {item.value !== undefined && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltip";

// -------------------------------------
// LEGEND
// -------------------------------------
const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef(
  ({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
    const { config } = useChart();

    if (!payload?.length) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item) => {
          const key = nameKey || item.dataKey || "value";
          const itemConfig = getConfigFromPayload(config, item, key);

          return (
            <div key={item.value} className="flex items-center gap-1.5">
              {!hideIcon ? (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{ backgroundColor: item.color }}
                />
              ) : null}

              {itemConfig?.label}
            </div>
          );
        })}
      </div>
    );
  }
);
ChartLegendContent.displayName = "ChartLegend";

// -------------------------------------
// HELPER (PURE JS)
// -------------------------------------
function getConfigFromPayload(config, payload, key) {
  if (!payload || typeof payload !== "object") return undefined;

  const inner = payload.payload || {};

  let labelKey = key;

  if (typeof payload[key] === "string") labelKey = payload[key];
  else if (typeof inner[key] === "string") labelKey = inner[key];

  return config[labelKey] || config[key];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
