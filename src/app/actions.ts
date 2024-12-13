'use server'

import { Album } from '@/lib/types'
import { getRecommendations as fetchRecommendations } from './actions/get-recommendations'
import fs from 'fs'
import path from 'path'

export async function getRecommendationsAction(albums: Album[]) {
    console.log('getRecommendationsAction called with albums:', albums)

    // Log to a file for server-side debugging
    const logMessage = `getRecommendationsAction called at ${new Date().toISOString()} with albums: ${JSON.stringify(albums)}\n`
    fs.appendFileSync(path.join(process.cwd(), 'server-logs.txt'), logMessage)

    try {
        const recommendations = await fetchRecommendations(albums)
        console.log('Recommendations received:', recommendations)

        // Log recommendations to file
        fs.appendFileSync(path.join(process.cwd(), 'server-logs.txt'), `Recommendations received: ${JSON.stringify(recommendations)}\n`)

        return recommendations
    } catch (error) {
        console.error('Error in getRecommendationsAction:', error)

        // Log error to file
        fs.appendFileSync(path.join(process.cwd(), 'server-logs.txt'), `Error in getRecommendationsAction: ${error}\n`)

        throw error
    }
}

