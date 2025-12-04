import { useEffect, useState } from "react";
import { getCareerRecommendations } from "../api/career";

import Navbar from "../components/common/Navbar";
import RecommendationCard from "../components/career/RecommendationCard";

import { Container, Typography } from "@mui/material";

export default function Career() {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getCareerRecommendations();
    if (res.success) setRecs(res.data);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Career Recommendations
        </Typography>

        {recs.map((r) => (
          <RecommendationCard key={r.id} rec={r} />
        ))}
      </Container>
    </>
  );
}
