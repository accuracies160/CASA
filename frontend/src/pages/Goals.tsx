import {
  Typography,
  Box,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProgressBar from "../components/ProgressBar";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Goals() {
  const navigate = useNavigate();

  /* Login State */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    const email = localStorage.getItem("email");

    setIsLoggedIn(Boolean(loggedIn && email));
    setCheckingAuth(false);
  }, []);

  // If not logged in → clear goals and redirect
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    if (!checkingAuth && !isLoggedIn) {
      setGoals([]); // CLEAR goals on logout
    }
  }, [checkingAuth, isLoggedIn, navigate]);

  /* Fetch goals — ONLY IF LOGGED IN */
  const fetchGoals = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/goals", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setGoals(data);
      }
    } catch (err) {
      console.error("Failed to load goals:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchGoals();
  }, [isLoggedIn]);

  /* ----------------------------------------------------------
     ADD GOAL DIALOG
  ---------------------------------------------------------- */
  const [openAddGoal, setOpenAddGoal] = useState(false);

  const [goalName, setGoalName] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const handleAddGoal = () => setOpenAddGoal(true);

  const handleClose = () => {
    setOpenAddGoal(false);
    setGoalName("");
    setCurrentAmount("");
    setTargetAmount("");
  };

  const handleSaveGoal = async () => {
    const newGoal = {
      name: goalName,
      currentAmount: Number(currentAmount),
      targetAmount: Number(targetAmount),
    };

    try {
      const res = await fetch("http://localhost:8080/api/goals", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGoal),
      });

      const saved = await res.json();
      setGoals([...goals, saved]);
      handleClose();
    } catch (err) {
      console.error("Failed to save goal", err);
    }
  };

  /* Update Funds Button */
  const [openUpdate, setOpenUpdate] = useState(false);
  const [goalToUpdate, setGoalToUpdate] = useState(null);
  const [newAmount, setNewAmount] = useState("");

  const handleOpenUpdate = (goal) => {
    setGoalToUpdate(goal);
    setNewAmount(goal.currentAmount.toString());
    setOpenUpdate(true);
  };

  /* Goal Card */
  const GoalCard = ({ goal }) => (
    <Paper
      sx={{
        maxWidth: "40%",
        p: 3,
        mb: 3,
        borderRadius: "16px",
        boxShadow: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {goal.name}
        </Typography>

        {/* DELETE GOAL */}
        <IconButton
          color="error"
          size="small"
          onClick={async () => {
            await fetch(`http://localhost:8080/api/goals/${goal.id}`, {
              method: "DELETE",
              credentials: "include",
            });

            setGoals((prev) => prev.filter((g) => g.id !== goal.id));
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      <ProgressBar
        current={goal.currentAmount}
        target={goal.targetAmount}
        color="#3CA0CA"
      />

      <Button
        sx={{
          backgroundColor: "green",
          color: "white",
          borderRadius: "2",
          mt: 1,
          "&:hover": { backgroundColor: "#006B01" },
        }}
        onClick={() => handleOpenUpdate(goal)}
      >
        Update funds
      </Button>
    </Paper>
  );

  /* Auth Check */
  if (checkingAuth) return null;

  /* Page UI */
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <Box sx={{ flex: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Goals
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          Track your progress toward your financial goals.
        </Typography>

        <Button
          sx={{
            mt: -2,
            mb: 3,
            backgroundColor: "green",
            color: "white",
            borderRadius: "2",
            "&:hover": { backgroundColor: "#006B01" },
          }}
          onClick={handleAddGoal}
        >
          Add goal
        </Button>

        {goals.length === 0 && (
          <Typography color="text.secondary" sx={{ mt: -1 }}>
            No goals yet. Click "Add Goal" to get started!
          </Typography>
        )}

        {goals.map((g) => (
          <GoalCard key={g.id} goal={g} />
        ))}

        {/* ---------------------- ADD GOAL DIALOG ---------------------- */}
        <Dialog open={openAddGoal} onClose={handleClose}>
          <DialogTitle sx={{ mb: -1 }}>Add New Goal</DialogTitle>

          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Goal Name"
              fullWidth
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              sx={{ mt: 0.55 }}
            />

            <TextField
              label="Current Amount"
              type="number"
              fullWidth
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
            />

            <TextField
              label="Target Amount"
              type="number"
              fullWidth
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={handleSaveGoal}
              variant="contained"
              sx={{ backgroundColor: "green" }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* ---------------------- UPDATE FUNDS DIALOG ---------------------- */}
        <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)}>
          <DialogTitle>Update Funds</DialogTitle>

          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              pt: 1,
            }}
          >
            <Typography variant="body2">
              Goal: <strong>{goalToUpdate?.name}</strong>
            </Typography>

            <TextField
              label="New Current Amount"
              type="number"
              fullWidth
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenUpdate(false)}>Cancel</Button>

            <Button
              variant="contained"
              sx={{ backgroundColor: "green" }}
              onClick={async () => {
                try {
                  const res = await fetch(
                    `http://localhost:8080/api/goals/${goalToUpdate.id}`,
                    {
                      method: "PUT",
                      credentials: "include",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        currentAmount: Number(newAmount),
                      }),
                    }
                  );

                  const updated = await res.json();

                  setGoals((prev) =>
                    prev.map((g) => (g.id === updated.id ? updated : g))
                  );

                  setOpenUpdate(false);
                } catch (err) {
                  console.error("Failed to update goal:", err);
                }
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
