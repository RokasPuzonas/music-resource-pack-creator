import hapi from "@hapi/hapi"
import ytdl from "ytdl-core"
import Joi from "joi"
import JSZip from "jszip"
import ffmpeg from "fluent-ffmpeg"
import { readFileSync } from "fs"
import temp from "temp"

const availableDiscs = [
	"11", "13", "blocks", "cat", "chirp", "far", "mall", "mellohi", "otherside", "pigstep", "stal", "strad", "wait", "ward"
]

interface Disc {
	title?: string
	description?: string
	youtubeUrl?: string
}

interface CreatePackPayload {
	description?: string
	discs?: Record<string, Disc>
}

async function getVideoTitle(url: string): Promise<string | undefined> {
	let info

	try {
		info = await ytdl.getBasicInfo(url)
	} catch (e) {
		return undefined
	}

	return info.videoDetails.title
}

function addGetTitleRoute(server: hapi.Server) {
	server.route({
		method: 'POST',
		path: '/get-title',
		handler: async (req, h) => {
			const url = req.payload
			if (typeof url !== 'string') {
				return h.response("Expected to receive video URL").code(400)
			}

			let title = await getVideoTitle(url)
			if (!title) {
				return h.response(`Video "${url}" not found`).code(400)
			} else {
				return title
			}
		}
	})
}

function dowloadYoutubeAudio(url: string, outputPath: string): Promise<void> {
	const ytStream = ytdl(url, { quality: "highestaudio" })
	const audioStream = ffmpeg(ytStream)
		.audioBitrate(128)
		.noVideo()
		.format("ogg")
		.output(outputPath)

	audioStream.run()

	return new Promise((resolve, reject) => {
		audioStream.on("end", resolve)
		audioStream.on("error", reject)
	})
}

function addCreateRoute(server: hapi.Server) {
	const discValidator = Joi.object<Disc>({
		title: Joi.string().optional(),
		description: Joi.string().optional(),
		youtubeUrl: Joi.string().optional(),
	}).optional()

	const discsValidators: Record<string, Joi.ObjectSchema<Disc>> = {}
	for (var name of availableDiscs) {
		discsValidators[name] = discValidator
	}

	const payloadValidator = Joi.object<CreatePackPayload>({
		description: Joi.string().optional(),
		discs: Joi.object(discsValidators).optional()
	})

	server.route({
		method: 'POST',
		path: '/create',
		options: {
			validate: { payload: payloadValidator }
		},
		handler: async (req, h) => {
			console.log("CREATE")
			const payload = req.payload as CreatePackPayload

			const zip = JSZip();
			const audioStreams: Promise<void>[] = []
			if (payload.discs) {
				// Get titles of videos, and check if all of the given urls are valid videos
				for (var discName in payload.discs) {
					let url = payload.discs[discName].youtubeUrl
					if (!url) continue

					const title = await getVideoTitle(url)
					if (!title) {
						return h.response(`Video "${url}" not found`).code(400)
					}
				}

				// After checking that all of the videos are valid, donwload the audio for each one
				for (var discName in payload.discs) {
					let url = payload.discs[discName].youtubeUrl
					if (!url) continue

					audioStreams.push(new Promise(async (resolve, reject) => {
						const tempFile = temp.path()
						try {
							await dowloadYoutubeAudio(url as string, tempFile)
						} catch (e) {
							console.error(e)
							reject(e)
						}
						zip.file(`assets/minecraft/sounds/records/${discName}.ogg`, readFileSync(tempFile))
						resolve()
						// TODO: Handle cases when it fails to write to zip
					}))
				}

				// Lastly create any necessary adjustments to the names of the discs
				const lang: Record<string, string> = {}
				for (var discName in payload.discs) {
					const disc = payload.discs[discName]
					if (disc.title) {
						lang[`item.minecraft.music_disc_${discName}`] = disc.title
					}
					if (disc.description) {
						lang[`item.minecraft.music_disc_${discName}.desc`] = disc.description
					}
				}
				if (Object.keys(lang).length > 0) {
					zip.file("assets/minecraft/lang/en_us.json", JSON.stringify(lang, undefined, 2))
				}
			}

			zip.file("pack.mcmeta", JSON.stringify({
				pack: {
					pack_format: 8,
					description: payload.description || "An Awesome Music Resource Pack!"
				}
			}, undefined, 2))
			zip.file("pack.png", readFileSync("./default-icon.png"))

			// Wait until all audio finishes downloading
			await Promise.all(audioStreams)

			const buffer = await zip.generateAsync({type:"nodebuffer"})
			return buffer
		}
	})
}

async function main() {
	let host = undefined
	let port = process.env.PORT || 3000
	if (process.env.NODE_ENV == "development") {
		host = "localhost"
		port = 3001
	}

	const server = hapi.server({
		port,
		host,
		routes: {
			cors: true
		}
	})

	addGetTitleRoute(server)
	addCreateRoute(server)

	await server.register(require('@hapi/inert'))

	server.route({
		method: "GET",
		path: "/{param*}",
		handler: {
			directory: {
				path: "client/build"
			}
		}
	})

	await server.start()
	console.log("Server running on %s", server.info.uri)
}

process.on('unhandledRejection', (err) => {
	console.error(err)
	process.exit(1)
})

main()
