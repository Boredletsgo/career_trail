import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";

import { useAuth } from "../context/AuthContext";
import { getUserSummary, getUserLogs, getLatestRecommendations } from "../api/dashboard";

export default function Dashboard() {
  const { user } = useAuth();

  const [summary, setSummary] = useState(null);
  const [logs, setLogs] = useState([]);
  const [reco, setReco] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [summaryRes, logsRes, recoRes] = await Promise.all([
        getUserSummary(),
        getUserLogs(),
        getLatestRecommendations()
      ]);
      setSummary(summaryRes.data);
      setLogs(logsRes.data.logs || []);
      setReco(recoRes.data || null);
    } catch (err) {
      console.error(err);
      alert("Failed to load dashboard data");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: 4 }}>
      {/* Welcome Header */}
      <Typography variant="h4" fontWeight={700} mb={2}>
        Welcome back, {user?.name} 👋
      </Typography>

      <Typography variant="subtitle1" color="gray" mb={4}>
        Here's your progress summary!
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="subtitle2" color="gray">
                Total Skills Updated
              </Typography>
              <Typography variant="h4" fontWeight={600} mt={1}>
                {summary?.skills_updated || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="subtitle2" color="gray">
                Recommendations Generated
              </Typography>
              <Typography variant="h4" fontWeight={600} mt={1}>
                {summary?.recommendations || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="subtitle2" color="gray">
                Activities Logged
              </Typography>
              <Typography variant="h4" fontWeight={600} mt={1}>
                {summary?.activity_logs || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Two Section Layout */}
      <Grid container spacing={3} mt={1}>
        
        {/* Activity Logs */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 4, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Recent Activity
              </Typography>

              <List>
                {logs.length === 0 && (
                  <Typography color="gray">No activity yet.</Typography>
                )}

                {logs.map((log, i) => (
                  <>
                    <ListItem key={i} dense>
                      <ListItemText
                        primary={log.activity_type}
                        secondary={log.created}
                      />
                    </ListItem>
                    {i < logs.length - 1 && <Divider />}
                  </>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Latest Recommendation */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Latest Career Recommendation
              </Typography>

              {!reco ? (
                <Typography color="gray">No recommendations yet.</Typography>
              ) : (
                <>
                  <Typography variant="h5" fontWeight={700}>
                    {reco.career_path}
                  </Typography>

                  <Typography color="gray" mt={1}>
                    Skills Gap: {reco.skills_gap || "N/A"}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="body1">{reco.summary}</Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
// import { useEffect, useState } from "react";
// import { getDashboardStats } from "../api/dashboard";
// import Navbar from "../components/common/Navbar";
// import StatsCard from "../components/dashboard/StatsCard";
// import ActivityCard from "../components/dashboard/ActivityCard";

// import { Grid, Container, Typography } from "@mui/material";

// export default function Dashboard() {
//   const [stats, setStats] = useState(null);
//   const [activities, setActivities] = useState([]);

//   useEffect(() => {
//     async function load() {
//       const res = await getDashboardStats();
//       if (res.success) {
//         setStats(res.data.stats);
//         setActivities(res.data.activities);
//       }
//     }
//     load();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <Container maxWidth="lg" sx={{ mt: 4 }}>
//         <Typography variant="h4" fontWeight="bold" mb={2}>
//           Dashboard
//         </Typography>

//         <Grid container spacing={3}>
//           {stats &&
//             Object.entries(stats).map(([label, value]) => (
//               <Grid item xs={12} sm={6} md={3} key={label}>
//                 <StatsCard label={label} value={value} />
//               </Grid>
//             ))}
//         </Grid>

//         <Typography variant="h5" fontWeight="bold" mt={5} mb={2}>
//           Recent Activities
//         </Typography>

//         {activities.map((a) => (
//           <ActivityCard key={a.id} activity={a} />
//         ))}
//       </Container>
//     </>
//   );
// }
