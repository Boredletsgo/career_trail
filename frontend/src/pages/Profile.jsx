import Navbar from "../components/common/Navbar";
import ProfileForm from "../components/profile/ProfileForm";

import { Container } from "@mui/material";

export default function Profile() {
  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <ProfileForm />
      </Container>
    </>
  );
}
