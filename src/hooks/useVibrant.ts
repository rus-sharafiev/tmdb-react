import { useEffect, useState } from 'react'
import * as Vibrant from 'node-vibrant/dist/vibrant'
import { Palette } from '@vibrant/color/lib'

interface HexPalette {
    Vibrant: string | undefined,
    DarkVibrant: string | undefined,
    LightVibrant: string | undefined,
    Muted: string | undefined,
    DarkMuted: string | undefined,
    LightMuted: string | undefined,
}

const useVibrant = () => {
    const [palette, setPalette] = useState<Palette>()
    const [hexPalette, setHexPalette] = useState<HexPalette>()
    const [imgPath, setImgPath] = useState('')

    const setImagePath: ((imgPath: string) => void) = (imgPath: string) => {
        imgPath && setImgPath(imgPath)
    }

    useEffect(() => {
        if (imgPath) {
            Vibrant.from(imgPath).getPalette()
                .then((palette: Palette) => setPalette(palette))
        }
    }, [imgPath])

    useEffect(() => {
        if (palette) {
            setHexPalette({
                Vibrant: palette.Vibrant?.hex,
                DarkVibrant: palette.DarkVibrant?.hex,
                LightVibrant: palette.LightVibrant?.hex,
                Muted: palette.Muted?.hex,
                DarkMuted: palette.DarkMuted?.hex,
                LightMuted: palette.LightMuted?.hex,
            })
        }
    }, [palette])

    return [hexPalette, setImagePath] as const
}

export default useVibrant