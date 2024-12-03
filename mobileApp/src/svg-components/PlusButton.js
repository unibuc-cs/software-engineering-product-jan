import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const PlusButton = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 128 128"
    id="AddButton"
    width={30}
    height={30}
  >
    <Circle
      cx="64"
      cy="64"
      r="38"
      stroke="#e49773"
      stroke-width="5"
      class="colorStroke000000 svgStroke"
    ></Circle>
    <Path
      stroke="#e49773"
      stroke-linecap="round"
      stroke-width="5"
      d="M64 48L64 80M48 64H80"
      class="colorStroke000000 svgStroke"
    ></Path>
  </Svg>
);

export default PlusButton;
