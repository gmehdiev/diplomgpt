import { useEffect, useState } from "react";

interface Range {
  min: number;
  max: number;
  layout: string;
}

export const RangeInput = ({ min, max, layout }: Range) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (layout === "topT" || layout === "temperature") {
      setValue(max / 2);
    }
  }, []);
  const handleChangeRange = (e: any) => {
    const numbers = e.target.value;

    setValue(numbers);
    //console.log("price " + numbers);
  };
  return (
    <>
      <span
        style={{
          color: "white",
        }}
      >
        {layout}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        onChange={(e) => handleChangeRange(e)}
        value={value}
      />
    </>
  );
};
