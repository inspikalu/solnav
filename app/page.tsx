import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>This is home page</div>
      You can go to you dashboard here <Link href={'/dashboard'}>Go to dashboard</Link>
    </>
  );
}
