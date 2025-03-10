import getMovies from '@/app/_actions/getMovies';

async function DashboardUI() {
  const { latest, marvel, dc, hollywood, bollywood, punjabi } =
    await getMovies();

  return (
    <div>
      <h1 className="text-center text-3xl md:text-4xl mb-14 mt-20">
        Dashboard
      </h1>

      <div className="max-w-[40rem] mx-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">No. of Movies</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border text-center">
              <td className="border px-4 py-2">Latest</td>
              <td className="border px-4 py-2">{latest.length}</td>
            </tr>
            <tr className="border text-center">
              <td className="border px-4 py-2">Marvel</td>
              <td className="border px-4 py-2">{marvel.length}</td>
            </tr>
            <tr className="border text-center">
              <td className="border px-4 py-2">DC</td>
              <td className="border px-4 py-2">{dc.length}</td>
            </tr>
            <tr className="border text-center">
              <td className="border px-4 py-2">Hollywood</td>
              <td className="border px-4 py-2">{hollywood.length}</td>
            </tr>
            <tr className="border text-center">
              <td className="border px-4 py-2">Bollywood</td>
              <td className="border px-4 py-2">{bollywood.length}</td>
            </tr>
            <tr className="border text-center">
              <td className="border px-4 py-2">Punjabi</td>
              <td className="border px-4 py-2">{punjabi.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardUI;
