import { Stack, Box, Avatar, Typography } from '@mui/material'
import React from 'react'
import { hexToRgba } from '../../../functions/styleUtils/colorUtils'
import { getSubjectSetting } from '../main/problemSetSubjectSetting'
import { Subject } from '../../../types/app/subjects'
import { useTranslation } from 'react-i18next'

interface ProblemSetDetailsHeaderProps {
  problemSetName: string
  subject: Subject
  detailedSubject: string | null
}

const ProblemSetDetailsHeader: React.FC<ProblemSetDetailsHeaderProps> = ({
  problemSetName,
  subject,
  detailedSubject,
}) => {
  const { t } = useTranslation()

  return (
    <Stack direction="row" alignItems="center" spacing={1} ml={1}>
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        <Avatar
          src={getSubjectSetting(subject).image}
          sx={{
            bgcolor: hexToRgba(getSubjectSetting(subject).color, 0.8),
            width: 56,
            height: 56,
          }}
        />
        <Typography
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            fontSize: '0.9rem',
          }}
        >
          {t(detailedSubject ?? subject)}
        </Typography>
      </Box>
      <Typography variant="h6">{problemSetName}</Typography>
    </Stack>
  )
}

export default ProblemSetDetailsHeader
