interface BadgeProps {
    status: 'active' | 'completed'
    size?: 'sm' | 'md' | 'lg'
}

export default function Badge({ status, size = 'md' }: BadgeProps) {
    return <span className={`badge badge-${status} badge-${size}`}>{status}</span>
}