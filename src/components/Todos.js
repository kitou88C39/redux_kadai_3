import React, { useContext, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../auth/AuthProvider";

const Todos = (props) => {
  const { count, setCount } = props;

  // Contextからログインユーザを取得
  const { currentUser } = useContext(AuthContext);

  const [num, setNum] = useState(100);
  const onCountUp = () => {
    setCount(count + num);
  };
  const onCountDown = () => {
    setCount(count - num);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div className="balance-list">
          <h2>
            {currentUser?.displayName ?? "未ログイン"}
            さんの残高 : {count} 円{" "}
          </h2>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="入出金額"
              variant="outlined"
              value={num}
              onChange={(e) => setNum(Number(e.target.value))}
            />
          </Box>
          <Button onClick={onCountUp} variant="outlined" color="primary">
            Increment
          </Button>
          <Button onClick={onCountDown} variant="outlined" color="secondary">
            Decrement
          </Button>
        </div>
      </div>
    </>
  );
};

export default Todos;
