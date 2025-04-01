import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typography } from "@mui/material";

interface CountdownProps {
  start: number | null; // null の場合は表示しない
  onComplete?: () => void; // カウントダウン終了時のコールバック
}

export default function Countdown({ start, onComplete }: CountdownProps) {
  const [count, setCount] = useState<number | null>(start);

  useEffect(() => {
    if (start === null) {
      setCount(null);
      return;
    }
    setCount(start); // start が更新されたらカウントをリセット
  }, [start]);

  useEffect(() => {
    if (count === null || count <= 0) {
      if (count === 0 && onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, onComplete]);

  if (count === null) return null; // null の場合は何も表示しない

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={count}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Typography variant="h1" color="primary">
            {count}
          </Typography>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
