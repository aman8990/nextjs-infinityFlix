import SearchBox from './_components/SearchBox';

function Page() {
  return (
    <div className="fixed pb-20 top-20 md:top-24 inset-0 overflow-y-scroll scrollbar-none">
      <div className="flex justify-center h-full">
        <SearchBox />
      </div>
    </div>
  );
}

export default Page;
