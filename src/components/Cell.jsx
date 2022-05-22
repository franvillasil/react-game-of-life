
import React, { useEffect, useState } from "react";

const Cell = (props) => {
  const [x, setX] = useState(props.x);
  const [y, setY] = useState(props.y);
  const [alive, setAlive] = useState(props.alive);
  const [classes, setClasses] = useState('cell');

  useEffect(() => {
    console.log('cambia alive', alive)
    if(alive) {
      setClasses('cell cell-active');
    } else {
      setClasses('cell');
    }

  }, [alive]);
  
  return (
    <div className={classes}>
      
    </div>
  );
}

export default Cell;