import CenterTitleSkeleton from "@/components/shared/PageTitleLoading";
import { Suspense } from "react";

const Home = () => {

  return (
    <Suspense fallback={<CenterTitleSkeleton />}>
      <div className="flex min-h-[calc(100vh-68px)] flex-col justify-center items-center text-center px-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          Üdv a fejlesztői játszótéren!
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A tesztelésre szánt funkciók gyűjtőhelye.
        </p>
      </div>
    </Suspense>
  );
}

export default Home