import * as React from 'react';
import Svg, {Circle, G, Defs, LinearGradient, Stop} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={125}
    height={114}
    fill="none"
    {...props}>
    <Circle
      cx={82.568}
      cy={30.568}
      r={82.429}
      fill="url(#a)"
      fillOpacity={0.5}
      transform="rotate(-162.268 82.568 30.568)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={0.139}
        x2={164.997}
        y1={30.568}
        y2={30.568}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#168548" />
        <Stop offset={1} stopColor="#05AA50" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SvgComponent;
