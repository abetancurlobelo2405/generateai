import Link from "next/link";
import React from "react";

const RawLogin = () => {
  return (
    <>
      <div>RawLogin</div>
      <Link href="/user/plans?anonymous=true">Anonymous</Link>
      <Link href="/user/login">Na, better Log me In!</Link>
    </>
  );
};

export default RawLogin;
