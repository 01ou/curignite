import React from 'react'
import BackgroundContainer from '../../../components/display/BackgroundContainer'
import forestBG from '../../../assets/backgrounds/forest.jpg'
import { Button, Grid, Stack, SvgIconTypeMap, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Diversity3, MenuBook, Stairs, Task } from '@mui/icons-material'
import { getTextOutline } from '../../../functions/styleUtils/sxUtils'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import DailyPopups from '../popup/DailyPopups'
import MenuButton from '../../../components/inputs/MenuButton'

interface HomeMainProps {}

const MenuBtn = ({
  text,
  Children,
  path,
}: {
  text: string
  Children: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string
  }
  path: string
}) => {
  const navigate = useNavigate()

  return (
    <MenuButton
      text={text}
      children={<Children sx={{ width: 40, height: 40, color: '#5FC4F3' }} />}
      size={64}
      contentsMb={0.5}
      bgcolor="#fff"
      textVariant="subtitle1"
      shiftText={-1}
      buttonSx={{
        border: 2,
        borderColor: '#301C1C',
      }}
      labelSx={{
        color: '#FCFCFC',
        ...getTextOutline('#301C1C', 1),
      }}
      onClick={() => navigate(path)}
      floating={false}
    />
  )
}

const HomeMain: React.FC<HomeMainProps> = ({}) => {
  const navigate = useNavigate()

  return (
    <BackgroundContainer backgroundImage={forestBG}>
      <DailyPopups />
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ width: '100%' }}
      >
        <Grid container spacing={1} sx={{ width: 150 }}>
          <Grid item xs={6}>
            <MenuBtn text="問題集" Children={MenuBook} path="/problemSets" />
          </Grid>
          <Grid item xs={6}>
            <MenuBtn text="課題" Children={Task} path="/problemSets" />
          </Grid>
          <Grid item xs={6}>
            <MenuBtn
              text="フレンド"
              Children={Diversity3}
              path="/problemSets"
            />
          </Grid>
          <Grid item xs={6}>
            <MenuBtn text="進捗" Children={Stairs} path="/problemSets" />
          </Grid>
        </Grid>
        <Button
          sx={{ bgcolor: 'orange', color: 'white', width: 120, height: 50 }}
          onClick={() => navigate('/idea1/learning')}
        >
          <Typography variant="subtitle1" color="black">
            勉強開始
          </Typography>
        </Button>
      </Stack>
    </BackgroundContainer>
  )
}

export default HomeMain
