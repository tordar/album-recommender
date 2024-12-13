'use server'

import { Album } from '@/lib/types'

const LASTFM_API_KEY = process.env.LASTFM_API_KEY

export async function getRecommendations(albums: Album[]): Promise<Album[]> {
    console.log('Starting getRecommendations with albums:', albums)
    const recommendations: Album[] = []

    for (const album of albums) {
        const url = new URL('http://ws.audioscrobbler.com/2.0/')
        url.searchParams.append('method', 'album.getinfo')
        url.searchParams.append('artist', album.artist)
        url.searchParams.append('album', album.name)
        url.searchParams.append('api_key', LASTFM_API_KEY || '')
        url.searchParams.append('format', 'json')

        try {
            console.log(`Fetching info for ${album.artist} - ${album.name}`)
            console.log('URL:', url.toString()) // Log the full URL for debugging
            const response = await fetch(url.toString())
            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
            }
            const data = await response.json()

            if (data.album) {
                console.log(`Successfully fetched info for ${album.artist} - ${album.name}`)
                // For now, we'll just add the original album to recommendations
                recommendations.push(album)
            } else {
                console.log(`No album info found for ${album.artist} - ${album.name}`)
            }
        } catch (error) {
            console.error(`Error fetching info for ${album.artist} - ${album.name}:`, error)
        }
    }

    console.log('Final recommendations:', recommendations)
    return recommendations
}

