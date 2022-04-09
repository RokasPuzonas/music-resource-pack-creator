import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Disc {
	title?: string
	description?: string
	audioUrl?: string
	defaultTitle: string
	defaultDescription: string
	icon: string
}

interface DiscsState {
	discs: Disc[]
}

const defaultTitle = "Music Disc"

const initialState: DiscsState = {
	discs: [
		{
			defaultTitle, defaultDescription: "C418 - 13",
			icon: "/sprites/music_disc_13.png"
		},
		{
			defaultTitle, defaultDescription: "C418 - cat",
			icon: "/sprites/music_disc_cat.png"
		},
		{
			defaultTitle, defaultDescription: "C418 - blocks",
			icon: "/sprites/music_disc_blocks.png"
		},
		{
			defaultTitle, defaultDescription: "C418 - chirp",
			icon: "/sprites/music_disc_chirp.png"
		},
		{
			defaultTitle, defaultDescription: "C418 - far",
			icon: "/sprites/music_disc_far.png"
		},
		{
			defaultTitle, defaultDescription: "C418 - mall",
			icon: "/sprites/music_disc_mall.png"
		},
		{
			defaultTitle, defaultDescription: "C418 - mellohi",
			icon: "/sprites/music_disc_mellohi.png"
		},
		{
			defaultTitle, defaultDescription: "C418 - stal",
			icon: "/sprites/music_disc_stal.png"
		},
		{
			defaultTitle, defaultDescription: "C418 - strad",
			icon: "/sprites/music_disc_strad.png"
		},
		{
			defaultTitle, defaultDescription: "C418 - ward",
			icon: "/sprites/music_disc_ward.png"
		},
		{
			defaultTitle, defaultDescription: "C418 - 11",
			icon: "/sprites/music_disc_11.png"
		},
		{
			defaultTitle, defaultDescription: "C418 - wait",
			icon: "/sprites/music_disc_wait.png"
		},
		{
			defaultTitle, defaultDescription: "Lena Raine - otherside",
			icon: "/sprites/music_disc_otherside.png"
		},
		{
			defaultTitle, defaultDescription: "Lena Raine - Pigstep",
			icon: "/sprites/music_disc_pigstep.png"
		},
	]
}

export const discsSlice = createSlice({
  name: "discs",
  initialState,
  reducers: {
		setTitle: (state, action: PayloadAction<{ id: number, title: string }>) => {
			const { id, title } = action.payload;
			state.discs[id].title = title
		},
		setDescription: (state, action: PayloadAction<{ id: number, description: string }>) => {
			const { id, description } = action.payload;
			state.discs[id].description = description
		},
		setAudioUrl: (state, action: PayloadAction<{ id: number, audioUrl: string }>) => {
			const { id, audioUrl } = action.payload;
			state.discs[id].audioUrl = audioUrl
		}
  }
})

export const { setTitle, setDescription, setAudioUrl } = discsSlice.actions

export default discsSlice.reducer
