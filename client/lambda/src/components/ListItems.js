import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

function EmptyState ({text}) {
  return <div style={{textAlign: 'left', padding: '30px 72px', width: '100%'}}>{text}</div>
}
export default function ({list, title}) {
  return <div>
    <ListSubheader inset>{title}</ListSubheader>
    {list && list.length ? list.map(m => <ListItem button>
      <ListItemText primary={m.name} />
    </ListItem>) : <EmptyState text='Nothing yet' />}
  </div>
}
