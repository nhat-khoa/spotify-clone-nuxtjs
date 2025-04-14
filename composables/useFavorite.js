export const useFavorite = () => {
  const typeToApi = {
    track: '/api/libraries/tracks',
    album: '/api/libraries/albums',
    playlist: '/api/libraries/playlists',
    artist: '/api/libraries/artists',
    podcast: '/api/libraries/podcasts',
    episode: '/api/libraries/episodes',
  }

  const favorite = async ({ type, id, action }) => {
    const baseUrl = typeToApi[type]
    if (!baseUrl) {
      throw new Error(`Unknown favorite type: ${type}`)
    }

    const url = `${baseUrl}/${action}_${type}`

    const { data, error } = await useFetch(url, {
      method: 'POST',
      body: { [`${type}_id`]: id },
    })

    if (error.value) {
      throw error.value
    }

    return data.value
  }

  return { favorite }
}
