import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

// Neutral grid + tick colors that read well in light and dark.
const GRID = 'rgba(128,150,140,0.18)'
const AXIS_TICK = { fill: 'currentColor', fontSize: 11 }

const tooltipStyle = {
  borderRadius: 12,
  border: '1px solid rgba(128,150,140,0.3)',
  background: '#ffffff',
  color: '#0e1f17',
  fontSize: 12,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
}

/** Multi-series line chart (e.g. Actual vs Target). */
export function EcoLineChart({ data, xKey, lines, height = 260 }) {
  return (
    <div className="w-full text-on-surface-variant" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="4 4" stroke={GRID} vertical={false} />
          <XAxis dataKey={xKey} tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={40} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: GRID }} />
          {lines.map((l) => (
            <Line
              key={l.key}
              type="monotone"
              dataKey={l.key}
              name={l.name}
              stroke={l.color}
              strokeWidth={l.dashed ? 2 : 3}
              strokeDasharray={l.dashed ? '6 4' : undefined}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

/** Single-series area chart. */
export function EcoAreaChart({ data, xKey, dataKey, color = '#10b981', height = 200 }) {
  const gradId = `eco-area-${dataKey}`
  return (
    <div className="w-full text-on-surface-variant" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.25} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" stroke={GRID} vertical={false} />
          <XAxis dataKey={xKey} tick={AXIS_TICK} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={40} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: GRID }} />
          <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={3} fill={`url(#${gradId})`} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

/** Vertical/horizontal bar chart. */
export function EcoBarChart({ data, xKey, bars, height = 260, layout = 'horizontal' }) {
  const vertical = layout === 'vertical'
  return (
    <div className="w-full text-on-surface-variant" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout={layout}
          margin={{ top: 8, right: 12, left: vertical ? 8 : -12, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="4 4" stroke={GRID} horizontal={!vertical} vertical={vertical} />
          {vertical ? (
            <>
              <XAxis type="number" tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey={xKey} tick={AXIS_TICK} axisLine={false} tickLine={false} width={110} />
            </>
          ) : (
            <>
              <XAxis dataKey={xKey} tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={40} />
            </>
          )}
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: GRID }} />
          {bars.map((b) => (
            <Bar key={b.key} dataKey={b.key} name={b.name} fill={b.color} radius={[6, 6, 0, 0]} maxBarSize={44}>
              {b.colors &&
                data.map((_, i) => <Cell key={i} fill={b.colors[i % b.colors.length]} />)}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

/** Donut / pie chart. */
export function EcoDonutChart({ data, height = 200, showLegend = true }) {
  return (
    <div className="w-full text-on-surface-variant" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="58%"
            outerRadius="82%"
            paddingAngle={2}
            stroke="none"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
          {showLegend && <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />}
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
