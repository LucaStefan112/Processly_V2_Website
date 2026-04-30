import { motion } from 'framer-motion'

type Status = 'done' | 'progress' | 'pending' | 'hold'

type Node = {
  id: string
  label: string
  x: number
  y: number
  status: Status
}

type Edge = {
  from: string
  to: string
  flowing?: boolean
}

const nodes: Node[] = [
  { id: 'intake', label: 'Intake', x: 30, y: 50, status: 'done' },
  { id: 'vetting', label: 'Vetting', x: 30, y: 220, status: 'done' },
  { id: 'review', label: 'Review', x: 245, y: 135, status: 'progress' },
  { id: 'approval', label: 'Approval', x: 460, y: 50, status: 'pending' },
  { id: 'handoff', label: 'Hand-off', x: 460, y: 220, status: 'pending' },
]

const edges: Edge[] = [
  { from: 'intake', to: 'review', flowing: true },
  { from: 'vetting', to: 'review', flowing: true },
  { from: 'review', to: 'approval', flowing: true },
  { from: 'review', to: 'handoff', flowing: true },
]

const NODE_W = 150
const NODE_H = 56

const statusFill: Record<Status, string> = {
  done: '#10B981',
  progress: '#5B5BD6',
  pending: '#CDCDC1',
  hold: '#F59E0B',
}

function nodeAnchors(n: Node) {
  return {
    leftX: n.x,
    leftY: n.y + NODE_H / 2,
    rightX: n.x + NODE_W,
    rightY: n.y + NODE_H / 2,
  }
}

function edgePath(from: Node, to: Node) {
  const a = nodeAnchors(from)
  const b = nodeAnchors(to)
  const dx = Math.max(40, (b.leftX - a.rightX) / 2)
  return `M ${a.rightX} ${a.rightY} C ${a.rightX + dx} ${a.rightY}, ${b.leftX - dx} ${b.leftY}, ${b.leftX} ${b.leftY}`
}

export default function DagDiagram({ className = '' }: { className?: string }) {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n] as const))

  return (
    <svg
      viewBox="0 0 640 320"
      role="img"
      aria-label="A directed graph showing five steps of a workflow connected by edges, with status colors indicating done, in progress, and pending."
      className={className}
    >
      <defs>
        <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5B5BD6" stopOpacity="0.0" />
          <stop offset="50%" stopColor="#5B5BD6" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#5B5BD6" stopOpacity="0.2" />
        </linearGradient>
        <filter id="node-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="8"
            floodColor="#0A0A09"
            floodOpacity="0.08"
          />
        </filter>
      </defs>

      {/* Edges */}
      <g fill="none" strokeLinecap="round">
        {edges.map((e, i) => {
          const from = byId[e.from]
          const to = byId[e.to]
          const d = edgePath(from, to)
          return (
            <g key={`${e.from}-${e.to}`}>
              <path d={d} stroke="#E7E7DF" strokeWidth={2} />
              {e.flowing && (
                <motion.path
                  d={d}
                  stroke="url(#edge-grad)"
                  strokeWidth={2}
                  strokeDasharray="6 10"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -160 }}
                  transition={{
                    duration: 4,
                    ease: 'linear',
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              )}
            </g>
          )
        })}
      </g>

      {/* Nodes */}
      <g filter="url(#node-shadow)">
        {nodes.map((n, i) => (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <rect
              x={n.x}
              y={n.y}
              width={NODE_W}
              height={NODE_H}
              rx={14}
              fill="#FFFFFF"
              stroke="#E7E7DF"
              strokeWidth={1}
            />
            <circle cx={n.x + 18} cy={n.y + NODE_H / 2} r={5} fill={statusFill[n.status]} />
            {n.status === 'progress' && (
              <motion.circle
                cx={n.x + 18}
                cy={n.y + NODE_H / 2}
                r={5}
                fill={statusFill[n.status]}
                initial={{ opacity: 0.6, scale: 1 }}
                animate={{ opacity: 0, scale: 2.4 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                }}
              />
            )}
            <text
              x={n.x + 34}
              y={n.y + NODE_H / 2 + 6}
              fontFamily="Inter, sans-serif"
              fontSize={17}
              fontWeight={500}
              fill="#121211"
            >
              {n.label}
            </text>
          </motion.g>
        ))}
      </g>
    </svg>
  )
}
