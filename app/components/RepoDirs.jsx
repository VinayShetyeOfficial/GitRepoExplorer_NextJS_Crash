import Link from "next/link";

async function fetchRepoContents(name) {
  // Simulating a delay of 3 seconds before fetching
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await fetch(
    `https://api.github.com/repos/bradtraversy/${name}/contents`,
    {
      next: {
        revalidate: 60, // Re-fetches the repos every 60 seconds to ensure the list is up-to-date, as new repos are frequently created.
      },
    }
  );

  const contents = await response.json();
  return contents;
}

const RepoDirs = async ({ name }) => {
  const contents = await fetchRepoContents(name);
  const dirs = contents.filter((content) => content.type === "dir");
  return (
    <>
      <h3>Directories</h3>
      <ul>
        {dirs.map((dir) => (
          <li key={dir.path}>
            <Link href={`/code/repos/${name}/${dir.path}`}>{dir.path}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RepoDirs;
