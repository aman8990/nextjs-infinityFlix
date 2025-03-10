export function groupEpisodesBySeason(episodes) {
  episodes.sort((a, b) => {
    if (a.season === b.season) {
      return a.episodeNumber - b.episodeNumber;
    }
    return a.season - b.season;
  });

  const grouped = episodes.reduce((acc, episode) => {
    const season = episode.season;
    if (!acc[season]) {
      acc[season] = { season, episodes: [] };
    }
    acc[season].episodes.push(episode);
    return acc;
  }, {});

  return Object.values(grouped);
}
