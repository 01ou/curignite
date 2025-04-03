import { Button, SxProps } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface NavigationButtonProps {
  children: string
  path: string
  sx?: SxProps
  variant?: 'text' | 'outlined' | 'contained'
  onClickCallback?: () => void
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  children,
  path,
  variant,
  sx,
  onClickCallback,
}) => {
  const navigate = useNavigate()

  return (
    <Button
      onClick={() => {
        onClickCallback?.()
        navigate(path)
      }}
      variant={variant}
      sx={sx}
    >
      {children}
    </Button>
  )
}

export default NavigationButton
