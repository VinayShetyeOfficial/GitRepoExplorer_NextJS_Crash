import Link from "next/link";
import { FaStar, FaCodeBranch, FaEye } from "react-icons/fa";

async function fetchRepos() {
  const token = "" // Replace with your token
  const response = await fetch(
    "https://api.github.com/users/bradtraversy/repos",
    {
      headers: {
        Authorization: `token ${token}`,
      },

      next: {
        revalidate: 60, // Re-fetches the repos every 60 seconds to ensure the list is up-to-date, as new repos are frequently created.
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repos");
  }

  const repos = await response.json();

  // Ensure repos is an array
  if (!Array.isArray(repos)) {
    throw new Error("Repos is not an array");
  }

  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second

  return repos;
}

const ReposPage = async () => {
  const repos = await fetchRepos();
  console.log(repos);
  return (
    <div className="repos-container">
      <h2>Repositories</h2>
      <ul className="repo-list">
        {repos.map((repo) => {
          return (
            // Added return statement here
            <li key={repo.id}>
              <Link href={`/code/repos/${repo.name}`}>
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
                <div className="repo-details">
                  <span>
                    <FaStar /> {repo.stargazers_count}
                  </span>
                  <span>
                    <FaCodeBranch /> {repo.forks_count}
                  </span>
                  <span>
                    <FaEye /> {repo.watchers_count}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ReposPage;
