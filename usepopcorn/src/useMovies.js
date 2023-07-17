import { useState, useEffect } from "react";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const KEY = "af953912";

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        setIsLoading(true);
        setError("");
        try {
          const res = await fetch(
            ` http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error("⛔ Movie not found");
          setMovies(data.Search);
          setError("");

          setIsLoading(false);
        } catch (err) {
          console.log(err.message);

          if (err.name !== "AbortController") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
