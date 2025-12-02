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

  /* ---------------- LOGIN STATE ---------------- */
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("loggedIn"))
  );

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    const displayName = localStorage.getItem("displayName");

    if (loggedIn && (!displayName || displayName.trim() === "")) {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("displayName");
      setIsLoggedIn(false);
    }
  }, []);

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
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("displayName");
    setIsLoggedIn(false);
    navigate("/login");
  };

  /* -------------------------------------- */

  /* ---------------- CHART STATE ---------------- */
  const [period, setPeriod] = useState<"Monthly" | "Weekly" | "Daily">(
    "Monthly"
  );
  /* -------------------------------------- */

  /* ---------------- CHART DATA (unchanged) ---------------- */
  const kpi = [
    { label: "My Balance", value: 0, delta: +0 },
    { label: "Total Income", value: 0, delta: +0 },
    { label: "Total Savings", value: 0, delta: -0 },
    { label: "Total Expenses", value: 0, delta: -0 },
  ];

  const monthlyData = [
    { name: "Jan", income: 3200, expense: 1600 },
    { name: "Feb", income: 3000, expense: 1400 },
    { name: "Mar", income: 3400, expense: 1150 },
    { name: "Apr", income: 3500, expense: 1200 },
    { name: "May", income: 3200, expense: 1550 },
    { name: "Jun", income: 3800, expense: 1800 },
    { name: "Jul", income: 3300, expense: 2100 },
    { name: "Aug", income: 3200, expense: 1900 },
    { name: "Sep", income: 3700, expense: 1500 },
    { name: "Oct", income: 3600, expense: 1400 },
    { name: "Nov", income: 3600, expense: 1200 },
    { name: "Dec", income: 3400, expense: 1400 },
  ];

  const weeklyData = [
    { name: "Week 1", income: 800, expense: 400 },
    { name: "Week 2", income: 1000, expense: 500 },
    { name: "Week 3", income: 800, expense: 400 },
    { name: "Week 4", income: 1100, expense: 450 },
  ];

  const dailyData = [
    { name: "Mon", income: 180, expense: 0 },
    { name: "Tue", income: 170, expense: 0 },
    { name: "Wed", income: 190, expense: 50 },
    { name: "Thu", income: 180, expense: 50 },
    { name: "Fri", income: 170, expense: 50 },
    { name: "Sat", income: 0, expense: 200 },
    { name: "Sun", income: 0, expense: 100 },
  ];

  const cashFlow = [
    { name: "Salary", value: 6200 },
    { name: "Expenses", value: 3865 },
  ];

  const tx = [
    {
      date: "10/12/25",
      name: "Resturant",
      type: "Cash",
      category: "Food",
      amount: -10.0,
    },
    {
      date: "10/10/25",
      name: "Resturant",
      type: "Cash",
      category: "Food",
      amount: -50,
    },
    {
      date: "10/10/25",
      name: "Paycheck",
      type: "Check",
      category: "Paycheck",
      amount: 7000,
    },
    {
      date: "10/07/25",
      name: "Share Market",
      type: "Check",
      category: "Business",
      amount: 11000,
    },
    {
      date: "10/06/25",
      name: "Invest Money",
      type: "Check",
      category: "Business",
      amount: 11000,
    },
  ];

  const currency = (n: number) =>
    n.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  const totalCashFlow = useMemo(
    () => cashFlow.reduce((a, b) => a + b.value, 0),
    []
  );

  const COLORS = ["#6ec1e4", "#f5b971"];

  const chartData =
    period === "Daily"
      ? dailyData
      : period === "Weekly"
      ? weeklyData
      : monthlyData;
  /* -------------------------------------- */

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

            <Select size="small" value="April" disabled>
              <MenuItem value="April">April</MenuItem>
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
              {tx.map((t, idx) => (
                <TableRow key={idx} hover>
                  <TableCell>{t.date}</TableCell>
                  <TableCell>{t.name}</TableCell>
                  <TableCell>{t.type}</TableCell>

                  <TableCell>
                    <Typography
                      sx={{
                        color: t.category === "Food" ? "orange" : "skyblue",
                        fontWeight: 600,
                      }}
                    >
                      {t.category}
                    </Typography>
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      color: t.amount < 0 ? "error.main" : "success.main",
                      fontWeight: 700,
                    }}
                  >
                    {t.amount < 0 ? "-" : ""}
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
