// 404.js
import Link from "next/link";

//this is only shown in production mode
export default function serverError() {
  return (
    <>
      <h1>500 - Server Error</h1>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </>
  );
}
