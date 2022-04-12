import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Disc {
	title?: string
	description?: string
	youtubeUrl?: string
	resourceName: string
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
			resourceName: "13",
			defaultTitle, defaultDescription: "C418 - 13",
			icon: "/sprites/music_disc_13.png"
		},
		{
			resourceName: "cat",
			defaultTitle, defaultDescription: "C418 - cat",
			icon: "/sprites/music_disc_cat.png"
		},
		{
			resourceName: "blocks",
			defaultTitle, defaultDescription: "C418 - blocks",
			icon: "/sprites/music_disc_blocks.png"
		},
		{
			resourceName: "chirp",
			defaultTitle, defaultDescription: "C418 - chirp",
			icon: "/sprites/music_disc_chirp.png"
		},
		{
			resourceName: "far",
			defaultTitle, defaultDescription: "C418 - far",
			icon: "/sprites/music_disc_far.png"
		},
		{
			resourceName: "mall",
			defaultTitle, defaultDescription: "C418 - mall",
			icon: "/sprites/music_disc_mall.png"
		},
		{
			resourceName: "mellohi",
			defaultTitle, defaultDescription: "C418 - mellohi",
			icon: "/sprites/music_disc_mellohi.png"
		},
		{
			resourceName: "stal",
			defaultTitle, defaultDescription: "C418 - stal",
			icon: "/sprites/music_disc_stal.png"
		},
		{
			resourceName: "strad",
			defaultTitle, defaultDescription: "C418 - strad",
			icon: "/sprites/music_disc_strad.png"
		},
		{
			resourceName: "ward",
			defaultTitle, defaultDescription: "C418 - ward",
			icon: "/sprites/music_disc_ward.png"
		},
		{
			resourceName: "11",
			defaultTitle, defaultDescription: "C418 - 11",
			icon: "/sprites/music_disc_11.png"
		},
		{
			resourceName: "wait",
			defaultTitle, defaultDescription: "C418 - wait",
			icon: "/sprites/music_disc_wait.png"
		},
		{
			resourceName: "otherside",
			defaultTitle, defaultDescription: "Lena Raine - otherside",
			icon: "/sprites/music_disc_otherside.png"
		},
		{
			resourceName: "pigstep",
			defaultTitle, defaultDescription: "Lena Raine - Pigstep",
			icon: "/sprites/music_disc_pigstep.png"
		},
	]
}

export const discsSlice = createSlice({
  name: "discs",
  initialState,
  reducers: {
		setTitle: (state, action: PayloadAction<{ id: number, title: string|undefined }>) => {
			const { id, title } = action.payload;
			state.discs[id].title = title
		},
		setDescription: (state, action: PayloadAction<{ id: number, description: string|undefined }>) => {
			const { id, description } = action.payload;
			state.discs[id].description = description
		},
		setYoutubeUrl: (state, action: PayloadAction<{ id: number, youtubeUrl: string|undefined }>) => {
			const { id, youtubeUrl } = action.payload;
			state.discs[id].youtubeUrl = youtubeUrl
		}
  }
})

export const { setTitle, setDescription, setYoutubeUrl } = discsSlice.actions

export default discsSlice.reducer
