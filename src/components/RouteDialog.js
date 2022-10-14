import {
  Button,
  IconButton,
  MenuItem,
  Select
} from '@mui/material';
import { Container } from '@mui/system';
import ClearIcon from '@mui/icons-material/Clear';

import React, { useState } from 'react';
import data from '../data';

const RouteDialog = (props) => {
  const { onSetRoute, onClear } = props;
  const [towns, setTowns] = useState(data);
  const [routePath, setRoutePath] = useState([]);
  const [selectedTown, setSelectedTown] = React.useState('');

  const handleChange = (event) => {
    if (event.target.value !== '') {
      setSelectedTown(event.target.value);
    }
  };

  const handleClearRoutes = (event) => {
    setRoutePath([]);
    onClear();
  };

  const addTownToRoutePath = (event) => {
    if (selectedTown !== '') {
      let routes = [...routePath];
      routes.push(selectedTown);

      setRoutePath(routes);
      setSelectedTown('');
      onSetRoute(routes);
    }

  };

  return (
    <div>
      <Select
        value={selectedTown}
        onChange={handleChange}
        size="small"
        displayEmpty

      >
        <MenuItem value="">
          <em>Select Town</em>
        </MenuItem>
        {towns.map((t) => <MenuItem key={t.id} value={t}>{t.name}</MenuItem>)}

      </Select>

      <Button onClick={addTownToRoutePath}>Add</Button>

      <Container className="data-container">
        {routePath.map((rp, index) => {
          return <span key={rp.id}>{rp.name} {(index === routePath.length - 1) ?'': ' --> '}</span>
        })}
        {routePath.length > 0 ? <IconButton onClick={handleClearRoutes}><ClearIcon /></IconButton> : <div />}
      </Container>
    </div>

  )
}

export default RouteDialog