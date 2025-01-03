import Link from "next/link";
import { FaStar, FaCodeBranch, FaEye } from "react-icons/fa";

async function fetchRepos() {
  const response = await fetch("https://api.github.com/users/bradtraversy/repos");

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
