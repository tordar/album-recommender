'use client'

import { useState } from 'react'
import AlbumUploader from '@/components/album-uploader'
import RecommendationsList from '@/components/recommendations-list'
import { Album } from '@/lib/types'
import { getRecommendationsAction } from './actions'

export default function Home() {
    const [recommendations, setRecommendations] = useState<Album[]>([])

    const handleRecommendationsReceived = (newRecommendations: Album[]) => {
        console.log('Recommendations received in Home component:', newRecommendations)
        setRecommendations(newRecommendations)
    }

    const handleTestRecommendations = async () => {
        console.log('Test button clicked')
        try {
            const testAlbums = [{ artist: 'The Beatles', name: 'Abbey Road' }]
            const newRecommendations = await getRecommendationsAction(testAlbums)
            console.log('Test recommendations received:', newRecommendations)
            setRecommendations(newRecommendations)
        } catch (error) {
            console.error('Error in test recommendations:', error)
        }
    }

    return (
        <main className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-8">Album Recommender</h1>
            <AlbumUploader onRecommendationsReceived={handleRecommendationsReceived} />
            <button
                onClick={handleTestRecommendations}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Test Get Recommendations
            </button>
            <RecommendationsList recommendations={recommendations} />
        </main>
    )
}

