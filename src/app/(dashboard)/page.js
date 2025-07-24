import CenterTitleSkeleton from "@/components/shared/PageTitleLoading";
import { Suspense } from "react";

const Home = () => {

  return (
    <Suspense fallback={<CenterTitleSkeleton />}>
      <div className="flex min-h-[calc(100vh-68px)] justify-center items-center">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Welcome to Playground!
        </h1>
      </div>
    </Suspense>
  );
}

export default Home