import { useEffect, useRef, useState } from "react";
import DiceBox from "@3d-dice/dice-box";

export default function DiceBoxComponent() {
  const [rollResult, setRollResult] = useState();
  const containerRef = useRef(null);
  const diceRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    diceRef.current = new DiceBox(
      "#dice-box", // ← ВАЖНО: первый аргумент
      {
        assetPath: "/assets/",
        throwForce: 9,
      }
    );

    diceRef.current.init();

    diceRef.current.onRollComplete = (results) => {
      setRollResult(results[0].value);
    };
  }, []);

  const handleRoll = (e) => {
    e.preventDefault();
    const notation = e.target[0].value;
    diceRef.current.roll(notation);
  };

  return (
    <div id="dice-box">
      <div
        ref={containerRef}
        style={{ width: "400px", height: "300px" }}
      />

      <form onSubmit={handleRoll}>
        <input type="text" placeholder="3d6" />
        <button type="submit">Roll</button>
      </form>

      <div>Result: {rollResult}</div>
    </div>
  );
}