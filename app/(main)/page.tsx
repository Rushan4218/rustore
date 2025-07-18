import Link from "next/link";
import React from "react";

const MainPage = () => {
  return (
    <div>
      <Link href="/signin">Sign In</Link>
      <Link href="/signup">Sign Up</Link>
      <Link href="/admin">Admin</Link>
    </div>
  );
};

export default MainPage;
