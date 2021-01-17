import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const data = require('./links.json');

const right = []
for (let x = 0; x < data.right.length; x++) {
  right.push(<li>{data.right[x].source.name}:<a className="App-link" href={data.right[x].url} target="_blank" rel='noreferrer'> {data.right[x].title}</a></li>);
}

const moderate = []
for (let x = 0; x < data.moderate.length; x++) {
  moderate.push(<li>{data.moderate[x].source.name}:<a className="App-link" href={data.moderate[x].url } target="_blank" rel='noreferrer'> {data.moderate[x].title}</a></li>);
}

const left = []
for (let x = 0; x < data.left.length; x++) {
  left.push(<li>{data.left[x].source.name}:<a className="App-link" href={data.left[x].url} target="_blank" rel='noreferrer'> {data.left[x].title}</a></li>);
}

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>See Neutral Articles Related to this Topic</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <list>
            {moderate}
          </list>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>See Left Skewing Articles Related to this Topic</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <list>
            {left}
          </list>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>See Right Skewing Articles Related to this Topic</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <list>
            {right}
          </list>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default App;
