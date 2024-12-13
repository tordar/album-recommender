import { Album } from './types'

export function parseCSV(csvText: string): Album[] {
    const lines = csvText.split('\n')
    const albums: Album[] = []

    // Skip the header row
    for (let i = 1; i < lines.length; i++) {
        const [artist, name] = lines[i].split(',').map(item => item.trim())
        if (artist && name) {
            albums.push({ artist, name })
        }
    }

    return albums
}

