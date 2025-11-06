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
                <TableCell>Transaction</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Account</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Amount</TableCell>
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
    </Stack>
  );
}

