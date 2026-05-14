import axios from 'axios'
import { recommendLink } from './links'

export async function fetchRecommendations(type = 'smartphone', top = 5) {
  try {
    const res = await axios.get(recommendLink, { params: { type, top } })
    return res.data
  } catch (err) {
    console.error('Error fetching recommendations', err)
    throw err
  }
}

export default { fetchRecommendations }
