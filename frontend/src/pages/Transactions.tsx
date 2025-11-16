import { useMemo, useState } from "react";
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
  TableSortLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/AccessTime";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#6ec1e4", "#f5b971", "#9ccc65", "#ba68c8", "#ff8a65"];

const currency = (n: number) =>
  n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

export default function TransactionsPlus() {
  const [transactions, setTransactions] = useState([
    { id: 1, name: "ABC Company", category: "Salary", account: "Checking", date: "2024-12-15", status: "completed", amount: 3200, type: "income" },
    { id: 2, name: "Freelance Project", category: "Freelance", account: "Checking", date: "2024-12-12", status: "completed", amount: 3200, type: "income" },
    { id: 3, name: "Netflix Subscription", category: "Entertainment", account: "Credit Card", date: "2024-12-10", status: "pending", amount: -850, type: "expense" },
    { id: 4, name: "Online Store Payment", category: "Side Business", account: "PayPal", date: "2024-12-08", status: "pending", amount: 450, type: "income" },
    { id: 5, name: "Stock Dividends", category: "Investments", account: "Investment", date: "2024-12-10", status: "completed", amount: 3200, type: "income" },
    { id: 6, name: "Electric Bill", category: "Utilities", account: "Checking", date: "2024-12-12", status: "completed", amount: -850, type: "expense" },
  ]);

  const [breakdown, setBreakdown] = useState("By Category");
  const [dateRange, setDateRange] = useState("This Year");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState<keyof typeof transactions[0]>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [openModal, setOpenModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [newTx, setNewTx] = useState({
    name: "",
    category: "",
    account: "",
    date: "",
    amount: "",
    type: "income",
    status: "pending",
  });

  const handleAddTransaction = () => {
    const parsedAmount = Number(newTx.amount);
    if (!newTx.name || !newTx.category || isNaN(parsedAmount)) {
      alert("Please fill all required fields correctly.");
      return;
    }

    const tx = {
      id: transactions.length + 1,
      name: newTx.name,
      category: newTx.category,
      account: newTx.account || "N/A",
      date: newTx.date || new Date().toISOString().split("T")[0],
      status: newTx.status,
      type: newTx.type,
      amount: newTx.type === "expense" ? -Math.abs(parsedAmount) : Math.abs(parsedAmount),
    };

    setTransactions((prev) => [...prev, tx]);
    setStatusFilter("All"); // ✅ Always show all transactions after adding
    setOpenModal(false);
    setSnackbarOpen(true);

    // Reset the form
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
      const valA = a[sortBy];
      const valB = b[sortBy];
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

  const handleSort = (field: keyof typeof transactions[0]) => {
    const isAsc = sortBy === field && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortBy(field);
  };

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
          <Select size="small" value={breakdown} onChange={(e) => setBreakdown(e.target.value)} fullWidth>
            <MenuItem value="By Category">By Category</MenuItem>
            <MenuItem value="By Account">By Account</MenuItem>
            <MenuItem value="By Status">By Status</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={3}>
          <Select size="small" value={dateRange} onChange={(e) => setDateRange(e.target.value)} fullWidth>
            <MenuItem value="This Month">This Month</MenuItem>
            <MenuItem value="Last Month">Last Month</MenuItem>
            <MenuItem value="This Year">This Year</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={3}>
          <Select size="small" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} fullWidth>
            <MenuItem value="All">All Statuses</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button variant="outlined" startIcon={<FilterListIcon />} fullWidth sx={{ height: 40 }}>
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
              <Typography variant="subtitle2" color="text.secondary">
                Net Amount
              </Typography>
              <Typography variant="h5" fontWeight={800} color={netAmount >= 0 ? "success.main" : "error.main"}>
                {currency(netAmount)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      

      {/* Transactions Table */}
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">All Transactions</Typography>
            <Stack direction="row" spacing={2}>
              <TextField size="small" placeholder="Search transactions..." value={search} onChange={(e) => setSearch(e.target.value)} />
              <Button variant="contained" startIcon={<FileDownloadIcon />} color="primary">
                Export
              </Button>
              <Button variant="contained" color="inherit" onClick={() => setOpenModal(true)}>
                + Add Transaction
              </Button>
            </Stack>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Table size="small">
            <TableHead>
              <TableRow>
                {["Transaction", "Category", "Account", "Date", "Status", "Amount"].map((header) => (
                  <TableCell key={header}>
                    <TableSortLabel
                      active={sortBy === header.toLowerCase()}
                      direction={sortOrder}
                      onClick={() => handleSort(header.toLowerCase() as keyof typeof transactions[0])}
                    >
                      {header}
                    </TableSortLabel>
                  </TableCell>
                ))}
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
                      color={t.status === "completed" ? "success" : t.status === "pending" ? "warning" : "default"}
                      icon={t.status === "completed" ? <CheckCircleIcon fontSize="small" /> : <PendingIcon fontSize="small" />}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ color: t.amount >= 0 ? "success.main" : "error.main", fontWeight: 700 }}>
                    {t.amount >= 0 ? "+" : "-"}
                    {currency(Math.abs(t.amount))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Transaction Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Transaction</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Transaction Name" fullWidth value={newTx.name} onChange={(e) => setNewTx({ ...newTx, name: e.target.value })} />
            <TextField label="Category" fullWidth value={newTx.category} onChange={(e) => setNewTx({ ...newTx, category: e.target.value })} />
            <TextField label="Account" fullWidth value={newTx.account} onChange={(e) => setNewTx({ ...newTx, account: e.target.value })} />
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
    </Stack>
  );
}
