import { string } from "prop-types"

export default {
  name: "artwork",
  title: "Artwork",
  type: "document",
  fields: [
    {
      title: "Artist",
      name: "artist",
      type: "reference",
      to: [{ type: "artist" }],
    },
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Year",
      name: "year",
      type: "number",
    },
    {
      title: "Address",
      name: "address",
      type: "string",
    },
    {
      title: "Image",
      name: "image",
      type: "image",
      required: true,
      options: {
        hotspot: true, // <-- Defaults to false
      },
      preview: {
        select: {
          imageUrl: "asset.url",
          title: "title",
        },
      },
    },
    {
      type: "slug",
      name: "slug",
      title: "Slug",
      description: 'this will be the url address for the location - click the "Generate" button to auto-fill',
      options: {
        source: "title",
        slugify: (input) => input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
    },
  ],
}
