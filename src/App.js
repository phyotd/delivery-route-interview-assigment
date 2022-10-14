import { useState } from 'react';
import routeList from './routeData';
import data from './data';
import {
  Typography,
  List,
  ListItem,
  TableContainer,
  Table, TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import RouteDialog from './components/RouteDialog';
import { Container } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';

const App = () => {
  const [towns, setTowns] = useState(data);
  const [deliveryRoutes, setRoutes] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [hasRoute, setHasRoute] = useState(false);


  const handleSelectRoute = (event, value) => {

    let list = [...selectedRoutes];
    if (list.length === 0) {
      let totalCost = 0;
      towns.forEach(e => {
        let chk = value.point_ids.includes(e.id);
        if (chk) {
          totalCost += e.cost;
        }
      });
      value.cost = totalCost;
      list.push(value);

    } else {
      let totalCost = 0;
      towns.forEach(e => {
        let chk = value.point_ids.includes(e.id);
        if (chk) {
          totalCost += e.cost;
        }
      });

      value.cost = totalCost;
      let chk = list.includes(value);
      if (chk) {
        if (totalCost < 20) {
          list.push(value);
        }
      } else {
        list.push(value);
      }
    }
    setSelectedRoutes(list);
  }

  const handleClearAll = () => {
    setRoutes([]);
    setSelectedRoutes([]);
  }

  const handleSetRoute = (v) => {
    setRoutes([]);
    var routes = [];

    if (v.length !== 0) { setHasRoute(true) };

    routeList.forEach(rl => {
      let count = 0;

      v.forEach(e => {
        let chk = rl.point_ids.includes(e.id);

        if (chk) {
          count++;
        }

      });

      if (count === v.length) {
        routes.push(rl);
      }
    });

    if (routes.length > 0) {
      setRoutes(routes);
      setHasRoute(false);
    }

  }

  const handleClearRoutes = () => {
    setRoutes([]);
  }

  const handleDeleteRoute = (e, i) => {
    let r = [...selectedRoutes];
    r.splice(i, 1);
    setSelectedRoutes(r);
  }

  return (
    <div className="container">
      <Typography variant="h3"> Delivery Service</Typography>
      <Container className="data-container">
        <RouteDialog
          onSetRoute={(v) => handleSetRoute(v)}
          onClear={handleClearRoutes}

        />
        {(deliveryRoutes.length === 0 && hasRoute) ? <Typography variant="subtitle1" >No Such Route!</Typography> :
          <List>
            {deliveryRoutes.map((t) => <ListItem key={t.id} value={t} onClick={(e) => handleSelectRoute(e, t)}>{t.name}</ListItem>)}
          </List>}

      </Container>

      <Typography variant="h5">
        Delivery Routes
      </Typography>
      <Container className="data-container">

        <TableContainer>
          <Table aria-label="simple table" size='small'>

            <TableBody>
              {selectedRoutes.map((row, index) => (
                <TableRow
                  key={index}
                >
                  <TableCell align="left" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.cost}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => handleDeleteRoute(e, index)}><DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {/* <Divider></Divider>
      <Button onClick={handleClearAll}>Clear All</Button> */}

    </div>
  )
}
export default App