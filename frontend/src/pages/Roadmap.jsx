import { useEffect, useState } from "react";
import { getRoadmap } from "../api/career";

import Navbar from "../components/common/Navbar";
import RoadmapCard from "../components/career/RoadmapCard";

import { Container, Typography } from "@mui/material";

export default function Roadmap() {
  const [roadmap, setRoadmap] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getRoadmap();
    if (res.success) setRoadmap(res.data);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Your Personalized Roadmap
        </Typography>

        {roadmap.map((step) => (
          <RoadmapCard key={step.id} step={step} />
        ))}
      </Container>
    </>
  );
}
