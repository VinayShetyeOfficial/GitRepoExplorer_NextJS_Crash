import { Suspense } from "react";
import Link from "next/link";
import Repo from "@/app/components/Repo";
import RepoDirs from "@/app/components/RepoDirs";

const RepoPage = async ({ params }) => {
  const { name } = await params; // Await the params object
  return (
    <div className="card">
      <Link href="/code/repos" className="btn btn-back">
        Back to Reposotories
      </Link>
      {/* <Suspense fallback={<div>Loading repo...</div>}> */}
      <Repo name={name} />
      {/* </Suspense> */}
      <Suspense fallback={<div>Loading directories...</div>}>
        <RepoDirs name={name} />
      </Suspense>
    </div>
  );
};

export default RepoPage;
