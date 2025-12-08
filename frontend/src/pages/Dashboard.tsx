import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Menu,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Select,
  Stack,
  IconButton,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function Dashboard() {
  const navigate = useNavigate();

  const MONTHS = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const [selectedMonth, setSelectedMonth] = useState(
    MONTHS[new Date().getMonth()]
  );
  
  // Fetch Transactions
  const [transactions, setTransactions] = useState([]);

  async function fetchUserData() {
    try {
      const res = await fetch("http://localhost:8080/api/transactions", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok ) return;

      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to fetch user data", err);
    }
  }

  /* ---------------- LOGIN STATE ---------------- */
  const[isLoggedIn, setIsLoggedIn] = useState(false);

  const [checkingAuth, setCheckingAuth] = useState(true);


  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    const email = localStorage.getItem("email");

    setIsLoggedIn(Boolean(loggedIn && email));
    setCheckingAuth(false);
  }, []);

  useEffect(() =>{
    if(!checkingAuth && !isLoggedIn) {
      setTransactions([]);
      navigate("/dashboard"); // Change to "/login" in future
    }
  }, [checkingAuth, isLoggedIn, navigate]);

  useEffect(() => {
    if(isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  /* ---------------- MENU ---------------- */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.clear();
    setTransactions([]);

    setIsLoggedIn(false);
    navigate("/login");
  };

  /* -------------------------------------- */

  /* ---------------- CHART STATE ---------------- */
  const [period, setPeriod] = useState<"Monthly" | "Weekly" | "Daily">(
    "Monthly"
  );
  /* -------------------------------------- */

  /* ---------------- CHART DATA ---------------- */
  const COLORS = ["#6ec1e4", "#f5b971"];

  const currency = (n: number) =>
    n.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

    const totalIncome = useMemo(() => {
      return transactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  }, [transactions]);
  
  const balance = useMemo(() => {
    return totalIncome - totalExpenses;
  }, [totalIncome, totalExpenses]);

  const kpi = [
    { label: "My Balance", value: balance, delta: +0 },
    { label: "Total Income", value: totalIncome, delta: +0 },
    { label: "Total Expenses", value: totalExpenses, delta: -0 },
  ];

  const cashFlow = [
    { name: "Income", value: totalIncome},
    { name: "Expenses", value: totalExpenses},
  ]

  const totalCashFlow = totalIncome + totalExpenses;

  const chartData = useMemo(() => {
    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];
  
    // Start with all months = 0
    const monthly = {};
    months.forEach(m => {
      monthly[m] = { name: m, income: 0, expense: 0 };
    });
  
    // Fill in real data
    transactions.forEach(t => {
      const month = new Date(t.date).toLocaleString("en-US", { month: "short" });
  
      if (t.amount > 0) {
        monthly[month].income += t.amount;
      } else {
        monthly[month].expense += Math.abs(t.amount);
      }
    });
  
    return Object.values(monthly);
  }, [transactions]);
  

  /* -------------------------------------- */

  if (checkingAuth) return null;

  /* ---------------- DASHBOARD UI ---------------- */
  return (
    <Stack spacing={3}>
      {/* ---------------- TOP BAR ---------------- */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome back! Here’s your financial summary
          </Typography>
        </Box>

        {/* RIGHT ICONS */}
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton>
            <SearchIcon />
          </IconButton>

          <IconButton>
            <NotificationsNoneIcon />
          </IconButton>

          <Divider orientation="vertical" sx={{ height: 35 }} />

          <IconButton
            onClick={(e) => {
              if (!isLoggedIn) navigate("/login");
              else handleMenuOpen(e);
            }}
          >
            <AccountCircle />
          </IconButton>

          {/* ACCOUNT MENU */}
          <Menu 
          anchorEl={anchorEl} 
          open={open} 
          onClose={handleMenuClose}
          >

            {/* If NOT logged in, show Login */}
            {!isLoggedIn && (
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/login");
                }}
              >
                Login
              </MenuItem>
            )}

            {/* If logged in, show Profile */}
            {isLoggedIn && (
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/profile");
                }}
              >
                Profile
              </MenuItem>
            )}

            {/* If logged in, show Logout */}
            {isLoggedIn && (
              <>
                <Divider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            )}
          </Menu>
        </Stack>
      </Box>

      {/* ---------------- KPI CARDS ---------------- */}
      <Grid container spacing={2}>
        {kpi.map((k) => {
          const up = k.delta >= 0;
          return (
            <Grid item xs={12} md={6} lg={3} key={k.label}>
              <Card variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <Chip
                      size="small"
                      color={up ? "success" : "info"}
                      icon={up ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                      label={`${Math.abs(k.delta)}%`}
                    />
                  </Stack>

                  <Typography variant="subtitle2" color="text.secondary">
                    {k.label}
                  </Typography>
                  <Typography variant="h5" fontWeight={800}>
                    {currency(k.value)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* ---------------- SUMMARY CHART ---------------- */}
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Summary
                </Typography>

                <ToggleButtonGroup
                  size="small"
                  value={period}
                  exclusive
                  onChange={(_, v) => v && setPeriod(v)}
                >
                  <ToggleButton value="Daily">Daily</ToggleButton>
                  <ToggleButton value="Weekly">Weekly</ToggleButton>
                  <ToggleButton value="Monthly">Monthly</ToggleButton>
                </ToggleButtonGroup>
              </Stack>

              <Box sx={{ width: "100%", height: 280 }}>
                <ResponsiveContainer>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(v: number) => currency(v)} />
                    <Legend />
                    <Line dataKey="income" name="Income" stroke="#6ec1e4" strokeWidth={3} dot={false} />
                    <Line dataKey="expense" name="Expenses" stroke="#f5b971" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ---------------- PIE CHART CARD ---------------- */}
        <Grid item xs={12} lg={4}>
          <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight={700}>
                  Cash Flow
                </Typography>
                <Select size="small" value="Last Month" disabled>
                  <MenuItem value="Last Month">Last Month</MenuItem>
                </Select>
              </Stack>

              <Box sx={{ width: "100%", height: 240 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={cashFlow}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={70}
                      outerRadius={100}
                    >
                      {cashFlow.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}

                    </Pie>
                    <Tooltip formatter={(v: number) => currency(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>

              <Stack direction="row" justifyContent="center" spacing={3} mt={1} mb={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: COLORS[0] }} />
                  <Typography variant="body2">Income</Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: COLORS[1] }} />
                  <Typography variant="body2">Expenses</Typography>
                </Stack>
              </Stack>

              <Stack direction="row" justifyContent="center" spacing={1}>
                <Typography variant="caption">Total</Typography>
                <Typography fontWeight={800}>
                  {currency(totalCashFlow)}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ---------------- TRANSACTIONS TABLE ---------------- */}
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Typography variant="h6">Latest Transactions</Typography>

            <Select 
            size="small" 
            value = {selectedMonth}
            onChange = {(e) => setSelectedMonth(e.target.value)}
            >
              {MONTHS.map((m) => (
                <MenuItem key = {m} value = {m}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </Stack>

          <Divider sx={{ mb: 1 }} />

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {transactions.slice(0, 5).map((t, idx) => (
                <TableRow key={idx} hover>
                  <TableCell>{t.date}</TableCell>
                  <TableCell>{t.description}</TableCell>

                  <TableCell>{t.amount >= 0 ? "Income" : "Expense"}</TableCell>

                  <TableCell>
                    <Typography
                    sx = {{
                      color: t.category === "Food" ? "orange" : "skyblue",
                      fontWeight: 600,
                    }}
                    >
                      {t.category}
                    </Typography>
                  </TableCell>

                  <TableCell
                  align="right"
                  sx = {{
                    color: t.amount < 0 ? "error.main" : "success.main",
                    fontWeight: 700,
                  }}
                  >
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