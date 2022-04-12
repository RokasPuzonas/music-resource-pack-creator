
export interface Disc {
	title?: string
	description?: string
	youtubeUrl?: string
}

export interface CreatePackPayload {
	description?: string
	discs?: Record<string, Disc>
}

export async function getTitle(url: string): Promise<string | undefined> {
	const res = await fetch(`/get-title`, {
		method: "POST",
		body: url,
	})
	if (res.status == 200) {
		return await res.text()
	} else {
		return undefined
	}
}

export async function createPack(info: CreatePackPayload) {
	const res = await fetch(`/create`, {
		method: "POST",
		mode: "cors",
		headers: { "Content-Type" : "application/json" },
		body: JSON.stringify(info),
	})

	if (res.status == 200) {
		return await res.blob()
	} else {
		return undefined
	}
}
