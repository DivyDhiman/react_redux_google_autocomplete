import React, { useLayoutEffect, useState } from 'react';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default function ScreenSize(props) {
  const [width, height] = useWindowSize();

  const [mobileTiggerPoint, setMobileTiggerPoint] = useState(700);
  const [webTiggerPoint, setWebTiggerPoint] = useState(990);

  console.log(width);
  return (width < mobileTiggerPoint ? props.mobile : (width <= webTiggerPoint && width > mobileTiggerPoint) ? 
  props.tablet : props.web);
}
