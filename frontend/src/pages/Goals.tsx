import { Typography, Box, Paper, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import ProgressBar from "../components/ProgressBar";
import { useState } from "react";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [openAddGoal, setOpenAddGoal] = useState(false);

  const [goalName, setGoalName] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const handleAddGoal = () => {
    setOpenAddGoal(true);
  };

  const handleClose = () => {
    setOpenAddGoal(false);
    setGoalName("");
    setCurrentAmount("");
    setTargetAmount("");
  }

  const handleSaveGoal = () => {
    const newGoal = {
      id: Date.now(),
      name: goalName,
      current: Number(currentAmount),
      target: Number(targetAmount),
    };

    setGoals([...goals, newGoal]);
    handleClose();
  }

  const updateFundsButton = (
    <Button
          sx ={{
            backgroundColor: "green",
            color: "white",
            borderRadius: "2",
            mt: 1,
            "&:hover": {backgroundColor: "#006B01"},
          }}
          >
            Update funds
          </Button>
  );

  const GoalCard = ({ goal }) => (
    <Paper
    sx = {{
      maxWidth: "40%",
      p: 3,
      mb: 3,
      borderRadius: "16px",
      boxShadow: 5,
    }}
    >
      <Typography variant="h6" fontWeight="bold" fontFamily="'Open Sans', sans-serif">
        {goal.name}
      </Typography>

      <ProgressBar current={goal.current} target={goal.target} color = "#3CA0CA" />

      {updateFundsButton}
    </Paper>
  );

  return (
    <Box 
    sx = {{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    }}
    >
      <Box
      sx = {{
        flex: 3,
      }}
      >
        <Typography variant="h4" fontWeight="bold">
        Goals
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          Track your progress toward your financial goals.
        </Typography>

        <Button
        sx = {{
          mt: -2,
          mb: 3,
          backgroundColor: "green",
          color: "white",
          borderRadius: "2",
          "&:hover": {backgroundColor: "#006B01"},
        }}
        onClick = {handleAddGoal}
        >
          Add goal
        </Button>

        {/* Render Goals */ }
        {goals.length === 0 && (
          <Typography color = "text.secondary"
          sx = {{
            mt: -1,
          }}>
            No goals yet. Click "Add Goal" to get started!
          </Typography>
        )}

        {goals.map((g) => (
          <GoalCard key = {g.id} goal={g} />
        ))}

        {/* Add Goal (Menu) */}
        <Dialog open = {openAddGoal} onClose = {handleClose}>
          <DialogTitle> Add New Goal </DialogTitle>
          
          <DialogContent
          sx = {{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          >
            <TextField
              label = "Goal Name"
              fullWidth
              value = {goalName}
              onChange = {(e) => setGoalName(e.target.value)}
            />

            <TextField 
              label = "Current Amount"
              type = "number"
              fullWidth
              value = {currentAmount}
              onChange = {(e) => setCurrentAmount(e.target.value)}
            />

            <TextField 
              label = "Target Amount"
              type = "number"
              fullWidth
              value = {targetAmount}
              onChange = {(e) => setTargetAmount(e.target.value)}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>

            <Button
              onClick={handleSaveGoal}
              variant = "contained"
              sx = {{
                backgroundColor: "green",
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}