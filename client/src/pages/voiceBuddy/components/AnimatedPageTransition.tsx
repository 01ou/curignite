import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { getCenteredPosition } from '../../../functions/styleUtils/sxUtils'

interface AnimatedPageTransitionProps {
  startTime: Date | null
  path: string
  duration?: number
}

export default function AnimatedPageTransition({
  startTime,
  path,
  duration = 800,
}: AnimatedPageTransitionProps) {
  const navigate = useNavigate()

  if (!startTime) return null // アニメーション開始時間がない場合は何も表示しない

  // 800ms 後にページ遷移
  setTimeout(() => navigate(path), duration)

  return (
    <motion.div
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 20, opacity: 1 }}
      transition={{ duration: duration / 1000, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        width: '100px',
        height: '100px',
        backgroundColor: '#1976d2', // MUIのprimary.blueに近い色
        borderRadius: '50%',
        ...getCenteredPosition({ x: 50, y: 50 }),
        zIndex: 9999, // 最前面に表示
      }}
    />
  )
}
