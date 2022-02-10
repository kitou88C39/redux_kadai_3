//addTodos　受取人
//count 送金者の残高
//num　送金者の入金及び出勤額
//balance 受取人の残高
import React, { useState, useRef, useContext } from "react";
import Modal from "react-modal";
import {
  Box,
  TextField,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { AuthContext } from "../auth/AuthProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// 対象の受取人のWalletダイアログ
const AddTodoWalletDialog = ({ isWalletOpen, addTodo, handleClose }) => {
  if (!addTodo) return null;
  console.log(addTodo);
  return (
    <Modal
      className="wallet"
      isOpen={isWalletOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {addTodo.item}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          残高 : {addTodo.balance ?? 0} 円
        </Typography>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

// 対象の受取人への送金ダイアログ
const AddTodoTransferDialog = ({
  count,
  open,
  addTodo,
  num,
  setNum,
  handleClickClose,
  handleClickTransferButton,
}) => {
  const { currentUser } = useContext(AuthContext);
  if (!addTodo) return null;
  return (
    <Dialog open={open} onClose={handleClickClose}>
      <DialogTitle>{addTodo.addTodos}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {currentUser?.displayName ?? "未ログイン"}の残高: {count} 円
        </DialogContentText>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            className="balance"
            id="outlined-basic"
            label="振込金額を入力してください"
            variant="outlined"
            value={num}
            onChange={(e) => setNum(Number(e.target.value))}
          />
        </Box>
      </DialogContent>
      <ButtonGroup
        variant="outlined"
        color="primary"
        aria-label="outlined primary button group"
      ></ButtonGroup>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={handleClickClose}>
          Cancel
        </Button>
        <Button
          onClick={handleClickTransferButton}
          variant="outlined"
          color="primary"
        >
          振込
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, count, setCount } = props;
  const [balance, setBalance] = useState(0);
  const [num, setNum] = useState(100);
  const [open, setOpen] = React.useState(false);
  const [IsWalletOpen, setIsWalletOpen] = React.useState(false);
  const [targetTodo, setTargetTodo] = React.useState(null);

  const inputRef = useRef(true);

  const changeFocus = () => {
    setIsWalletOpen(true);
    setTargetTodo(item);
  };

  const onCountDown = () => {
    setCount(count - num);
  };

  const onBalanceUp = () => {
    setBalance(balance + num);
  };

  const transfer = () => {
    const newTodo = { ...item, balance: item?.balance + num };
    updateTodo?.(newTodo);
  };

  const handleClickOpen = (todo) => {
    setTargetTodo(todo);
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setIsWalletOpen(false);
  };

  const handleClickTransferButton = () => {
    onCountDown();
    onBalanceUp();
    transfer();
  };

  return (
    <div className="balance-list">
      <li key={item.id} className="card">
        <p>{item.item}</p>
        <div className="btns">
          <Button
            className="wallet"
            variant="outlined"
            color="primary"
            onClick={() => changeFocus()}
          >
            walletを見る
          </Button>
          <Button
            className="sendmoney"
            variant="outlined"
            color="primary"
            onClick={() => handleClickOpen(item.id)}
          >
            送金
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => removeTodo(item.id)}
          >
            削除
          </Button>
          {""}
        </div>
        {item.completed && <span className="completed">done</span>}
      </li>
      <AddTodoWalletDialog
        isWalletOpen={IsWalletOpen}
        addTodo={targetTodo}
        handleClose={handleClose}
      />
      <AddTodoTransferDialog
        open={open}
        addTodo={targetTodo}
        num={num}
        setNum={setNum}
        count={count}
        handleClickClose={handleClickClose}
        handleClickTransferButton={handleClickTransferButton}
      />
    </div>
  );
};

export default TodoItem;
