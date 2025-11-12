import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Box, Card, CardContent, Grid, Typography, Chip, Divider, ToggleButtonGroup, ToggleButton, Table, TableHead, TableRow, TableCell, TableBody, MenuItem, Select, Stack, Button } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, PieChart, Pie, Cell,} from "recharts";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { IconButton, Avatar } from "@mui/material";
import TopBar from "../components/TopBar";

const kpi = [
  { label: "My Balance", value: 23516, delta: +20 },
  { label: "Total Income", value: 45454, delta: +19 },
  { label: "Total Savings", value: 32654, delta: -22 },
  { label: "Total Expenses", value: 21938, delta: -27 },
];

const monthlyData = [
  { name: "Jan", income: 3200, expense: 2800 },
  { name: "Feb", income: 3000, expense: 2600 },
  { name: "Mar", income: 3400, expense: 3150 },
  { name: "Apr", income: 1500, expense: 1200 },
  { name: "May", income: 2200, expense: 2350 },
  { name: "Jun", income: 1800, expense: 1100 },
  { name: "Jul", income: 3300, expense: 2100 },
  { name: "Aug", income: 1200, expense: 900 },
  { name: "Sep", income: 1700, expense: 1500 },
  { name: "Oct", income: 3600, expense: 3400 },
  { name: "Nov", income: 1600, expense: 1200 },
  { name: "Dec", income: 3400, expense: 1400 },
];

const weeklyData = [
  { name: "Week 1", income: 1200, expense: 800 },
  { name: "Week 2", income: 1500, expense: 900 },
  { name: "Week 3", income: 1000, expense: 1100 },
  { name: "Week 4", income: 1800, expense: 1300 },
];

const dailyData = [
  { name: "Mon", income: 500, expense: 300 },
  { name: "Tue", income: 700, expense: 400 },
  { name: "Wed", income: 800, expense: 450 },
  { name: "Thu", income: 600, expense: 500 },
  { name: "Fri", income: 900, expense: 600 },
  { name: "Sat", income: 300, expense: 200 },
  { name: "Sun", income: 400, expense: 350 },
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

export default function Dashboard() {
  const navigate = useNavigate();

  const [period, setPeriod] = useState<"Monthly" | "Weekly" | "Daily">(
    "Monthly"
  );
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

  <Box sx={{ width: "100%", height: 280 }}>
    <ResponsiveContainer>
      <BarChart data={chartData} barGap={6}>
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(v) => (v >= 1000 ? `$${v / 1000}k` : `$${v}`)} />
        <Tooltip formatter={(v: number) => currency(v)} />
        <Legend />
        <Bar
          dataKey="income"
          name="Income"
          fill="#6ec1e4"
          radius={[8, 8, 0, 0]}
        />
        <Bar
          dataKey="expense"
          name="Expenses"
          fill="#f5b971"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </Box>;

  return (
    <Stack spacing={3}>
      <Box
      sx = {{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome back! Here’s your financial summary
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
          sx = {{
            backgroundColor: "#fffff",
            boxShadow: 1,
            "&:hover": {backgroundColor: "#f5f5f5"},
          }}
          >
            <SearchIcon />
          </IconButton>

          <IconButton
            sx = {{
              backgroundColor: "#fffff",
              boxShadow: 1,
              "&:hover": {backgroundColor: "#f5f5f5"},
            }}
            >
              <NotificationsNoneIcon />
          </IconButton>

          <Divider 
          orientation="vertical"
          sx= {{
            bgcolor: "#ebecee",
            height: 35,
          }} 
          />

          <IconButton
            onClick = {() => navigate("/login")}
            sx = {{
              backgroundColor: "#fffff",
              boxShadow: 1,
              "&:hover": {backgroundColor: "#f5f5f5"},
            }}
            >
              <AccountCircle />
          </IconButton>
        </Stack>
      </Box>

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
                      sx={{ fontWeight: 700 }}
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

      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
              >
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
                  <BarChart data={monthlyData} barGap={6}>
                    <XAxis dataKey="name" />
                    <YAxis
                      tickFormatter={(v) =>
                        v >= 1000 ? `$${v / 1000}k` : `$${v}`
                      }
                    />
                    <Tooltip formatter={(v: number) => currency(v)} />
                    <Legend />
                    <Bar
                      dataKey="income"
                      name="Income"
                      fill="#6ec1e4"
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar
                      dataKey="expense"
                      name="Expenses"
                      fill="#f5b971"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1" fontWeight={700}>
                  Cash Flow
                </Typography>
                <Select size="small" value="Last Month" disabled>
                  <MenuItem value="Last Month">Last Month</MenuItem>
                </Select>
              </Stack>

              <Grid container spacing={2} mt={1}>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Daily
                  </Typography>
                  <Typography fontWeight={800}>$3,296</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Weekly
                  </Typography>
                  <Typography fontWeight={800}>$5,840</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Monthly
                  </Typography>
                  <Typography fontWeight={800}>$8,396</Typography>
                </Grid>
              </Grid>

              <Box sx={{ width: "100%", height: 240 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={cashFlow}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={2}
                    >
                      {cashFlow.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => currency(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>

              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                mt={-1}
                mb={1}
              >
                <Typography variant="caption" color="text.secondary">
                  Total
                </Typography>
                <Typography fontWeight={800}>
                  {currency(totalCashFlow)}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2} justifyContent="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: COLORS[0],
                    }}
                  />
                  <Typography variant="caption">Salary</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: COLORS[1],
                    }}
                  />
                  <Typography variant="caption">Expenses</Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
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
