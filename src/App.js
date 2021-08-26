import React, { useState, useRef, useEffect } from 'react';
import { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort } from './algorithms/sortingAlgorithms';
import './App.css';
import { Form, Button } from 'react-bootstrap';

/*
  To do:
  - fix animation during recursion
*/

const algorithms = {
  'Bubble Sort': bubbleSort,
  'Selection Sort': selectionSort,
  'Insertion Sort': insertionSort,
  'Merge Sort': mergeSort,
  'Quick Sort': quickSort
}

function createArray () {
  let array = [...Array(200).keys()].map(x => x + 1);

  // Durstenfeld shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const draw = (ctx, array, color) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  ctx.fillStyle = color;
  array.forEach((el, i) => ctx.fillRect(ctx.canvas.width * i / 200, ctx.canvas.height * (200 - el) / 200, ctx.canvas.width / 200, ctx.canvas.height));
  
};

function Controls (props) {
  const {handleChange, i} = props;
  return (
    <Form.Select style={{width: '30%'}}className="dropdown" defaultValue="Bubble Sort" size="sm" onChange={e => handleChange(e, i)}>
      <option>Bubble Sort</option>
      <option value="Insertion Sort">Insertion Sort</option>
      <option value="Selection Sort">Selection Sort</option>
      <option value="Merge Sort">Merge Sort</option>
      <option value="Quick Sort">Quick Sort</option>
    </Form.Select>
  )
}

// Canvas code is based off of https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

function Canvas (props) {
  const { displays, idx } = props

  const canvasRef = useCanvas(displays['sorting'], displays['arr'], displays['start']);
  const label = Number(idx) + 1;

  return (
    <div className="display">
      <div className="header">
        <span className="title">{`Display ${label}`}</span>
        <Controls handleChange={(e, i) => displays['handleChange'](e, i)} i={idx}/>
        <Button variant="success" className="start" id={`toggle${(label)}`} onClick={() => displays['handleClick'](idx)} size="sm">Start</Button>
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

function useCanvas (sorting, array, state) {
  
  const canvasRef = useRef(null);
  
  useEffect(() => {
    
    const canvas = canvasRef.current;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    const context = canvas.getContext('2d');
        
    draw(context, array, '#fff');
    let animationFrameId;
    
    if (state) {
      let sort = algorithms[sorting](array);
      if (sorting == 'Bubble Sort' || sorting == 'Insertion Sort' || sorting == 'Selection Sort') {
        setInterval(() => {
          sort.next()
        }, 0)
      } else {
        setInterval(() => {
          sort.next()
        }, 60)
      }
      const render = () => {
        animationFrameId = window.requestAnimationFrame(render);
        draw(context, array, '#FF7F7F');
        sort.next();
      }
      render();
    } 
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
    
  }, [state])
  
  
  return canvasRef;
}

function App () {

  const array = createArray();
  
  const dict = {};
  for (let c = 0; c < 4; c++) {
    dict[c] = {
      arr: array.slice(), 
      start: false, 
      sorting: 'Bubble Sort', 
      handleClick: i => handleClick(i),
      handleChange: (e, i) => handleChange(e, i)
    };
  };

  const [displays, setDisplays] = useState(dict);
    
  const handleClick = i => {
    let clone = {...displays};
    clone[i]['start'] = true;
    setDisplays(clone);
  }

  const handleMasterClick = () => {
    let clone = {...displays};
    for (let i = 0; i < 4; i++) {
      clone[i]['start'] = true;
    }
    setDisplays(clone);
  }

  const handleChange = (event, i) => {
    let clone = {...displays};
    clone[i]['sorting'] = event.target.value;
    setDisplays(clone);
  }
  
  const handleReset = () => {
    let clone = {...displays};
    for (let i = 0; i < 4; i++) {
      clone[i]['start'] = false;
      clone[i]['arr'] = array.slice();
    }
    setDisplays(clone);
  }

  return (
    <div id="container">
      <Canvas displays={displays[0]} idx='0'/>
      <Canvas displays={displays[1]} idx='1'/>
      <Canvas displays={displays[2]} idx='2'/>
      <Canvas displays={displays[3]} idx='3'/>
      <Button id="master" size="lg" variant="danger" onClick={() => handleMasterClick()}>Start All</Button>
      <Button id="reset" size="lg" variant="info" onClick={() => handleReset()}>Reset All</Button>
    </div>
  )

}

export default App;