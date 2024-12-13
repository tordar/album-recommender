import { Album } from '@/lib/types'

export default function RecommendationsList({ recommendations }: { recommendations: Album[] }) {
    console.log('Rendering RecommendationsList with:', recommendations)

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
            {recommendations.length === 0 ? (
                <p>No recommendations yet. Upload your albums to get started!</p>
            ) : (
                <ul className="space-y-2">
                    {recommendations.map((album, index) => (
                        <li key={index} className="bg-gray-100 p-2 rounded">
                            {album.artist} - {album.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

