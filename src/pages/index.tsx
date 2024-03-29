import { type NextPage } from "next";
import { NewBlastForm } from "~/components/NewBlastForm";
import { RecentBlasts } from "~/components/RecentBlasts";

const Home: NextPage = () => {
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2">
        <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
      </header>
      <NewBlastForm />
      <RecentBlasts />
    </>
  );
};

export default Home;
