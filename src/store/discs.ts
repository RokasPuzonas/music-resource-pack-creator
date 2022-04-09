import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Disc {
	title: string
	description: string
	icon: string
}

interface DiscsState {
	discs: Disc[]
}

const initialState: DiscsState = {
	discs: [
		{ title: "Music Disc", description: "C418 - 13", icon: "/sprites/music_disc_13.png" },
		{ title: "Music Disc", description: "C418 - cat", icon: "/sprites/music_disc_cat.png" },
		{ title: "Music Disc", description: "C418 - blocks", icon: "/sprites/music_disc_blocks.png" },
	]
}

export const discsSlice = createSlice({
  name: "discs",
  initialState,
  reducers: {
		updateTitle: (state, action: PayloadAction<{ id: number, title: string }>) => {
			const { id, title } = action.payload;
			state.discs[id].title = title
		},
		updateDescription: (state, action: PayloadAction<{ id: number, description: string }>) => {
			const { id, description } = action.payload;
			state.discs[id].description = description
		}
  }
})

export const { updateTitle, updateDescription } = discsSlice.actions

export default discsSlice.reducer
