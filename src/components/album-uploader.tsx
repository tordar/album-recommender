'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { parseCSV } from '@/lib/csv-parser'
import { Album } from '@/lib/types'
import { getRecommendationsAction } from '@/app/actions'

export default function AlbumUploader({ onRecommendationsReceived }: { onRecommendationsReceived: (recs: Album[]) => void }) {
    const [albums, setAlbums] = useState<Album[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('File upload started')
        const file = event.target.files?.[0]
        if (file) {
            console.log('File selected:', file.name)
            const text = await file.text()
            console.log('File content:', text.substring(0, 100) + '...')
            const parsedAlbums = parseCSV(text)
            console.log('Parsed albums:', parsedAlbums)
            setAlbums(parsedAlbums)
            setIsLoading(true)
            try {
                console.log('Calling getRecommendationsAction...')
                const recommendations = await getRecommendationsAction(parsedAlbums)
                console.log('Received recommendations:', recommendations)
                onRecommendationsReceived(recommendations)
            } catch (error) {
                console.error('Error getting recommendations:', error)
            } finally {
                setIsLoading(false)
            }
        }
    }

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Upload Your Albums</h2>
            <Input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="mb-4"
                disabled={isLoading}
            />
            <p className="text-sm text-gray-500">
                Upload a CSV file with columns: Artist, Album
            </p>
            {albums.length > 0 && (
                <p className="mt-4">
                    {albums.length} albums uploaded successfully!
                </p>
            )}
            {isLoading && <p>Loading recommendations...</p>}
        </div>
    )
}

