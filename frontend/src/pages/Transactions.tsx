import { useState } from "react";
import {
  Box,
  Stack,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Divider,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/AccessTime";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

<<<<<<< Updated upstream
const txData = [
  {
    id: 1,
    name: "ABC Company",
    category: "Salary",
    account: "Checking",
    date: "2024-12-15",
    status: "completed",
    amount: 3200,
    type: "income",
  },
  {
    id: 2,
    name: "Freelance Project",
    category: "Freelance",
    account: "Checking",
    date: "2024-12-12",
    status: "completed",
    amount: 3200,
    type: "income",
  },
  {
    id: 3,
    name: "Netflix Subscription",
    category: "Entertainment",
    account: "Credit Card",
    date: "2024-12-10",
    status: "pending",
    amount: -850,
    type: "expense",
  },
  {
    id: 4,
    name: "Online Store Payment",
    category: "Side Business",
    account: "PayPal",
    date: "2024-12-08",
    status: "pending",
    amount: 450,
    type: "income",
  },
  {
    id: 5,
    name: "Stock Dividends",
    category: "Investments",
    account: "Investment",
    date: "2024-12-10",
    status: "completed",
    amount: 3200,
    type: "income",
  },
  {
    id: 6,
    name: "Electric Bill",
    category: "Utilities",
    account: "Checking",
    date: "2024-12-12",
    status: "completed",
    amount: -850,
    type: "expense",
  },
];
=======
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

import axios from "axios";
import UploadCSV from "../components/UploadCSV";

// -----------------------------------------------------
// CONSTANTS
// -----------------------------------------------------
const COLORS = ["#6ec1e4", "#f5b971", "#9ccc65", "#ba68c8", "#ff8a65"];
>>>>>>> Stashed changes

const currency = (n: number) =>
  n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

export default function Transactions() {
  const [breakdown, setBreakdown] = useState("By Category");
  const [dateRange, setDateRange] = useState("This Month");
  const [search, setSearch] = useState("");
<<<<<<< Updated upstream

  const totalIncome = txData
    .filter((t) => t.amount > 0)
    .reduce((a, b) => a + b.amount, 0);
  const totalExpenses = txData
    .filter((t) => t.amount < 0)
    .reduce((a, b) => a + Math.abs(b.amount), 0);
  const netAmount = totalIncome - totalExpenses;

  const filteredTx = txData.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

=======
  const [statusFilter, setStatusFilter] = useState("All");

  const [sortBy, setSortBy] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // -----------------------------------------------------
  // UI Controls
  // -----------------------------------------------------
  const [openModal, setOpenModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // -----------------------------------------------------
  // New Transaction Form
  // -----------------------------------------------------

  const [newTx, setNewTx] = useState({
    name: "",
    category: "",
    account: "",
    date: "",
    amount: "",
    type: "income",
    status: "pending",
  });

  // -----------------------------------------------------
  // SORT KEY MAPPING
  // -----------------------------------------------------
  const SORT_MAP: Record<string, string> = {
    transaction: "name",
    category: "category",
    account: "account",
    date: "date",
    status: "status",
    amount: "amount",
  };


  // -----------------------------------------------------
  // Fetch User Transactions
  // -----------------------------------------------------
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/transactions",
          { withCredentials: true }
        );

        const transformed = res.data.map((t: any, index: number) => ({
          id: index + 1,
          name: t.description,
          category: t.category,
          account: "Bank",
          date: t.date,
          status: "completed",
          amount: Number(t.amount),
          type: Number(t.amount) >= 0 ? "income" : "expense",
        }));

        setTransactions(transformed);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    };

    fetchTransactions();
  }, []);


  // -----------------------------------------------------
  //  ADD NEW TRANSACTION MANUALLY
  // -----------------------------------------------------
  const handleAddTransaction = async () => {
    const parsedAmount = Number(newTx.amount);

    // Validation
    if (!newTx.name || !newTx.category || isNaN(parsedAmount)) {
      alert("Please fill all required fields correctly.");
      return;
    }

    try {
      // Backend transaction shape
        const txToSave = {
          description: newTx.name,
          category: newTx.category,
          date: newTx.date || new Date().toISOString().split("T")[0],
          amount: newTx.type === "expense" ? -Math.abs(parsedAmount) : Math.abs(parsedAmount),
        }; 

      // Send to backend
      await axios.post(
        "http://localhost:8080/api/transactions/add",
        txToSave,
        { withCredentials: true}
      );

      // Refresh transaction list from backend
      const res = await axios.get("http://localhost:8080/api/transactions", 
        { withCredentials: true }
      );

      const transformed = res.data.map((t: any, index: number) => ({
        id: index + 1,
        name: t.description,
        category: t.category,
        account: "Bank",
        date: t.date,
        status: "completed",
        amount: t.amount,
        type: t.amount >= 0 ? "income" : "expense",
      }));

      setTransactions(transformed);
      setSnackbarOpen(true);
      setOpenModal(false);

    } catch (err) {
      console.error("Failed to save transaction:", err);
      alert("Failed to save transaction.");
    }

    // Clear form
    setNewTx({
      name: "",
      category: "",
      account: "",
      date: "",
      amount: "",
      type: "income",
      status: "pending",
    });
  };

  const totalIncome = useMemo(
    () => transactions.filter((t) => t.amount > 0).reduce((a, b) => a + b.amount, 0),
    [transactions]
  );
  const totalExpenses = useMemo(
    () => transactions.filter((t) => t.amount < 0).reduce((a, b) => a + Math.abs(b.amount), 0),
    [transactions]
  );
  const netAmount = totalIncome - totalExpenses;

  const filteredTx = transactions
  .filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
  .filter((t) => (statusFilter === "All" ? true : t.status === statusFilter))
  .sort((a, b) => {
    const sortKey = SORT_MAP[sortBy];

    const valA = a[sortKey];
    const valB = b[sortKey];

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });


  type CategoryData = { name: string; value: number };
  const categorySummary: CategoryData[] = Object.values(
    transactions.reduce<Record<string, CategoryData>>((acc, cur) => {
      if (!acc[cur.category]) acc[cur.category] = { name: cur.category, value: 0 };
      acc[cur.category].value += Math.abs(cur.amount);
      return acc;
    }, {})
  );

  const handleSort = (field: string) => {
    setSortOrder(sortBy === field && sortOrder === "asc" ? "desc" : "asc");
    setSortBy(field);
  };

>>>>>>> Stashed changes
  return (
    <Stack spacing={3}>
      {/* Header */}
      <Box>
        <Typography variant="h4" fontWeight={800}>
          Transactions
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Comprehensive view of your finances
        </Typography>
      </Box>

      {/* Filters */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <Select
            size="small"
            value={breakdown}
            onChange={(e) => setBreakdown(e.target.value)}
            fullWidth
          >
            <MenuItem value="By Category">By Category</MenuItem>
            <MenuItem value="By Account">By Account</MenuItem>
            <MenuItem value="By Status">By Status</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={3}>
          <Select
            size="small"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            fullWidth
          >
            <MenuItem value="This Month">This Month</MenuItem>
            <MenuItem value="Last Month">Last Month</MenuItem>
            <MenuItem value="This Year">This Year</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            fullWidth
            sx={{ height: 40 }}
          >
            Filters
          </Button>
        </Grid>
      </Grid>

      {/* KPI Cards */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1}>
                <ArrowUpwardIcon color="success" />
                <Typography variant="subtitle2" color="text.secondary">
                  Total Income
                </Typography>
              </Stack>
              <Typography variant="h5" fontWeight={800}>
                {currency(totalIncome)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1}>
                <ArrowDownwardIcon color="error" />
                <Typography variant="subtitle2" color="text.secondary">
                  Total Expenses
                </Typography>
              </Stack>
              <Typography variant="h5" fontWeight={800}>
                {currency(totalExpenses)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle2" color="text.secondary">
                  Net Amount
                </Typography>
              </Stack>
              <Typography
                variant="h5"
                fontWeight={800}
                color={netAmount >= 0 ? "success.main" : "error.main"}
              >
                {currency(netAmount)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Transactions Table */}
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">All Transactions</Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                size="small"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                variant="contained"
                startIcon={<FileDownloadIcon />}
                color="primary"
              >
                Export
              </Button>
              <Button variant="contained" color="inherit">
                + Add Transaction
              </Button>
            </Stack>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Table size="small">
            <TableHead>
              <TableRow>
<<<<<<< Updated upstream
                <TableCell>Transaction</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Account</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Amount</TableCell>
=======
                {["Transaction", "Category", "Account", "Date", "Status", "Amount"].map((header) => (
                  <TableCell key={header}>
                    <TableSortLabel
                      active={sortBy === header.toLowerCase()}
                      direction={sortOrder}
                      onClick={() => handleSort(header.toLowerCase())}
                      >
                      {header}
                    </TableSortLabel>
                  </TableCell>
                ))}
>>>>>>> Stashed changes
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTx.map((t) => (
                <TableRow key={t.id} hover>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {t.type === "income" ? (
                        <ArrowUpwardIcon color="success" fontSize="small" />
                      ) : (
                        <ArrowDownwardIcon color="error" fontSize="small" />
                      )}
                      <Typography fontWeight={600}>{t.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{t.category}</TableCell>
                  <TableCell>{t.account}</TableCell>
                  <TableCell>{t.date}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={t.status}
                      color={
                        t.status === "completed"
                          ? "success"
                          : t.status === "pending"
                          ? "warning"
                          : "default"
                      }
                      icon={
                        t.status === "completed" ? (
                          <CheckCircleIcon fontSize="small" />
                        ) : (
                          <PendingIcon fontSize="small" />
                        )
                      }
                    />
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color:
                        t.amount >= 0 ? "success.main" : "error.main",
                      fontWeight: 700,
                    }}
                  >
                    {t.amount >= 0 ? "+" : "-"}
                    {currency(Math.abs(t.amount))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
<<<<<<< Updated upstream
=======

      {/* Add Transaction Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Transaction</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Transaction Name" fullWidth value={newTx.name} onChange={(e) => setNewTx({ ...newTx, name: e.target.value })} />
            <TextField
              select
              label="Category"
              fullWidth
              value={newTx.category}
              onChange={(e) => setNewTx({ ...newTx, category: e.target.value })}
            >
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Shopping">Shopping</MenuItem>
                <MenuItem value="Transport">Transport</MenuItem>
                <MenuItem value="Bills">Bills</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
                <MenuItem value="Health">Health</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <TextField
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newTx.date}
              onChange={(e) => setNewTx({ ...newTx, date: e.target.value })}
            />
            <TextField label="Amount (USD)" type="number" fullWidth value={newTx.amount} onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })} />
            <Select fullWidth value={newTx.type} onChange={(e) => setNewTx({ ...newTx, type: e.target.value })}>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
            <Select fullWidth value={newTx.status} onChange={(e) => setNewTx({ ...newTx, status: e.target.value })}>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleAddTransaction} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity="success" variant="filled">
          Transaction added successfully!
        </Alert>
      </Snackbar>
>>>>>>> Stashed changes
    </Stack>
  );
}

