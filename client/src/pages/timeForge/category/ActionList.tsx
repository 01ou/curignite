import { Box, Grid, SvgIconTypeMap, Typography } from '@mui/material';
import React from 'react';
import ActionButton from './ActionButton';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface ActionItem {
  id: string;
  label: string;
  Image: OverridableComponent<SvgIconTypeMap<{}, "svg">>
};

interface ActionListProps {
  actionName: string;
  buttonColor: string;
  bgcolor: string;
  // recentlyUsedItems: ActionItem[];
  actionItems: ActionItem[];
  onClickAction: (actionId: string) => void;
}

const ActionList: React.FC<ActionListProps> = ({ actionName, buttonColor, bgcolor, actionItems, onClickAction }) => {
  return (
    <Box sx={{ bgcolor, padding: 1, height: "100%" }}>
      <Typography variant='h4' sx={{ padding: 1 }}>
        {actionName}
      </Typography>
      <Grid container spacing={1} mx={"auto"} >
        {actionItems.map((item, index) => (
          <Grid key={index} item >
            <ActionButton
              label={item.label}
              Image={<item.Image sx={{ width: 40, height: 40 }}/>}
              size={80}
              bgcolor={buttonColor}
              onClick={() => onClickAction(item.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ActionList;